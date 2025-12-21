import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CanvaService } from 'src/canva/canva.service';
import { MessageService } from 'src/message/message.service';
import { CreatePixelLogDto } from 'src/canva/dto/create-pixel-log.dto';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly canvaService: CanvaService,
    private readonly messageService: MessageService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Socket client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Socket client disconnected: ${client.id}`);
  }

  @SubscribeMessage('new_message')
  async handleMessage(@MessageBody() data: string): Promise<void> {
    if (!data) return;
    const payload = JSON.parse(data) as CreateMessageDto;
    try {
      await this.messageService.emitNewMessage(payload);
      this.server.emit('new_message', data);
    } catch (error) {
      console.error('Error painting pixel:', error);
    }
  }

  @SubscribeMessage('paint_a_pixel')
  async handlePaintPixel(
    @MessageBody()
    data: string,
  ): Promise<void> {
    if (!data) return;
    const payload = JSON.parse(data) as CreatePixelLogDto;
    try {
      await this.canvaService.paintPixel(payload);
      this.server.emit('paint_a_pixel', data); // Broadcast to all clients
    } catch (error) {
      console.error('Error painting pixel:', error);
    }
  }
}
