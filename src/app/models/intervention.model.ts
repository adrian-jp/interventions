export class Intervention {
  constructor(public id: number,
              public libelle: string,
              public description: string,
              public nomIntervenant: string,
              public lieu: string,
              public dateIntervention: Date) {
  }
}
