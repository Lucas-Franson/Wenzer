import jwt from 'jsonwebtoken';
import Logger from '../../../4-infra/utils/logger';

const verifyTokenJWT = (token: string) => {
    const chave: string = process.env.CHAVE_JWT ?? '';
    let pld: any = "";
    try {
      pld = jwt.verify(token, chave);
    } catch(err: any) {
      new Logger('Verificar Token', err).log();
    }
    return pld?.id;
}

const createTokenJWT = (id: string) => {
    const payload = { 
      id
    };
    const chave: string = process.env.CHAVE_JWT ?? '';
    const token = jwt.sign(payload, chave);
    return token;
}

export { verifyTokenJWT, createTokenJWT };