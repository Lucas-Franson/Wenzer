const fs = require('fs');

export default class Logger {

    constructor(private context: string, private message: string) {

    }

    log() {
        const data = new Date();
        const fileName = 'log.txt';
        const row = `\n${data.toISOString()} [ ${this.context} ] : ${this.message} `;

        fs.appendFile(fileName, row, (err: any) => {
            if (err) console.log(err);
        });
    }

}