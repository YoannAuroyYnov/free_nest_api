import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { PixelLog } from 'src/canva/entities/pixel-log.entity';

@Entity('canvas')
export class Canva {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'jsonb' })
  size: { width: number; height: number };

  @Column({ type: 'varchar', length: 7, array: true })
  colors: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => PixelLog, (log) => log.canva)
  pixelLogs: PixelLog[];

  @BeforeInsert()
  initColors() {
    if (this.size && (!this.colors || this.colors.length === 0)) {
      const totalPixels = this.size.width * this.size.height;
      this.colors = new Array<string>(totalPixels).fill('#ffffff');
    }
  }
}
