'strict'
export {}

declare global {
    interface Date {
        toSql(): string;
    }
}

Date.prototype.toSql = function() {
    return `'${this}'`;
}