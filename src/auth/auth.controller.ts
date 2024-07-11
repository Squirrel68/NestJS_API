import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { PublicAPI } from './decorator/public.decorator';
import { RegisterUserDto } from './dto/register.dto';

@PublicAPI()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() registerDto: RegisterUserDto): Promise<UserEntity> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() { refresh_token }): Promise<any> {
    return this.authService.refreshToken(refresh_token);
  }
}
