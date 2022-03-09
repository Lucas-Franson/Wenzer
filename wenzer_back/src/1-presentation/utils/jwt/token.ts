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

const createTokenJWT = (id: string, [timeAmount, timeUnit]: any) => {
    const payload = { 
      id
    };
    const chave: string = process.env.CHAVE_JWT ?? '';
    const token = jwt.sign(payload, chave, { expiresIn: timeAmount+timeUnit });
    return token;
}

export { verifyTokenJWT, createTokenJWT };