import { Db } from "mongodb";
export declare class Tabelas {
    constructor();
    createUserMongo(dbo: Db, db: any): void;
    createInterestUserMongo(dbo: Db, db: any): void;
    createInterestMongo(dbo: Db, db: any): void;
    createProjectMongo(dbo: Db, db: any): void;
    createPostMongo(dbo: Db, db: any): void;
    createConnectionMongo(dbo: Db, db: any): void;
    createFollowerMongo(dbo: Db, db: any): void;
    createUserPostGoodIdeaMongo(dbo: Db, db: any): void;
    createUserProjectGoodIdeaMongo(dbo: Db, db: any): void;
    createPostCommentMongo(dbo: Db, db: any): void;
    createProjectInterestMongo(dbo: Db, db: any): void;
    createParticipantMongo(dbo: Db, db: any): void;
    createCommentCommentedMongo(dbo: Db, db: any): void;
}
