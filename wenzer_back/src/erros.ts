
class UsuarioJaCadastrado extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'UsuarioJaCadastrado';
    }
}

export {
    UsuarioJaCadastrado
}