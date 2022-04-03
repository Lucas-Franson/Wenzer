import { Db, MongoClient } from "mongodb";

const database: string = process.env.BASE_URL_DATABASE!;

export class Tabelas {
    
    constructor() {
        // this.createUsers();
        // this.createProject();
        // this.createPost();
        // this.createConnections();
        // this.createFollowers();
        // this.createEmailMarketing();
        // this.createInterests();
        // this.createInterestUser();
        // this.createUserPostGoodIdea();
        // this.createPostComments();
        // this.createProjectInterests();
        // this.createParticipants();
        // this.createUserProjectGoodIdea();
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

    executeQuery(sql: string) {
        // this.conexao.query(sql, (err: any) => {
        //     if (err) {
        //         console.error(err);
        //     }
        // });
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

    // createInterestUser() {
    //     const sql = `CREATE TABLE IF NOT EXISTS InterestUser (id varchar(255) NOT NULL,
    //         idInterests varchar(255) NOT NULL, idUser varchar(255) NOT NULL, 
    //         updated_at timestamp, created_at timestamp, 
    //         PRIMARY KEY (id, idInterests, idUser),
    //         FOREIGN KEY (idInterests) REFERENCES Interests (id) on DELETE CASCADE,
    //         FOREIGN KEY (idUser) REFERENCES User (id) on DELETE CASCADE 
    //     )`;
    //     this.executeQuery(sql);
    // }

    // createInterests() {
    //     const sql = `CREATE TABLE IF NOT EXISTS Interests (id varchar(255) NOT NULL,
    //         name varchar(255), updated_at timestamp, created_at timestamp, PRIMARY KEY(id))`;
    //     this.executeQuery(sql);
    // }

    // createUsers() {
    //     const sql = `CREATE TABLE IF NOT EXISTS User (id varchar(255) NOT NULL,
    //         email varchar(255) NOT NULL, name varchar(255) NOT NULL, emailValid 
    //         tinyint(1), password varchar(255) NOT NULL, bio varchar(400), 
    //         title varchar(255), photo longtext, updated_at timestamp, 
    //         created_at timestamp, PRIMARY KEY(id))`;
    //     this.executeQuery(sql);
    // }

    // createProject() {
    //     const sql = `CREATE TABLE IF NOT EXISTS Project (id varchar(255) NOT NULL,
    //         name varchar(255) NOT NULL, description varchar(1000), photo Blob, 
    //         active tinyint(1) DEFAULT 0 NOT NULL, publicProject tinyint(1) DEFAULT 0 NOT NULL, 
    //         marketing tinyint(1) DEFAULT 0 NOT NULL, userId varchar(255) NOT NULL,
    //         updated_at timestamp, created_at timestamp, PRIMARY KEY(id),
    //         FOREIGN KEY (userId) REFERENCES User (id) on DELETE CASCADE)`;
    //     this.executeQuery(sql);
    // }

    // createPost() {
    //     const sql = `CREATE TABLE IF NOT EXISTS Post (id varchar(255) NOT NULL,
    //         idUser varchar(255), countViews int NOT NULL, title varchar(400) NOT NULL,
    //         description varchar(1000), photo MEDIUMBLOB, idProject varchar(255), 
    //         updated_at timestamp, created_at timestamp, 
    //         PRIMARY KEY (id), 
    //         FOREIGN KEY (idUser) REFERENCES User(id) on DELETE CASCADE,
    //         FOREIGN KEY (idProject) REFERENCES Project(id) on DELETE CASCADE)`;
    //     this.executeQuery(sql);
    // }

    // createConnections() {
    //     const sql = `CREATE TABLE IF NOT EXISTS Connections (id varchar(255) NOT NULL,
    //         idUser varchar(255) NOT NULL, idFollower varchar(255) NOT NULL, 
    //         accepted tinyint(1) NOT NULL, updated_at timestamp, created_at timestamp, 
    //         PRIMARY KEY (id, idUser, idFollower),
    //         FOREIGN KEY (idUser) REFERENCES User(id) on DELETE CASCADE,
    //         FOREIGN KEY (idFollower) REFERENCES User(id) on DELETE CASCADE)`;
    //     this.executeQuery(sql);
    // }

    // createFollowers() {
    //     const sql = `CREATE TABLE IF NOT EXISTS Followers (id varchar(255) NOT NULL,
    //         idProject varchar(255) NOT NULL, idUser varchar(255) NOT NULL,
    //         updated_at timestamp, created_at timestamp, 
    //         PRIMARY KEY (id, idUser, idProject),
    //         FOREIGN KEY (idUser) REFERENCES User(id) on DELETE CASCADE,
    //         FOREIGN KEY (idProject) REFERENCES Project(id) on DELETE CASCADE)`;
    //     this.executeQuery(sql);
    // }

    // createEmailMarketing() {
    //     const sql = `CREATE TABLE IF NOT EXISTS EmailMarketing (id varchar(255) NOT NULL, 
    //         email varchar(255) NOT NULL, created_at timestamp, PRIMARY KEY(id))`
    //     this.executeQuery(sql);
    // }

    // createUserPostGoodIdea() {
    //     const sql = `CREATE TABLE IF NOT EXISTS UserPostGoodIdea (id varchar(255) NOT NULL, 
    //     idUser varchar(255) NOT NULL, idPost varchar(255) NOT NULL, 
    //     updated_at timestamp, created_at timestamp, 
    //     PRIMARY KEY (id, idUser, idPost), 
    //     FOREIGN KEY (idUser) REFERENCES User (id) on DELETE CASCADE,
    //     FOREIGN KEY (idPost) REFERENCES Post (id) on DELETE CASCADE)`
    //     this.executeQuery(sql);
    // }

    // createUserProjectGoodIdea() {
    //     const sql = `CREATE TABLE IF NOT EXISTS UserProjectGoodIdea (id varchar(255) NOT NULL, 
    //     idUser varchar(255) NOT NULL, idProject varchar(255) NOT NULL, 
    //     updated_at timestamp, created_at timestamp, 
    //     PRIMARY KEY (id, idUser, idProject), 
    //     FOREIGN KEY (idUser) REFERENCES User (id) on DELETE CASCADE,
    //     FOREIGN KEY (idProject) REFERENCES Project (id) on DELETE CASCADE)`
    //     this.executeQuery(sql);
    // }

    // createPostComments() {
    //     const sql = `CREATE TABLE IF NOT EXISTS PostComments (id varchar(255) NOT NULL, 
    //     idUser varchar(255) NOT NULL, idPost varchar(255) NOT NULL, text varchar(400) NOT NULL,
    //     updated_at timestamp, created_at timestamp, 
    //     PRIMARY KEY (id, idUser, idPost), 
    //     FOREIGN KEY (idUser) REFERENCES User(id) on DELETE CASCADE,
    //     FOREIGN KEY (idPost) REFERENCES Post(id) on DELETE CASCADE)`
    //     this.executeQuery(sql);
    // }

    // createProjectInterests() {
    //     const sql = `CREATE TABLE IF NOT EXISTS ProjectInterests (id varchar(255) NOT NULL, 
    //     idProject varchar(255) NOT NULL, idInterests varchar(255) NOT NULL,
    //     updated_at timestamp, created_at timestamp, 
    //     PRIMARY KEY (id, idProject, idInterests), 
    //     FOREIGN KEY (idProject) REFERENCES Project (id) on DELETE CASCADE,
    //     FOREIGN KEY (idInterests) REFERENCES Interests (id) on DELETE CASCADE)`
    //     this.executeQuery(sql);
    // }

    // createParticipants() {
    //     const sql = `CREATE TABLE IF NOT EXISTS Participants (id varchar(255) NOT NULL, 
    //     idProject varchar(255) NOT NULL, idUser varchar(255) NOT NULL, 
    //     accepted tinyint(1) NOT NULL DEFAULT 0, role varchar(400), 
    //     updated_at timestamp, created_at timestamp, 
    //     PRIMARY KEY (id, idProject, idUser), 
    //     FOREIGN KEY (idProject) REFERENCES Project (id) on DELETE CASCADE,
    //     FOREIGN KEY (idUser) REFERENCES User (id) on DELETE CASCADE)`
    //     this.executeQuery(sql);
    // }

}