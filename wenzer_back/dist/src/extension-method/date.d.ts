export {};
declare global {
    interface Date {
        toSql(): string;
    }
}
