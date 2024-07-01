import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerUserDto: CreateUserDto): Promise<UserEntity> {
    const hashPassword = await this.hashPassword(registerUserDto.password);
    return await this.userRepository.save({
      ...registerUserDto,
      refresh_token: 'refresh_token',
      password: hashPassword,
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });

    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.UNAUTHORIZED);
    }
    const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!checkPass) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // generate access token and refresh token
    const payload = { id: user.id, username: user.username };
    return this.generateToken(payload);
  }

  private async generateToken(payload: { id: string; username: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: '1d',
    });
    await this.userRepository.update(
      { username: payload.username },
      { refresh_token: refresh_token },
    );
    return { access_token, refresh_token };
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('SECRET'),
      });
      const checkExistToken = await this.userRepository.findOneBy({
        username: verify.username,
        refresh_token,
      });
      if (checkExistToken) {
        return this.generateToken({ id: verify.id, username: verify.username });
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
