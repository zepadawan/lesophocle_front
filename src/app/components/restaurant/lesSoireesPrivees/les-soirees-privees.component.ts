import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Result } from 'src/app/models/result-modele';
import { FilesDirectoryService } from 'src/app/services/files-directory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-les-soirees-privees',
  templateUrl: './les-soirees-privees.component.html',
  styleUrls: ['./les-soirees-privees.component.css']
})
// soirees_privees
export class LesSoireesPriveesComponent {

  folder: string;

  constructor() {
    this.folder = 'soirees_privees';
  }
}
