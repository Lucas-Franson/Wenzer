"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantRepository = void 0;
const participants_1 = require("../../3-domain/entities/participants");
const orm_1 = require("./orm");
const url = process.env.BASE_URL_DATABASE;
const collection = "Participant";
const database = process.env.BASE_NAME_DATABASE;
class ParticipantRepository extends orm_1.Orm {
    handleArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let participants = [];
            result.forEach((value) => {
                let participant = new participants_1.Participants(value.idProject, value.idUser, value.accepted, value.role, value._id, value.created_at, value.updated_at);
                participants.push(participant);
            });
            return participants;
        }
        else {
            return [];
        }
    }
    handleResult(results) {
        if (results && !(results instanceof Array)) {
            return new participants_1.Participants(results.idProject, results.idUser, results.accepted, results.role, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
}
exports.ParticipantRepository = ParticipantRepository;
//# sourceMappingURL=participantRepository.js.map