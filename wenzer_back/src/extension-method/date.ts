'strict'
export {}

declare global {
    interface Date {
        toSql(): string;
    }
}

Date.prototype.toSql = function() {
    return `'${this.getFullYear()}-${this.getMonth()}-${this.getDay()} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}'`;
}