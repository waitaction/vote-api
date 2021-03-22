import { Test, TestingModule } from '@nestjs/testing';
import { VoterController } from './voter.controller';

describe('VoterController', () => {
  let controller: VoterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoterController],
    }).compile();

    controller = module.get<VoterController>(VoterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
