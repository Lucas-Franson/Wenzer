import { Followers } from "../../3-domain/entities/followers";
import { IFollowerRepository } from "../irepositories/IfollowerRepository";
import { Orm } from "./orm";
export declare class FollowerRepository extends Orm<Followers> implements IFollowerRepository {
    handleArrayResult(result: Followers[]): any[];
    handleResult(results: Followers): Followers | null;
}
