import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class RecordGateway {
  @WebSocketServer()
  server: Server;

  // constructor() {
  //   // this.test();
  // }

  @SubscribeMessage('record') 
  handleRecord(client: any, payload: any): void {
    console.log('client: ', client)
    console.log('payload: ', payload)
    //return 'Hello world!';
  }

  // @SubscribeMessage('debug')
  // handleDebug( @MessageBody() data: string,): string {
  //   console.log('data: ', data)
  //   return 'OK';
  // }
  
  handleConnection(client: any, ...args: any[]): any {
    console.log('connected: ', client);
  }

  afterInit(server: any): any {
    console.log('SignallingGateway initialized');
  }

  handleDisconnect(client: any): any {
    console.log(`ClientDisconnect: ${client}`)
  }

  // test() {
  //   this.server.on('connection', (socket) => {
  //     socket.use((packet, next) => {
  //       // Handler
  //       next();
  //     });
  //   });
  // }
}
