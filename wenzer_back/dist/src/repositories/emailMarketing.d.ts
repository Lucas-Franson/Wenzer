export declare class EmailMarketing {
    id: string;
    email: string;
    emailValid: boolean;
    created_at: Date;
    constructor();
    Adiciona(): Promise<void>;
    Buscar(): Promise<void>;
    Update(): Promise<void>;
    ConstruirWhere(): string;
}
