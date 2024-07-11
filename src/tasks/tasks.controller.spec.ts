import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IsActive } from 'src/common/is-active.enum';

const mockTasksService = {
  create: jest.fn().mockImplementation((createTaskDto: CreateTaskDto) => {
    return { id: '1', ...createTaskDto };
  }),
  findAll: jest.fn().mockImplementation(() => []),
  findOne: jest.fn().mockImplementation((id: string) => {
    return { id, name: 'Test task', is_active: true };
  }),
  update: jest.fn().mockImplementation((updateTaskDto: UpdateTaskDto) => {
    return { id: '1', ...updateTaskDto };
  }),
  delete: jest.fn().mockImplementation((id: string) => {
    return undefined;
  }),
  archiveTask: jest
    .fn()
    .mockImplementation((id: string, isActive: IsActive) => {
      return { id, is_active: isActive };
    }),
};

describe('TasksController', () => {
  let tasksController: TasksController;

  // ---- DEFAULT ----
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });
  // ---- DEFAULT ----

  describe('createTask', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        name: 'Test task',
        project_id: '0248564b-c4f3-4bf8-82c3-44c869418359',
      };
      const result = {
        id: '0248564b-c4f3-4bf8-82c3-44c869418359',
        ...createTaskDto,
      };
      mockTasksService.create.mockResolvedValue(result);

      expect(await tasksController.createTask(createTaskDto)).toEqual(result);
      expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const result = [];
      mockTasksService.findAll.mockResolvedValue(result);

      expect(await tasksController.getTasks({} as GetTasksFilterDto)).toBe(
        result,
      );
    });

    it('should throw NotFoundException if no tasks found', async () => {
      mockTasksService.findAll.mockImplementation(async () => {
        throw new NotFoundException('No tasks found');
      });
      await expect(
        tasksController.getTasks({} as GetTasksFilterDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getTask', () => {
    it('should return a single task', async () => {
      const result = { id: '1', name: 'Test task', is_active: true };
      mockTasksService.findOne.mockResolvedValue(result);

      expect(await tasksController.getTask('1')).toBe(result);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockTasksService.findOne.mockImplementation(async () => {
        throw new NotFoundException('Task not found');
      });
      await expect(tasksController.getTask('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        id: '0248564b-c4f3-4bf8-82c3-44c8694183509',
        name: 'Updated task',
        project_id: '0248564b-c4f3-4bf8-82c3-44c869418359',
      };
      const result = {
        id: '0248564b-c4f3-4bf8-82c3-44c869418359',
        ...updateTaskDto,
      };
      mockTasksService.update.mockResolvedValue(result);

      expect(await tasksController.updateTask(updateTaskDto)).toEqual(result);
      expect(mockTasksService.update).toHaveBeenCalledWith(updateTaskDto);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      mockTasksService.delete.mockResolvedValue(undefined);
      await expect(tasksController.deleteTask('1')).resolves.not.toThrow();
      expect(mockTasksService.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if task not found', async () => {
      mockTasksService.delete.mockImplementation(async () => {
        throw new NotFoundException('Task not found');
      });
      await expect(tasksController.deleteTask('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('archiveTask', () => {
    it('should archive a task', async () => {
      const result = {
        id: '0248564b-c4f3-4bf8-82c3-44c8694183509',
        is_active: IsActive.INACTIVE,
      };
      mockTasksService.archiveTask.mockResolvedValue(result);

      expect(
        await tasksController.archiveTask(
          '0248564b-c4f3-4bf8-82c3-44c869418359',
          IsActive.INACTIVE,
        ),
      ).toEqual(result);
      expect(mockTasksService.archiveTask).toHaveBeenCalledWith(
        '0248564b-c4f3-4bf8-82c3-44c869418359',
        IsActive.INACTIVE,
      );
    });
  });
});
