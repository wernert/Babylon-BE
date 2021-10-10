import { Module } from '@nestjs/common';
import { NpmwtGateway } from './npmwt.gateway';

@Module({
  providers: [NpmwtGateway]
})
export class NpmwtModule {}
