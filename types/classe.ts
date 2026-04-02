export type Classe = {
  _id:string;
  code: String,
  nom: String,
  niveau: String,
  annee_universitaire: String,
  specialite: String,
  students: string[],
  cours_requis: [string],
  effectif: Number;
  description: String;
}
