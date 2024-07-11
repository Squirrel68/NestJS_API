import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IsActive } from 'src/common/is-active.enum';
import * as bcrypt from 'bcrypt';
import { FilterUserDto } from './dto/filter-user.dto';
import { Response } from 'express';
import { BranchEntity } from 'src/branches/entities/branch.entity';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { BranchesService } from 'src/branches/branches.service';
import { PositionsService } from 'src/positions/positions.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';

const XLSX = require('xlsx');
const fs = require('fs');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BranchEntity)
    private branchRepository: Repository<BranchEntity>,
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>,
    private branchService: BranchesService,
    private positionService: PositionsService,
    private mailerService: MailerService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashPassword = await this.hashPassword(createUserDto.password);
    const branch = await this.branchService.findOne(createUserDto.branch_id);
    const position = await this.positionService.findOne(
      createUserDto.position_id,
    );
    const trainer = await this.findOne(createUserDto.basic_trainer_id);
    return await this.userRepository.save({
      ...createUserDto,
      refresh_token: 'refresh_token',
      password: hashPassword,
      branch,
      position,
      trainer,
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async findAll(@Query() query: FilterUserDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = items_per_page * (page - 1);
    const is_active = query.is_active;
    const [result, total] = await this.userRepository.findAndCount({
      where: { is_active },
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip,
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: result,
      pagination: {
        total,
        per_page: items_per_page,
        current_page: page,
        last_page: lastPage,
        next_page: nextPage,
        prev_page: prevPage,
      },
    };
  }

  async findOne(id: string): Promise<UserEntity> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id });
    const user = await query.getOne();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userRepository.save(updateUserDto);
  }

  async archive(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);
    user.is_active = IsActive.INACTIVE;
    return await this.userRepository.save(user);
  }
  async remove(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async updateAvatar(id: string, avatar: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { avatar });
  }

  async importUsersFromFile(file: Express.Multer.File): Promise<any> {
    // log ra duong dan file excel tam thoi
    // console.log(file);
    const excel = file;
    const workbook = XLSX.readFile(excel.path);
    const SheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[SheetName]);
    const success = [];
    if (data.length === 0) {
      fs.unlinkSync(excel.path);
      throw new BadRequestException('File is empty');
    }
    // console.log(data);

    for (let i = 0; i < data.length; i++) {
      const user = new CreateUserDto();
      user.username = data[i].Username;
      user.password = data[i].Password.toString();
      user.fullname = data[i].fullname;
      user.identify = data[i].identify;
      user.sex = data[i].Sex;
      user.dob = data[i].DOB;
      user.email = data[i].Email;
      user.phone_number = data[i]['Phone number'];
      user.emergency_contact = data[i]['Emergency contact'];
      user.place_of_origin = data[i]['Place of origin'];
      user.place_of_residence = data[i]['Place of residence'];
      user.current_address = data[i]['current address'];
      user.start_date = data[i]['start date'];
      user.user_type = data[i]['user type'];
      user.role = data[i].role;
      user.bankID = data[i].bankID;
      user.taxID = data[i].taxID;
      user.level = data[i].level;

      // find branch by name
      const branch = await this.branchRepository.findOne({
        where: { name: data[i].branch },
      });
      if (!branch) {
        fs.unlinkSync(excel.path);
        throw new BadRequestException(`Branch ${data[i].branch} not found`);
      }
      user.branch_id = branch.id;
      // find position by name
      const position = await this.positionRepository.findOne({
        where: { name: data[i].position },
      });
      if (!position) {
        fs.unlinkSync(excel.path);
        throw new BadRequestException(`Position ${data[i].position} not found`);
      }
      user.position_id = position.id;
      // find trainer by name
      const trainer = await this.userRepository.findOne({
        where: { fullname: data[i].trainer },
      });
      if (!trainer) {
        fs.unlinkSync(excel.path);
        throw new BadRequestException(`Trainer ${data[i].trainer} not found`);
      }
      user.basic_trainer_id = trainer.id;
      // save user
      const newUser = await this.create(user);
      success.push(newUser);
    }
    fs.unlinkSync(excel.path);
    return { message: 'Import users successfully', success };
  }

  async exportUsersToFile(res: Response): Promise<any> {
    let users = await this.userRepository.find({
      relations: ['branch', 'position', 'trainer'],
    });
    const heading = [
      [
        'Username',
        'identify',
        'fullname',
        'Sex',
        'DOB',
        'Email',
        'Phone number',
        'Emergency contact',
        'Place of origin',
        'Place of residence',
        'current address',
        'start date',
        'user type',
        'role',
        'bankID',
        'taxID',
        'level',
        'branch',
        'position',
        'trainer',
      ],
    ];
    let data = [];
    users.forEach((user) => {
      data.push([
        user.username,
        user.identify,
        user.fullname,
        user.sex,
        user.dob,
        user.email,
        user.phone_number,
        user.emergency_contact,
        user.place_of_origin,
        user.place_of_residence,
        user.current_address,
        user.start_date,
        user.user_type,
        user.role,
        user.bankID,
        user.taxID,
        user.level,
        user.branch === null ? '<trống>' : user.branch.name,
        user.position === null ? '<trống>' : user.position.name,
        user.trainer === null ? '<trống>' : user.trainer.fullname,
      ]);
    });

    const wb = XLSX.utils.book_new();
    const usersSheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.sheet_add_aoa(usersSheet, heading);
    XLSX.utils.book_append_sheet(wb, usersSheet, 'Users');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.attachment('users.xlsx');
    return res.send(buffer);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async sendEmailAuto() {
    await this.mailerService.sendMail({
      to: 'tektoy68@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      template: './dailyMail',
      context: {
        code: 'cf1a3f828287',
        username: 'john doe',
      },
    });
    console.log('Email sent');
  }
}
