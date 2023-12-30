import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true, length: 50})
    name: string;
}
