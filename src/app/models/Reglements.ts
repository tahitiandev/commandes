import { ModeReglement } from "../enums/ModeReglements";

export interface Reglements{
    id : string;
    modeReglement : ModeReglement;
    montant : number;
    rendu?:number;
    groupeCommande : string;
}