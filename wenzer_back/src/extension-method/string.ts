'strict'
export {}

declare global {
    interface String {
        toSql(): string;
    }
}

String.prototype.toSql = function() {
    return `'${ new String(this) + '' }'`;
}