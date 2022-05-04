"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabelas = void 0;
const mongodb_1 = require("mongodb");
const database = process.env.BASE_URL_DATABASE;
const name = process.env.BASE_NAME_DATABASE;
class Tabelas {
    constructor() {
        var _self = this;
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createUserMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createInterestUserMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createInterestMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createProjectMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createPostMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createConnectionMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createFollowerMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createUserPostGoodIdeaMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createUserProjectGoodIdeaMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createPostCommentMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createProjectInterestMongo(dbo, db);
        });
        mongodb_1.MongoClient.connect(database, function (err, db) {
            if (err)
                throw err;
            const dbo = db.db(name);
            _self.createParticipantMongo(dbo, db);
        });
    }
    createUserMongo(dbo, db) {
        dbo.createCollection("User", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de usuário não foi criado.";
            db.close();
        });
    }
    createInterestUserMongo(dbo, db) {
        dbo.createCollection("InterestUser", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de interesse do usuário não foi criada.";
            db.close();
        });
    }
    createInterestMongo(dbo, db) {
        dbo.createCollection("Interest", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de interesse não foi criada.";
            db.close();
        });
    }
    createProjectMongo(dbo, db) {
        dbo.createCollection("Project", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de projeto não foi criado.";
            db.close();
        });
    }
    createPostMongo(dbo, db) {
        dbo.createCollection("Post", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de post não foi criado.";
            db.close();
        });
    }
    createConnectionMongo(dbo, db) {
        dbo.createCollection("Connection", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de conexão não foi criado.";
            db.close();
        });
    }
    createFollowerMongo(dbo, db) {
        dbo.createCollection("Follower", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de seguidor não foi criado.";
            db.close();
        });
    }
    createUserPostGoodIdeaMongo(dbo, db) {
        dbo.createCollection("UserPostGoodIdea", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de usuário post boa ideia não foi criado.";
            db.close();
        });
    }
    createUserProjectGoodIdeaMongo(dbo, db) {
        dbo.createCollection("UserProjectGoodIdea", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de usuário projeto boa ideia não foi criado.";
            db.close();
        });
    }
    createPostCommentMongo(dbo, db) {
        dbo.createCollection("PostComment", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de comentário do post não foi criado.";
            db.close();
        });
    }
    createProjectInterestMongo(dbo, db) {
        dbo.createCollection("ProjectInterest", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de interesse do projeto não foi criado.";
            db.close();
        });
    }
    createParticipantMongo(dbo, db) {
        dbo.createCollection("Participant", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de participante não foi criado.";
            db.close();
        });
    }
    createCommentCommentedMongo(dbo, db) {
        dbo.createCollection("CommentCommented", function (err, res) {
            if (err && err.codeName != 'NamespaceExists' && !(err === null || err === void 0 ? void 0 : err.message.includes('Collection already exists')))
                throw "Coleção de comentário do comentário não foi criado.";
            db.close();
        });
    }
}
exports.Tabelas = Tabelas;
//# sourceMappingURL=tabelas.js.map