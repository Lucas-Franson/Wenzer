
class UsuarioJaCadastrado extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'UsuarioJaCadastrado';
    }
}

class NaoEncontrado extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'NaoEncontrado';
    }
}

class NaoAutorizado extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'NaoAutorizado';
    }
}

class ValideSeuEmail extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'ValideSeuEmail';
    }
}

class ErroParametro extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'ErroParametro';
    }
}

export {
    UsuarioJaCadastrado,
    NaoEncontrado,
    NaoAutorizado,
    ValideSeuEmail,
    ErroParametro
}