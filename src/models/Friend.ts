import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("friends")
class Friend{

    @PrimaryColumn()
    readonly id: String;

    @Column()
    name: String;

    @Column()
    cellphone: String;

    @Column()
    email: String;

    @Column({ default: false })
    is_favorite: Boolean;

    @Column()
    photoUrl: String;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Friend }