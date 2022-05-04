"use strict";
'strict';
Object.defineProperty(exports, "__esModule", { value: true });
Date.prototype.toSql = function () {
    return `'${this.getFullYear()}-${this.getMonth()}-${this.getDay()} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}'`;
};
//# sourceMappingURL=date.js.map