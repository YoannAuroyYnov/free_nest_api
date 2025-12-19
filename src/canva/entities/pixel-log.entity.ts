import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Canva } from 'src/canva/entities/canva.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('pixel_logs')
export class PixelLog {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'px_index', type: 'int' })
  pxIndex: number;

  @Column({ type: 'varchar', length: 7 })
  color: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Canva, (canva) => canva.pixelLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'canva_id' })
  canva: Canva;

  @ManyToOne(() => User, (user) => user.pixelLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
