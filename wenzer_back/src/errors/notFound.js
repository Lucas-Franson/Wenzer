class NotFound extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'NotFound';
    }
}

module.exports = NotFound;