import { Module } from '@nestjs/common';
import { NpmwtGateway } from './npmwt.gateway';
import { NpmwtController } from './npmwt.controller';

@Module({
  providers: [NpmwtGateway],
  controllers: [NpmwtController]
})
export class NpmwtModule {}
