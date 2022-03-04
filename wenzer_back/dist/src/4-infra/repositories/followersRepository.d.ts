import { Followers } from "../../3-domain/entities/followers";
import { Orm } from "./orm";
import { IFollowersRepository } from "../irepositories/IfollowersRepository";
export declare class FollowersRepository extends Orm<Followers> implements IFollowersRepository {
}
