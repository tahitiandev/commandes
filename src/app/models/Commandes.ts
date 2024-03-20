import { ModeReglement } from "../enums/ModeReglements";

export interface Commandes{
    id:string;
    platid : string;
    quantite : number;
    numeroTable : string;
    isActif : boolean;
    isPrepare : boolean;
    isLivre : boolean;
    isRegle : boolean;
    commentaire : string;
    commentairePreparateur : string;
    createdOn : Date;
    groupeCommande? : string;
    nomClientComptant?:string;
}