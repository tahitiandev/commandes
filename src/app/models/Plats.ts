export interface Plats{
    id : string;
    libelle : string;
    description : string;
    photo : string;
    prix : number;
    famille : string;
    isActif : boolean;
    isFirebase : boolean;
    createdOn : Date;
    createdBy : string;
    modifedOn? : Date;
    modifedBy? : string;
    deletedOn? : Date;
    deleteBy? : string;
}