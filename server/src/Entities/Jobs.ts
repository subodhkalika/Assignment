import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Categories } from './Categories';
import { Suburbs } from './Suburbs';

@Entity()
export class Jobs extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({type: 'varchar', default: 'new', length: 50})
    status!: string;

    @Column({type: 'int', unsigned: true})
    @Index()
    suburb_id!: number;

    @Column({type: 'int',  unsigned: true})
    @Index()
    category_id!: number;

    @Column({type: 'varchar'})
    contact_name!: string;

    @Column({type: 'varchar'})
    contact_phone!: string;

    @Column({type: 'varchar'})
    contact_email!: string;

    @Column({type: 'int', unsigned: true})
    price!: number;

    @Column({type: 'text'})
    description!: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', default: '0000-00-00 00:00:00' })
    updated_at: string;

    @ManyToOne(() => Categories)
    @JoinColumn({ name: 'category_id' })
    category: Categories;

    @ManyToOne(() => Suburbs)
    @JoinColumn({ name: 'suburb_id' })
    suburb: Suburbs;
}
