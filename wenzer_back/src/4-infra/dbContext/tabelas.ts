
export class Tabelas {
    
    constructor(private conexao: any) {
        this.createUsers();
        this.createProject();
        this.createPost();
        this.createConnections();
        this.createFollowers();
        this.createEmailMarketing();
        this.createInterests();
        this.createInterestUser();
        this.createUserPostGoodIdea();
        this.createPostComments();
        this.createProjectInterests();
        this.createParticipants();
    }

    executeQuery(sql: string) {
        this.conexao.query(sql, (err: any) => {
            if (err) {
                console.error(err);
            }
        });
    }

    createInterestUser() {
        const sql = `CREATE TABLE IF NOT EXISTS InterestUser (id varchar(255) NOT NULL,
            idInterests varchar(255) NOT NULL, idUser varchar(255) NOT NULL, 
            updated_at timestamp, created_at timestamp, 
            PRIMARY KEY (id, idInterests, idUser),
            FOREIGN KEY (idInterests) REFERENCES Interests (id) on DELETE CASCADE,
            FOREIGN KEY (idUser) REFERENCES User (id) on DELETE CASCADE 
        )`;
        this.executeQuery(sql);
    }

    createInterests() {
        const sql = `CREATE TABLE IF NOT EXISTS Interests (id varchar(255) NOT NULL,
            name varchar(255), updated_at timestamp, created_at timestamp, PRIMARY KEY(id))`;
        this.executeQuery(sql);
    }

    createUsers() {
        const sql = `CREATE TABLE IF NOT EXISTS User (id varchar(255) NOT NULL,
            email varchar(255) NOT NULL, name varchar(255) NOT NULL, emailValid 
            tinyint(1), password varchar(255) NOT NULL, bio varchar(400), 
            title varchar(255), photo Blob, updated_at timestamp, 
            created_at timestamp, PRIMARY KEY(id))`;
        this.executeQuery(sql);
    }

    createProject() {
        const sql = `CREATE TABLE IF NOT EXISTS Project (id varchar(255) NOT NULL,
            name varchar(255) NOT NULL, description varchar(1000), photo Blob, 
            active tinyint(1) DEFAULT 0 NOT NULL, publicProject tinyint(1) DEFAULT 0 NOT NULL, 
            marketing tinyint(1) DEFAULT 0 NOT NULL, userId varchar(255) NOT NULL,
            updated_at timestamp, created_at timestamp, PRIMARY KEY(id),
            FOREIGN KEY (userId) REFERENCES User (id) on DELETE CASCADE)`;
        this.executeQuery(sql);
    }

    createPost() {
        const sql = `CREATE TABLE IF NOT EXISTS Post (id varchar(255) NOT NULL,
            idUser varchar(255), countViews int NOT NULL, title varchar(400) NOT NULL,
            description varchar(1000), photo MEDIUMBLOB, idProject varchar(255), 
            updated_at timestamp, created_at timestamp, 
            PRIMARY KEY (id), 
            FOREIGN KEY (idUser) REFERENCES User(id) on DELETE CASCADE,
            FOREIGN KEY (idProject) REFERENCES Project(id) on DELETE CASCADE)`;
        this.executeQuery(sql);
    }

    createConnections() {
        const sql = `CREATE TABLE IF NOT EXISTS Connections (id varchar(255) NOT NULL,
            idUser varchar(255) NOT NULL, idFollower varchar(255) NOT NULL, 
            accepted tinyint(1) NOT NULL, updated_at timestamp, created_at timestamp, 
            PRIMARY KEY (id, idUser, idFollower),
            FOREIGN KEY (idUser) REFERENCES User(id) on DELETE CASCADE,
            FOREIGN KEY (idFollower) REFERENCES User(id) on DELETE CASCADE)`;
        this.executeQuery(sql);
    }

    createFollowers() {
        const sql = `CREATE TABLE IF NOT EXISTS Followers (id varchar(255) NOT NULL,
            idProject varchar(255) NOT NULL, idUser varchar(255) NOT NULL,
            updated_at timestamp, created_at timestamp, 
            PRIMARY KEY (id, idUser, idProject),
            FOREIGN KEY (idUser) REFERENCES User(id) on DELETE CASCADE,
            FOREIGN KEY (idProject) REFERENCES Project(id) on DELETE CASCADE)`;
        this.executeQuery(sql);
    }

    createEmailMarketing() {
        const sql = `CREATE TABLE IF NOT EXISTS EmailMarketing (id varchar(255) NOT NULL, 
            email varchar(255) NOT NULL, created_at timestamp, PRIMARY KEY(id))`
        this.executeQuery(sql);
    }

    createUserPostGoodIdea() {
        const sql = `CREATE TABLE IF NOT EXISTS UserPostGoodIdea (id varchar(255) NOT NULL, 
        idUser varchar(255) NOT NULL, idPost varchar(255) NOT NULL, 
        updated_at timestamp, created_at timestamp, 
        PRIMARY KEY (id, idUser, idPost), 
        FOREIGN KEY (idUser) REFERENCES User (id) on DELETE CASCADE,
        FOREIGN KEY (idPost) REFERENCES Post (id) on DELETE CASCADE)`
        this.executeQuery(sql);
    }

    createPostComments() {
        const sql = `CREATE TABLE IF NOT EXISTS PostComments (id varchar(255) NOT NULL, 
        idUser varchar(255) NOT NULL, idPost varchar(255) NOT NULL, text varchar(400) NOT NULL,
        updated_at timestamp, created_at timestamp, 
        PRIMARY KEY (id, idUser, idPost), 
        FOREIGN KEY (idUser) REFERENCES User(id) on DELETE CASCADE,
        FOREIGN KEY (idPost) REFERENCES Post(id) on DELETE CASCADE)`
        this.executeQuery(sql);
    }

    createProjectInterests() {
        const sql = `CREATE TABLE IF NOT EXISTS ProjectInterests (id varchar(255) NOT NULL, 
        idProject varchar(255) NOT NULL, idInterests varchar(255) NOT NULL,
        updated_at timestamp, created_at timestamp, 
        PRIMARY KEY (id, idProject, idInterests), 
        FOREIGN KEY (idProject) REFERENCES Project (id) on DELETE CASCADE,
        FOREIGN KEY (idInterests) REFERENCES Interests (id) on DELETE CASCADE)`
        this.executeQuery(sql);
    }

    createParticipants() {
        const sql = `CREATE TABLE IF NOT EXISTS Participants (id varchar(255) NOT NULL, 
        idProject varchar(255) NOT NULL, idUser varchar(255) NOT NULL, 
        accepted tinyint(1) NOT NULL DEFAULT 0, role varchar(400), 
        updated_at timestamp, created_at timestamp, 
        PRIMARY KEY (id, idProject, idUser), 
        FOREIGN KEY (idProject) REFERENCES Project (id) on DELETE CASCADE,
        FOREIGN KEY (idUser) REFERENCES User (id) on DELETE CASCADE)`
        this.executeQuery(sql);
    }

}