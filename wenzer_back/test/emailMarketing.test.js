const EmailMarketing = require("../src/repositories/emailMarketing");
const assert = require("assert");

describe("Testing the validate of email marketing model", () => {
    it("should return nothing", () => {
        // scenario
        let emailMarketing = new EmailMarketing();
        emailMarketing.email = "lucas@teste.com";
        // ação
        try {
            emailMarketing.validateData();
        } catch(err) {
            assert.fail("Ocorreu um erro na validação do email");
        }
    });
    it("should return exception", () => {
        // scenario
        let emailMarketing = new EmailMarketing();
        // ação
        try {
            emailMarketing.validateData();
            assert.fail("Ocorreu um erro na validação do email");
        } catch(err) {
            assert.strictEqual(err.message, 'Email não é válido.', "Ocorreu um erro diferente do esperado.");
        }
    })
});

describe("Testing the creation of a where clause in email marketing", () => {
    it("should return a where clause builded", () => {
        let emailMarketing = new EmailMarketing();
        emailMarketing.id = "123456";
        emailMarketing.email = "lucas@teste.com";
        
        let whereClause = emailMarketing.buildWhereClause();

        assert.strictEqual(whereClause, " id = '123456'  AND  email = 'lucas@teste.com' ", "Something went wrong with where clause creation.");
    });
    it("should return nothing in where clause", () => {
        let emailMarketing = new EmailMarketing();
        emailMarketing.id = "";
        emailMarketing.email = "";

        let whereClause = emailMarketing.buildWhereClause();

        assert.strictEqual(whereClause, "", "Esperava o retorno vazio do where clause.");
    })
});
