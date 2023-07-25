import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Status } from "src/status/entities/status.entity"
import { Gender } from "src/gender/entities/gender.entity"

@Entity()
export class Character{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    species: string

    @Column()
    image: string

    @CreateDateColumn({type: 'datetime'})
    createdAt: Date

    @ManyToOne(() => Gender,gender => gender.gender)
    gender: Gender

    @ManyToOne(() => Status,status => status.status)
    status: Status
}