import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('userTokens')
export class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  refreshToken: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'userId' })
  user: User
  
  @Column({ name: 'userId' })
  userId: string;
}
