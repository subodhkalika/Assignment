import {Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity} from 'typeorm';

@Entity()
export class Categories extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({type: 'varchar'})
    name!: string;

    @Column({type: 'int', unsigned: true, default: 0 })
    @Index()
    parent_category_id!: number;
}
