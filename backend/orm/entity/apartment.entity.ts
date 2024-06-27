import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
  
import { User } from './user.entity';
import { Favorite } from './favorite.entity';
  
@Entity('apartments')
export class Apartment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  areaSize: number;

  @Column()
  roomNo: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.apartments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ name: 'userId' })
  userId: string;

  @OneToMany(() => Favorite, (favorite) => favorite.apartment)
  favorites: Favorite[];
}
  