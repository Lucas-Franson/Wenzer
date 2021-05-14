import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid';
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

@Entity("usuarios")
export class Usuario {

    @PrimaryColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    emailValidado: boolean;

    @Column()
    senha: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    static gerarSenhaHash(senha): string {
        const custoHash = 12;
        return bcrypt.hash(senha, custoHash);
    }

    static criaTokenJWT(id, [tempoQuantidade, tempoUnidade]) {
        const payload = { 
          id
        };
        console.log(process.env.CHAVE_JWT);
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: tempoQuantidade+tempoUnidade });
        return token;
    }

    async verificaTokenJWT(token) {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        return payload;
    }
}
