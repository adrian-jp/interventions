import {Intervention} from '../models/intervention.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase/';
import 'firebase/firestore';



@Injectable()
export class InterventionService {

  private interventions: Intervention[] = [];
  interventionSubject = new Subject<Intervention[]>();

  constructor() {
  }

  emitInterventions() {
    this.interventionSubject.next(this.interventions.slice());
  }

  getInterventionById(id: number) {
    const intervention = this.interventions.find(
      (interventionObject) => {
        return interventionObject.id === id;
      }
    );
    return intervention;
  }
  addIntervention(intervention: Intervention) {

    intervention.id = (this.interventions.length === 0) ? 0 : this.interventions[this.interventions.length - 1].id + 1;
    this.interventions.push(intervention);
    this.saveIntervention();
    this.emitInterventions();
  }

  editIntervention(intervention: Intervention) {
    const interventionIndexToRemove = this.interventions.findIndex(
      (intervEl) => {
        if (intervEl === intervention) {
          return true;
        }
      }
    );
    this.interventions.splice(interventionIndexToRemove, 1);
    this.interventions.push(intervention);
    this.saveIntervention();
    this.emitInterventions();
  }

  removeIntervention(intervention: Intervention) {
    const interventionIndexToRemove = this.interventions.findIndex(
      (intervEl) => {
        if (intervEl === intervention) {
          return true;
        }
      }
    );
    this.interventions.splice(interventionIndexToRemove, 1);
    this.saveIntervention();
    this.emitInterventions();
  }

  saveIntervention() {
    firebase.database().ref('/interventions-list').set(this.interventions);
  }

  getInterventions() {
    firebase.database().ref('/interventions-list')
      .on('value', (data) => {
        this.interventions = data.val() ? data.val() : [];
        this.emitInterventions();
      });
  }

  getSingleIntervention(id: number) {
    return new Promise(
      ((resolve, reject) => {
        firebase.database().ref('/interventions-list/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      })
    );
  }
}
