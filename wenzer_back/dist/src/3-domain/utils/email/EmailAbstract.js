"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const logger_1 = __importDefault(require("../../../4-infra/utils/logger"));
class Email {
    constructor(_from, _to, _subject, _text, _html) {
        this.From = '';
        this.To = '';
        this.Subject = '';
        this.Text = '';
        this.Html = '';
        this.From = _from;
        this.To = _to;
        this.Subject = _subject;
        this.Text = _text;
        this.Html = _html;
    }
    /**
     * @description Cria o transportador e realiza o envio do email
     */
    sendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            aws_sdk_1.default.config.update({ region: 'us-east-1' });
            const params = {
                Destination: {
                    ToAddresses: [
                        this.To
                    ]
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: this.Html
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: this.Subject
                    }
                },
                Source: this.From
            };
            var sendPromise = new aws_sdk_1.default.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
            sendPromise.then(function (data) {
                new logger_1.default('Sent Email', data.MessageId).log();
            }).catch(function (err) {
                new logger_1.default('Send Email Error', err).log();
            });
        });
    }
}
exports.Email = Email;
//# sourceMappingURL=EmailAbstract.js.map