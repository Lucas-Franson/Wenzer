import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid';
import { NaoAutorizado } from '../erros';
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

@Entity("users")
export class User {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    emailValid: boolean;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    static generatePasswordHash(password): string {
        const custoHash = 12;
        return bcrypt.hash(password, custoHash);
    }

    static verifyPassword(password, passwordHash) {
        const passwordValid = bcrypt.compare(password, passwordHash);    
        return passwordValid;
    }

    static createTokenJWT(id, [timeAmount, timeUnit]) {
        const payload = { 
          id
        };
        
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: timeAmount+timeUnit });
        return token;
    }

    static verifyTokenJWT(token) {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        return payload;
    }
}
