declare class UsuarioJaCadastrado extends Error {
    constructor(mensagem: string);
}
declare class NaoEncontrado extends Error {
    constructor(mensagem: string);
}
declare class NaoAutorizado extends Error {
    constructor(mensagem: string);
}
declare class ValideSeuEmail extends Error {
    constructor(mensagem: string);
}
declare class ErroParametro extends Error {
    constructor(mensagem: string);
}
export { UsuarioJaCadastrado, NaoEncontrado, NaoAutorizado, ValideSeuEmail, ErroParametro };
