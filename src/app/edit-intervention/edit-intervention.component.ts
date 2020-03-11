import {Component, OnInit} from '@angular/core';
import {InterventionService} from '../services/intervention.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Intervention} from '../models/intervention.model';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  dateIntervention: Date;
  editInterventionForm: FormGroup;

  constructor(private interventionService: InterventionService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.interventionService.getSingleIntervention(+id).then(
      (intervention: Intervention) => {
        this.intervention = intervention;
      }
    );
    this.editInterventionForm = this.formBuilder.group({
      id: '',
      libelle: '',
      description: '',
      nomIntervenant:  '',
      lieu: '',
      dateIntervention: ''
    });
  }

  onEditIntervention(intervention: Intervention) {

    this.interventionService.editIntervention(intervention);
    this.interventionService.emitInterventions();
  }

  onSubmitEditForm() {
    if (this.libelle !== '') {
      this.libelle = this.intervention.libelle;
    } else if (!this.libelle && this.editInterventionForm.get('libelle').value !== '') {
      this.intervention.libelle = this.editInterventionForm.get('libelle').value;
    }
    if (this.description) {
      this.description = this.intervention.description;
    } else if (!this.description && this.editInterventionForm.get('description').value !== '') {
      this.intervention.description = this.editInterventionForm.get('description').value;
    }
    if (this.nomIntervenant) {
      this.nomIntervenant = this.intervention.nomIntervenant;
    } else if (!this.nomIntervenant && this.editInterventionForm.get('nomIntervenant').value !== '') {
      this.intervention.nomIntervenant = this.editInterventionForm.get('nomIntervenant').value;
    }
    if (this.lieu) {
      this.lieu = this.intervention.lieu;
    } else if (!this.lieu && this.editInterventionForm.get('lieu').value !== '') {
      this.intervention.lieu = this.editInterventionForm.get('lieu').value;
    }
    if (this.dateIntervention) {
      this.dateIntervention = this.intervention.dateIntervention;
    } else if (!this.dateIntervention && this.editInterventionForm.get('dateIntervention').value !== '') {
      this.intervention.dateIntervention = this.editInterventionForm.get('dateIntervention').value;
    }
    this.interventionService.editIntervention(this.intervention);
    this.router.navigate(['interventions-list']);
  }

  onBack() {
    this.router.navigate(['/interventions-list']);
  }

  dateExist() {
    if (this.intervention.dateIntervention) {
      return 'text';
    } else {
      return 'date';
    }
  }

}
