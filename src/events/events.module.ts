import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { CanvaModule } from 'src/canva/canva.module';

@Module({
  imports: [CanvaModule],
  providers: [EventsGateway],
})
export class EventsModule {}
