class AlreadyRegistered extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'AlreadyRegistered';
    }
}

module.exports = AlreadyRegistered;