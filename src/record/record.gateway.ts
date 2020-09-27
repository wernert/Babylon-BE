import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

// import interface msgformat = > from client ?

@WebSocketGateway()
export class RecordGateway {
  @WebSocketServer()
  server: Server;

  // constructor() {
  //   // this.test();
  // }

  formatLog(text: string, data: any): void {
    const time = new Date(data['timestamp']).toLocaleString();
    console.log(text, time, data['message']);
  }


  @SubscribeMessage('record') 
  handleRecord(client: any, payload: any): void {
    // console.log('client: ', client)
    this.formatLog('record payload: ', payload)
    //return 'Hello world!';
  }

  @SubscribeMessage('debug')
  handleDebug( @MessageBody() data: string,): string {
    // const time = new Date(data['timestamp']).toISOString();
    // console.log('debug data: ', time, data['message'] )
    this.formatLog('debug data: ', data)
    return 'OK';
  }
  
  handleConnection(client: any, ...args: any[]): any {
    // console.log('connected: ', client);
    console.log('client: ', client.conn.remoteAddress);
  }

  afterInit(server: any): any {
    console.log('SignallingGateway initialized');
  }

  handleDisconnect(client: any): any {
    console.log(`ClientDisconnect: ${client.conn.remoteAddress}`)
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
