import { Test, TestingModule } from '@nestjs/testing';
import { NpmwtGateway } from './npmwt.gateway';

describe('NpmwtGateway', () => {
  let gateway: NpmwtGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NpmwtGateway],
    }).compile();

    gateway = module.get<NpmwtGateway>(NpmwtGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
