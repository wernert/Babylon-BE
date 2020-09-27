import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisdbService } from './redisdb/redisdb.service';
import { TimeseriesService, ISample } from './timeseries/timeseries.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private redisdbService: RedisdbService,       // node redis
    private timeseriesService: TimeseriesService, // timeseries(ioredis), ioredis
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    // this.redisdbService.
  }
  @Get('info')
  info():  any {
    // console.log('getBookmarks ');
    return this.timeseriesService.info('temperature');
  }
  @Get('range')
  range():  any {
    // console.log('getBookmarks ');
    return this.timeseriesService.getRange();
  }
  @Get('put')
  put():  any {
    // console.log('getBookmarks ');
    const test: ISample = { value: 12345, timestamp: new Date().getTime()};
    return this.timeseriesService.put('range', test);
  }
}
