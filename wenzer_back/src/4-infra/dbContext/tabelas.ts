import { Db, MongoClient } from "mongodb";

const database: string = process.env.BASE_URL_DATABASE!;

export class Tabelas {
    
    constructor() {
        var _self = this;
        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createUserMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createInterestUserMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createInterestMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createProjectMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createPostMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createConnectionMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createFollowerMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createUserPostGoodIdeaMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createUserProjectGoodIdeaMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createPostCommentMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if(err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createProjectInterestMongo(dbo, db);
        });

        MongoClient.connect(database, function(err: any, db: any) {
            if (err) throw err;
            const dbo = db.db("WenzerDB");
            _self.createParticipantMongo(dbo, db);
        })
    }

    createUserMongo(dbo: Db, db: any) {
        dbo.createCollection("User", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de usuário não foi criado.";
            db.close();
        });
    }

    createInterestUserMongo(dbo: Db, db: any) {
        dbo.createCollection("InterestUser", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de interesse do usuário não foi criada.";
            db.close();
        });
    }

    createInterestMongo(dbo: Db, db: any) {
        dbo.createCollection("Interest", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de interesse não foi criada.";
            db.close();
        });
    }

    createProjectMongo(dbo: Db, db: any) {
        dbo.createCollection("Project", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de projeto não foi criado.";
            db.close();
        });
    }

    createPostMongo(dbo: Db, db: any) {
        dbo.createCollection("Post", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de post não foi criado.";
            db.close();
        });
    }

    createConnectionMongo(dbo: Db, db: any) {
        dbo.createCollection("Connection", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de conexão não foi criado.";
            db.close();
        });
    }

    createFollowerMongo(dbo: Db, db: any) {
        dbo.createCollection("Follower", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de seguidor não foi criado.";
            db.close();
        });
    }

    createUserPostGoodIdeaMongo(dbo: Db, db: any) {
        dbo.createCollection("UserPostGoodIdea", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de usuário post boa ideia não foi criado.";
            db.close();
        });
    }

    createUserProjectGoodIdeaMongo(dbo: Db, db: any) {
        dbo.createCollection("UserProjectGoodIdea", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de usuário projeto boa ideia não foi criado.";
            db.close();
        });
    }

    createPostCommentMongo(dbo: Db, db: any) {
        dbo.createCollection("PostComment", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de comentário do post não foi criado.";
            db.close();
        });
    }

    createProjectInterestMongo(dbo: Db, db: any) {
        dbo.createCollection("ProjectInterest", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de interesse do projeto não foi criado.";
            db.close();
        });
    }

    createParticipantMongo(dbo: Db, db: any) {
        dbo.createCollection("Participant", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de participante não foi criado.";
            db.close();
        });
    }

    createCommentCommentedMongo(dbo: Db, db: any) {
        dbo.createCollection("CommentCommented", function(err, res) {
            if (err && !err?.message.includes('Collection already exists')) throw "Coleção de comentário do comentário não foi criado.";
            db.close();
        });
    }

}