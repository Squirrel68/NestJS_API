import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchEntity } from './entities/branch.entity';
import { Repository } from 'typeorm';
import { IsActive } from 'src/common/is-active.enum';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
  ) {}
  async create(createBranchDto: CreateBranchDto): Promise<BranchEntity> {
    const { name } = createBranchDto;
    const branch = this.branchRepository.create({
      name,
    });
    await this.branchRepository.save(branch);
    return branch;
  }

  async findAll(): Promise<BranchEntity[]> {
    const branches = await this.branchRepository.find();
    if (branches.length === 0) {
      throw new NotFoundException('No branch found');
    }
    return branches;
  }

  findOne(id: string): Promise<BranchEntity> {
    const branch = this.branchRepository.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException(`Branch with ID "${id}" not found`);
    }
    return branch;
  }

  async update(
    id: string,
    updateBranchDto: UpdateBranchDto,
  ): Promise<BranchEntity> {
    const { name, is_active } = updateBranchDto;
    const branch = await this.findOne(id);
    branch.name = name;
    branch.is_active = is_active;
    await this.branchRepository.save(branch);
    return branch;
  }
}
