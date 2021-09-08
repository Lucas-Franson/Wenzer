class NotAuthorized extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'NotAuthorized';
    }
}

module.exports = NotAuthorized;