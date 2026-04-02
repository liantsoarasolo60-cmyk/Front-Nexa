export interface user {
  _id: string;
  approvalRequestedAt: Date;
  approvedAt: Date;
  approvedBy: String;
  createdAt: Date;
  currentClass: {
    code: String;
    level: String;
    name: String;
    _id: String;
  };
  nameClasse :String;
  email: String;
  phone: String;
  firstName: String;
  isApproved: Boolean;
  lastName: String;
  lastResetRequest: Date;
  matricule: String;
  profilPicture: String;
  resetPasswordAttempts: Number;
  resetPasswordOTP: String;
  resetPasswordOTPExpires: Date;
  resetPasswordToken: String;
  role: String;
  matieres?: [
    {
      nom?: String;
      niveau?: String;
    },
  ];
  disponibilites?: [
    {
      semaine?: String;
      soumis_le?: Date;
      valide?: Boolean;
      creneaux?: [
        {
          jour?: String;
          heure_debut?: Number;
          heure_fin?: Number;
          type_cours?: String;
        },
      ];
    },
  ];
}