import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { CanvaModule } from 'src/canva/canva.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [CanvaModule, MessageModule],
  providers: [EventsGateway],
})
export class EventsModule {}
