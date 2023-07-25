import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Character } from "src/characters/entities/character.entity"

@Entity()
export class Status{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: string
    
    @OneToMany(() => Character,character => character.status)
    characters: Character[]
}