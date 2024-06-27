import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
    

import { Apartment } from './apartment.entity';
import { User } from './user.entity';

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne((type) => User, (user) => user.favorites)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @Column({ name: 'userId' })
    userId: string;

    @ManyToOne(() => Apartment)
    @JoinColumn({ name: 'apartmentId' })
    apartment: Apartment;

    @Column({ name: 'apartmentId' })
    apartmentId: string;
}
    