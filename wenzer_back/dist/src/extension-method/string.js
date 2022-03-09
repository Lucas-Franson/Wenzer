"use strict";
'strict';
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.toSql = function () {
    return `'${new String(this) + ''}'`;
};
//# sourceMappingURL=string.js.map