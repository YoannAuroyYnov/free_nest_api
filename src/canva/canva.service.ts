import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCanvaDto } from 'src/canva/dto/create-canva.dto';
import { UpdateCanvaDto } from 'src/canva/dto/update-canva.dto';
import { Canva } from 'src/canva/entities/canva.entity';
import { PixelLog } from 'src/canva/entities/pixel-log.entity';
import { User } from 'src/user/entities/user.entity';
import { CreatePixelLogDto } from './dto/create-pixel-log.dto';

@Injectable()
export class CanvaService {
  constructor(
    @InjectRepository(Canva)
    private readonly canvaRepository: Repository<Canva>,
    @InjectRepository(PixelLog)
    private readonly pixelLogRepository: Repository<PixelLog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCanvaDto: CreateCanvaDto) {
    const canva = this.canvaRepository.create(createCanvaDto);
    return await this.canvaRepository.save(canva);
  }

  async findAll() {
    return await this.canvaRepository.find({
      where: { id: 1 },
    });
  }

  findOne(id: number) {
    return `This action on canva #${id} is not implemented yet.`;
  }

  update(id: number, updateCanvaDto: UpdateCanvaDto) {
    return `This action on canva #${id} with ${JSON.stringify(updateCanvaDto)} is not implemented yet.`;
  }

  remove(id: number) {
    return `This action on canva #${id} is not implemented yet.`;
  }

  async paintPixel(data: CreatePixelLogDto): Promise<Canva> {
    const { canvaId, userId, pxIndex, color } = data;

    const [user, canva] = await Promise.all([
      this.userRepository.findOneBy({ id: userId }),
      this.canvaRepository.findOneBy({ id: canvaId }),
    ]);

    if (!user) throw new NotFoundException('User not found');
    if (!canva) throw new NotFoundException('Canva not found');

    if (pxIndex < 0 || pxIndex >= canva.colors.length) {
      throw new BadRequestException('Pixel index out of bounds');
    }

    canva.colors[pxIndex - 1] = color;
    await this.canvaRepository.save(canva);

    await this.pixelLogRepository.save({
      pxIndex,
      color,
      canva,
      user,
    });

    return canva;
  }
}
