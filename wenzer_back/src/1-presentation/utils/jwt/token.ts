import jwt from 'jsonwebtoken';

const verifyTokenJWT = (token: string) => {
    const chave: string = process.env.CHAVE_JWT ?? '';
    const payload: any = jwt.verify(token, chave, (err) => {
      console.log(err);
    });
    return payload?.id;
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