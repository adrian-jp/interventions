import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBmbL4AD_gzRrcdOLdg3fsamy6h4amh8KA',
      authDomain: 'interventions-35abb.firebaseapp.com',
      databaseURL: 'https://interventions-35abb.firebaseio.com',
      projectId: 'interventions-35abb',
      storageBucket: 'interventions-35abb.appspot.com',
      messagingSenderId: '661923155114',
      appId: '1:661923155114:web:daa2ffea8e932f5a7ed4d3',
      measurementId: 'G-GELWHK9XD3'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
