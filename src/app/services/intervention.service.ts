import {Intervention} from '../models/intervention.model';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class InterventionService {
  private interventions: Intervention[] = [
    {
      id: 0,
      libelle: 'Nid de poule',
      description: 'Reboucher un nid de poule sur la chaussée',
      nomIntervenant: 'Gérard Dupont',
      lieu: 'Boulevard Dalby',
      dateIntervention: '13/04/2020'
    },
    {
      id: 1,
      libelle: 'Lampadaire',
      description: 'Changer ampoule de lampadaire',
      nomIntervenant: 'Gérard Dupont',
      lieu: 'rue Paul Bellamy',
      dateIntervention: '13/03/2020'
    },
    ];
  interventionSubject = new Subject<Intervention[]>();

  constructor(private httpClient: HttpClient) {
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

    intervention.id = this.interventions.length + 1;
    this.interventions.push(intervention);
    this.saveIntervention();
    this.interventions.push(intervention);
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

  saveInterventionToServer() {
    this.httpClient
      .put('https://interventions-35abb.firebaseio.com/interventions.json', this.interventions)
      .subscribe(
        () => {
          alert('L\'intervention a été sauvegardée');
        },
        (error) => {
          alert('Erreure lors de la sauvegarde' + error);
        }
      );
  }

  getInterventionsFromServer() {
    this.httpClient
      .get<any>('https://interventions-35abb.firebaseio.com/interventions.json')
      .subscribe(
        (response) => {
          this.interventions = response;
        },
      (error) => {
          alert('erreur de chargement' + error);
      }
      );
    this.emitInterventions();
  }
}
