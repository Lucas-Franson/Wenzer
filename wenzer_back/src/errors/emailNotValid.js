class EmailNotValid extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'EmailNotValid';
    }
}

module.exports = EmailNotValid;