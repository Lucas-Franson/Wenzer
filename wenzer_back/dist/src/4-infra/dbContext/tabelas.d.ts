export declare class Tabelas {
    private conexao;
    constructor(conexao: any);
    executeQuery(sql: string): void;
    createInterestUser(): void;
    createInterests(): void;
    createUsers(): void;
    createProject(): void;
    createPost(): void;
    createConnections(): void;
    createFollowers(): void;
    createEmailMarketing(): void;
}
