"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailMarketing_1 = require("../../3-domain/entities/emailMarketing");
const orm_1 = require("./orm");
class EmailMarketingRepository extends orm_1.Orm {
    handleArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let emailMarketings = [];
            result.forEach((value) => {
                let emailMarketing = new emailMarketing_1.EmailMarketing(value.email, value.emailValid, value._id, value.created_at, value.updated_at);
                emailMarketings.push(emailMarketing);
            });
            return emailMarketings;
        }
        else {
            return [];
        }
    }
    handleResult(results) {
        if (results && !(results instanceof Array)) {
            return new emailMarketing_1.EmailMarketing(results.email, results.emailValid, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
}
exports.default = EmailMarketingRepository;
//# sourceMappingURL=emailMarketingRepository.js.map