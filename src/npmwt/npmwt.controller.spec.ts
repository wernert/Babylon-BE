import { Test, TestingModule } from '@nestjs/testing';
import { NpmwtController } from './npmwt.controller';

describe('NpmwtController', () => {
  let controller: NpmwtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NpmwtController],
    }).compile();

    controller = module.get<NpmwtController>(NpmwtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
