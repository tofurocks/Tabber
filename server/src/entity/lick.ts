import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { IsOptional, Length } from "class-validator";
import { User } from "./user";

@Entity()
export class Lick {
    @PrimaryGeneratedColumn()
    id: number;

    @Length(1, 100)
    @Column()
    name: string;
    
    @IsOptional()
    @Length(0, 500)
    @Column({ nullable: true })
    description: string;
    
    // one to one relation with audio file containing
    @Column()
    dateUploaded: Date;
    
    @Column()
    audioFileLocation: string;
    
    @Column()
    audioLength: number; // seconds
    
    @Column() 
    tab: string; // TODO: make tab data structure

    // Should just be a string with notes concatenated ie. EADGBE or D#AGBED#
    @Column()
    tuning: string; // TODO: make tuning data structure/data type

    @Column()
    isPublic: boolean;

    @ManyToOne(type => User, user => user.licks)
    owner: User;

    @ManyToMany(type => User, user => user.sharedWithMe, { cascade: ["update"] })
    @JoinTable()
    sharedWith: User[];
}