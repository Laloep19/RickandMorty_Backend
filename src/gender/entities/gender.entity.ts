import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Character } from "src/characters/entities/character.entity"

@Entity()
export class Gender{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    gender: string
    
    // @OneToMany(() => Character,character => character.gender)
    // characters: Character[]
}
