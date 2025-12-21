import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { UpdateMessageDto } from 'src/message/dto/update-message.dto';
import { Message } from 'src/message/entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  create(dto: CreateMessageDto) {
    const { content, userId } = dto;
    const message = this.messageRepository.create({
      content,
      user: { id: userId },
    });
    console.log('Created message: ', message);
    return this.messageRepository.save(message);
  }

  async emitNewMessage(dto: CreateMessageDto) {
    const message = await this.create(dto);
    return this.messageRepository.findOne({
      where: { id: message.id },
      relations: { user: true },
    });
  }

  findAll() {
    return this.messageRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
      },
    });
  }

  async update(id: number, dto: UpdateMessageDto) {
    const { content } = dto;

    return await this.messageRepository.update(id, { content });
  }

  async remove(id: number) {
    const result = await this.messageRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Message #${id} not found`);
    }
    return;
  }
}
