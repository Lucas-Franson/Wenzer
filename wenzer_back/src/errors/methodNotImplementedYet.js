class MethodNotImplementedYet extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "MethodNotImplementedYet";
    }
}

module.exports = MethodNotImplementedYet;