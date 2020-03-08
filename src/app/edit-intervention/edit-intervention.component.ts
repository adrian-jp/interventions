import { Component, OnInit } from '@angular/core';
import {InterventionService} from '../services/intervention.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Intervention} from '../models/intervention.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-intervention',
  templateUrl: './edit-intervention.component.html',
  styleUrls: ['./edit-intervention.component.scss']
})
export class EditInterventionComponent implements OnInit {

  intervention: Intervention;
  libelle: string;
  description: string;
  nomIntervenant: string;
  lieu: string;
  dateIntervention: string;
  interventionForm: FormGroup;

  constructor( private interventionService: InterventionService,
               private route: ActivatedRoute,
               private router: Router,
               private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.interventionForm = this.formBuilder.group({
      id: '',
      libelle: ['', Validators.required],
      description: '',
      nomIntervenant: '',
      lieu: '',
      dateIntervention: ''
    });
    const id = this.route.snapshot.params.id;
    this.interventionService.getSingleIntervention(+id).then(
      (intervention: Intervention) => {
        this.intervention = intervention;
      }
    );
//    this.libelle = this.interventionService.getInterventionById(+id).libelle;
//    this.description = this.interventionService.getInterventionById(+id).description;
//    this.nomIntervenant = this.interventionService.getInterventionById(+id).nomIntervenant;
//    this.lieu = this.interventionService.getInterventionById(+id).lieu;
//    this.dateIntervention = this.interventionService.getInterventionById(+id).dateIntervention;

  }

  onBack() {
    this.router.navigate(['/interventions-list']);
  }

}
