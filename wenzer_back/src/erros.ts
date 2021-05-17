
class UsuarioJaCadastrado extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'UsuarioJaCadastrado';
    }
}

class NaoEncontrado extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'NaoEncontrado';
    }
}

class NaoAutorizado extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'NaoAutorizado';
    }
}

class ValideSeuEmail extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'ValideSeuEmail';
    }
}

export {
    UsuarioJaCadastrado,
    NaoEncontrado,
    NaoAutorizado,
    ValideSeuEmail
}