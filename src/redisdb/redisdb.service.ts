import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOpts, RedisClient } from "redis";
import * as redis from "redis";

@Injectable()
export class RedisdbService {

  private options: ClientOpts = {};
  private client : RedisClient;

    constructor(private configService: ConfigService) { 
      this.options.host = this.configService.get<string>('RedisHost');
      this.options.port = this.configService.get<number>('RedisPort');
    }

    connect(): void {
      this.client = redis.createClient(this.options);
      console.log('redis connect: ', this.client.connected);
      // this.options.port = env.redis.port;
      this.errLog();
    }
    
    errLog(): void {
      this.client.on('error', function (err) {
        console.log('error event - ' + this.client.host + ':' + this.client.port + ' - ' + err);
      });
    }
  
    

}
