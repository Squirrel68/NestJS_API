import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskEntity } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { IsActive } from 'src/common/is-active.enum';

const ID_TASK_TEST = '0248564b-c4f3-4bf8-82c3-44c869418359';
const ID_PROJECT_TEST = '01c8564b-gnw2-project-id';
const mockTaskRepository = {
  save: jest
    .fn()
    .mockImplementation((dto: CreateTaskDto) =>
      Promise.resolve({ id: ID_TASK_TEST, ...dto }),
    ),
  findOne: jest.fn().mockImplementation((o) => {
    return {
      id: o.where.id,
      name: 'Test task',
      is_active: IsActive.ACTIVE,
      created_at: '2024-07-11T01:57:42.739Z',
      updated_at: '2024-07-11T01:57:42.739Z',
    };
  }),
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        name: 'Test task',
        project_id: ID_PROJECT_TEST,
      };
      const result = { id: ID_TASK_TEST, ...createTaskDto };
      expect(await service.create(createTaskDto)).toEqual(result);
      expect(mockTaskRepository.save).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const id = ID_TASK_TEST;
      const result = {
        id,
        name: 'Test task',
        is_active: IsActive.ACTIVE,
        created_at: '2024-07-11T01:57:42.739Z',
        updated_at: '2024-07-11T01:57:42.739Z',
      };

      expect(await service.findOne(id)).toEqual(result);
      expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('archiveTask', () => {
    it('should archive a task', async () => {
      const id = ID_TASK_TEST;
      const is_active = IsActive.INACTIVE;
      const result = {
        id,
        name: 'Test task',
        is_active,
        created_at: '2024-07-11T01:57:42.739Z',
        updated_at: '2024-07-11T01:57:42.739Z',
      };
      expect(await service.archiveTask(id, is_active)).toEqual(result);
    });
  });
});
