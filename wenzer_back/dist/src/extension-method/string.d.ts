export {};
declare global {
    interface String {
        toSql(): string;
    }
}
