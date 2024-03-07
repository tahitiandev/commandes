export interface Tables{
    id : string;
    numero : number;
    nombreCommande : number;
    isActif : boolean;
    isFirebase : boolean;
    createdOn : Date;
    createdBy : string;
    modifedOn? : Date;
    modifedBy? : string;
    deletedOn? : Date;
    deleteBy? : string;
}