import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PositionEntity } from './entities/position.entity';
import { Repository } from 'typeorm';
import { IsActive } from 'src/common/is-active.enum';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>,
  ) {}
  async create(createPositionDto: CreatePositionDto): Promise<PositionEntity> {
    const { name } = createPositionDto;
    const position = this.positionRepository.create({
      name,
      is_active: IsActive.ACTIVE,
    });
    await this.positionRepository.save(position);
    return position;
  }

  async findAll(): Promise<PositionEntity[]> {
    const positions = await this.positionRepository.find();
    if (positions.length === 0) {
      throw new NotFoundException('No position found');
    }
    return positions;
  }

  async findOne(id: string): Promise<PositionEntity> {
    const position = await this.positionRepository.findOne(id);
    if (!position) {
      throw new NotFoundException(`Position with ID "${id}" not found`);
    }
    return position;
  }

  async update(
    id: string,
    updatePositionDto: UpdatePositionDto,
  ): Promise<PositionEntity> {
    const { name, is_active } = updatePositionDto;
    const position = await this.findOne(id);
    position.name = name;
    position.is_active = is_active;

    await this.positionRepository.save(position);
    return position;
  }

  async remove(id: string): Promise<void> {
    const res = await this.positionRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Position with ID "${id}" not found`);
    }
  }
}
