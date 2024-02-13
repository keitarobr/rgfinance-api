import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class MonetaryTransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    date: Date;

    @Column('decimal', { nullable: false, precision: 10, scale: 2 })
    value: number;

    @ManyToOne(() => Category, { nullable: false })
    category: Category;

}