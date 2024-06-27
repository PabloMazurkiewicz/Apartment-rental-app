import * as bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../types/user.types';

import { Apartment } from './apartment.entity';
import { Favorite } from './favorite.entity';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: '',
  })
  firstName: string;

  @Column({
    nullable: true,
    default: '',
  })
  lastName: string;

  @Column({
    default: 'USER' as Role,
    length: 30,
  })
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Apartment, (apartment) => apartment.user)
  apartments: Apartment[];

  @OneToMany((type) => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];


  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  toJSON() {
    this.password = "";
    return this;
  }
}
