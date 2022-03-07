"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class Logger {
    constructor(context, message) {
        this.context = context;
        this.message = message;
    }
    log() {
        const data = new Date();
        const fileName = 'log.txt';
        const row = `\n${data.toISOString()} [ ${this.context} ] : ${this.message} `;
        fs.appendFile(fileName, row, (err) => {
            if (err)
                console.log(err);
        });
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map