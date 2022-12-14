import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class NpmwtGateway {
  @SubscribeMessage('npm-message')
  handleMessage(client: any, payload: any): string {
    console.log('NpmwtGateway message: ', payload)
    return 'NpmwtGateway message';
  }
}
