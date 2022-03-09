declare const verifyTokenJWT: (token: string) => any;
declare const createTokenJWT: (id: string, [timeAmount, timeUnit]: any) => string;
export { verifyTokenJWT, createTokenJWT };
