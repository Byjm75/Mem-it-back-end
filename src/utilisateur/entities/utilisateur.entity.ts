import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity
export class Utilisateur { 
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    email: string;
    @Column()
    pseudo: string;
    @Column()
    picture: string;
    @Column()
    password: string;


}
