import {Component, OnDestroy, OnInit} from '@angular/core';
import {Intervention} from '../models/intervention.model';
import {Subscription} from 'rxjs';
import {InterventionService} from '../services/intervention.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-intervention-table',
  templateUrl: './intervention-table.component.html',
  styleUrls: ['./intervention-table.component.scss']
})
export class InterventionTableComponent implements OnInit, OnDestroy {

  interventions: Intervention[];
  interventionSubscription: Subscription;
  id: number;
  dateDuJour = new Date();

  constructor(private interventionService: InterventionService, private router: Router) { }

  ngOnInit() {
    this.interventionSubscription = this.interventionService.interventionSubject.subscribe(
      (interventions: Intervention[]) => {
        this.interventions = interventions;
      }
    );
    this.interventionService.getInterventions();
    this.interventionService.emitInterventions();
  }

  getColors(intervention: Intervention) {
    const dateAComparer = new Date(intervention.dateIntervention);
    if (this.dateDuJour > dateAComparer) {
      return 'bg-danger';
    } else if (!intervention.description || !intervention.nomIntervenant ||
      !intervention.lieu || !intervention.dateIntervention) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  onSortTable(param: any) {
    // C'est dans cette partie que je comptes rendre le tableau triable par dates
    this.interventions.sort((a: Intervention, b: Intervention) => {
      return a[param] - b[param];
    });
  }

  deleteIntervention(intervention: Intervention) {
    this.interventionService.removeIntervention(intervention);
  }

  onEditIntervention(id: number) {
    this.router.navigate(['/interventions-list', id]);
  }

  ngOnDestroy() {
    this.interventionSubscription.unsubscribe();
  }

}
