import { Followers } from "../../3-domain/entities/followers";
import { IOrm } from "./Iorm";

export interface IFollowersRepository extends IOrm<Followers> {
    convertToFollowerObject(follower: any): Followers | null;
}