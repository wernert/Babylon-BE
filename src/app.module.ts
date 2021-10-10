import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RecordGateway } from './record/record.gateway';
import { RecordModule } from './record/record.module';
import { RedisdbService } from './redisdb/redisdb.service';
import { TimeseriesService } from './timeseries/timeseries.service';
import { NpmwtModule } from './npmwt/npmwt.module';
  


@Module({
  imports: [ConfigModule, RecordModule, NpmwtModule],
  controllers: [AppController],
  providers: [AppService, RedisdbService, TimeseriesService],
})
export class AppModule {}
