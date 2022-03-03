import { React } from "../../3-domain/entities/react";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IReactRepository } from "../irepositories/IreactRepository";

export class ReactRepository extends Orm<React> implements IReactRepository {
    
}