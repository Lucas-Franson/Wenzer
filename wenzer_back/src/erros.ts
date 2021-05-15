
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

export {
    UsuarioJaCadastrado,
    NaoEncontrado,
    NaoAutorizado
}