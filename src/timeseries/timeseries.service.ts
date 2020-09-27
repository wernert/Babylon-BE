import { Injectable } from '@nestjs/common';
import {
  RedisTimeSeriesFactory,
  Label, ConnectionOptions, Sample, Aggregation, AggregationType
} from 'redis-time-series-ts';
import { TimestampRange } from 'redis-time-series-ts/lib/entity/timestampRange';

// import { Redis, Command } from 'ioredis';
import * as Redis from "ioredis";
import { RedisTimeSeries } from 'redis-time-series-ts/lib/redisTimeSeries';


export interface ISample {
  // range: string;
  value: number;
  timestamp: number;

}

const options: ConnectionOptions = {
  port: 6379,
  host: "127.0.0.1",
  db: 15
};
@Injectable()
export class TimeseriesService {
  private factory = new RedisTimeSeriesFactory(options);
  private redisTimeSeries: RedisTimeSeries;

  private redis: Redis.Redis;

  constructor() {
    this.redis = new Redis(options);
    // this.redisTimeSeries = this.factory.create();
  }

  async info(label: string): Promise<any>  {
    // const info = await this.redisTimeSeries.info(label);
    const info = await this.redis.info();
    console.log(info);
    const keys = await this.redis.keys('*');
    console.log(keys);
    return '<pre>' + info + ' keys: \n ' +  keys.toString() + '</pre>';
  }

  async put(range: string, sample: ISample) {
    // await this.redisTimeSeries.create("temperature2", [new Label("sensor", 2)], 50000);
    // const date = new Date(2020, 1, 6, 11).getTime();
    // await this.redisTimeSeries.create("range1");
    await this.redisTimeSeries.add(new Sample(range, sample.value, sample.timestamp));
  }

  async putInRange(range: string, arr: Array<ISample>) {
    await this.redisTimeSeries.create(range);
    for (let i = 0; i < arr.length; i++) {
        await this.redisTimeSeries.add(new Sample(range, arr[i].value, arr[i].timestamp));
    }
  }
  createTestSamples(length = 100, ): ISample[] {
    const date = new Date(2020, 1, 6, 11).getTime();
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push({value: 20 + i, timestamp: date + i * 1000});
    }
    return arr
  }

  async getRange():  Promise<any>  {
    const date = new Date(2020, 1, 6, 11).getTime();
    const aggregation = new Aggregation(AggregationType.AVG, 1000);
    const timestampRange = new TimestampRange(date, date + 10000);
    const samples = await this.redisTimeSeries.range("range1", timestampRange, undefined, aggregation);

    let out = '';
    for (const sample of samples) {
      out += sample.getKey(); // range1
      out += ' : ';
      out += sample.getValue(); // >=20 and < 30
      out += ' : ';
      out += sample.getTimestamp(); // between 1580983200000 and 1580983209000 timestamp values
      out += '\n';
    }
    console.log(out);
    return '<pre>' + out + '</pre>';

  }
}
