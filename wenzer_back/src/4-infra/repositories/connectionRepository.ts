import { Connections } from "../../3-domain/entities/conections";
import { Orm } from "./orm";
import { IConnectionRepository } from "../irepositories/IconnectionRepository";
import { MongoClient } from "mongodb";

const url: string = process.env.BASE_URL_DATABASE!;
const collection = "Connection";
const database = "WenzerDB";

export class ConnectionRepository extends Orm<Connections> implements IConnectionRepository {
    
    getConnectionOfUser(idUser: string): Promise<any> {
        return new Promise(function(resolve, reject){ 
            MongoClient.connect(url).then(function(db){
                var dbo = db.db(database);
                dbo.collection('Connection').aggregate([
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'idUser',
                            foreignField: '_id',
                            as: 'userOne'
                        }
                    },
                    {
                        $unwind: "$userOne"
                    },
                    {
                        $lookup: {
                            from: 'User',
                            localField: 'idFollower',
                            foreignField: '_id',
                            as: 'userTwo'
                        }
                    },
                    {
                        $unwind: "$userTwo"
                    },
                    {
                        $match: {
                            $or: [
                                {
                                    idFollower: idUser
                                },
                                {
                                    idUser
                                }
                            ]
                        }
                    },
                    {
                        $project: {
                            _id: { 
                                $cond: {
                                    if: { $eq: [ idUser, "$userOne._id" ]},
                                    then: "$userTwo._id",
                                    else: "$userOne._id"
                                }
                            },
                            name: { 
                                $cond: {
                                    if: { $eq: [ idUser, "$userOne._id" ]},
                                    then: "$userTwo.name",
                                    else: "$userOne.name"
                                }
                            },
                            photo: { 
                                $cond: {
                                    if: { $eq: [ idUser, "$userOne._id" ]},
                                    then: "$userTwo.photo",
                                    else: "$userOne.photo"
                                }
                            },
                        }
                    }
                ])
                .sort({ created_at: 1 })
                .limit(3).toArray(function(err: any, results: any) {
                    resolve(results);
                    db.close();
                });
            });
        });
    }

    handleArrayResult(result: Connections[]) {
        if (result && result instanceof Array && result.length > 0) {
            let connections: any[] = [];
            result.forEach((value: Connections) => {
                let connection = new Connections(
                    value.idUser,
                    value.idFollower,
                    value.accepted,
                    value._id,
                    value.created_at,
                    value.updated_at
                );
                connections.push(connection);
            });
            return connections;
        } 
        else {
            return [];
        }
    }

    handleResult(results: Connections): Connections | null {
        if(results && !(results instanceof Array)) {
            return new Connections(
                results.idUser,
                results.idFollower,
                results.accepted,
                results._id,
                results.created_at,
                results.updated_at
            );
        }
        else {
            return null;
        }
    }

}