import { Test, TestingModule } from '@nestjs/testing';
import { ElectionController } from './election.controller';

describe('ElectionController', () => {
  let controller: ElectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionController],
    }).compile();

    controller = module.get<ElectionController>(ElectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
