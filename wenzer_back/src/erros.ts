
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

export {
    UsuarioJaCadastrado,
    NaoEncontrado
}