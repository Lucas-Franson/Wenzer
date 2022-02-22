import jwt from 'jsonwebtoken';

const verifyTokenJWT = (token: string) => {
    const chave: string = process.env.CHAVE_JWT ?? '';
    let pld: any = "";
    try {
      pld = jwt.verify(token, chave);
    } catch(err) {
      console.log(err);
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