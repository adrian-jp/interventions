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

  onNewIntervention() {
    this.router.navigate(['/new-intervention']);
  }
  onFetch() {
    this.interventionService.getInterventions();
  }

  onSave() {
    this.interventionService.saveIntervention();
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
