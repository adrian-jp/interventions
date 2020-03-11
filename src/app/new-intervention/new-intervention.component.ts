import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InterventionService} from '../services/intervention.service';
import {Router} from '@angular/router';
import {Intervention} from '../models/intervention.model';


@Component({
  selector: 'app-new-intervention',
  templateUrl: './new-intervention.component.html',
  styleUrls: ['./new-intervention.component.scss']
})
export class NewInterventionComponent implements OnInit {

  interventionForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private interventionService: InterventionService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.interventionForm = this.formBuilder.group({
      id: '',
      libelle: ['', Validators.required],
      description: '',
      nomIntervenant: '',
      lieu: '',
      dateIntervention: new Date()
    });
  }

  onSubmitForm() {
    const formValue = this.interventionForm.value;
    const newIntervention = new Intervention(
      formValue.id,
      formValue.libelle,
      formValue.description,
      formValue.nomIntervenant,
      formValue.lieu,
      formValue.dateIntervention
    );
    this.interventionService.addIntervention(newIntervention);
    this.router.navigate(['interventions-list']);
  }

  onSaveIntervention() {
    const id = 0;
    const libelle = this.interventionForm.get('libelle').value;
    const description = this.interventionForm.get('description').value;
    const nomIntervenant = this.interventionForm.get('nomIntervenant').value;
    const lieu = this.interventionForm.get('lieu').value;
    const dateIntervention = this.interventionForm.get('dateIntervention').value;
    const newIntervention = new Intervention(id, libelle, description, nomIntervenant, lieu, dateIntervention);
  }

  onBack() {
    this.router.navigate(['/interventions-list']);
  }
}
