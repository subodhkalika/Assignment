import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index} from 'typeorm';

@Entity()
export class Suburbs extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({type: 'varchar'})
    name!: string;

    @Column({type: 'varchar', length: 4})
    @Index()
    postcode!: string;
}
