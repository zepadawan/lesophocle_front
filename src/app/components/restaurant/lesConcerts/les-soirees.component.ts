import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Result } from 'src/app/models/result-modele';
import { FilesDirectoryService } from 'src/app/services/files-directory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-les-soirees',
  templateUrl: './les-soirees.component.html',
  styleUrls: ['./les-soirees.component.css']
})

export class LesSoireesComponent {

  folder: string;
  constructor() {
    this.folder = 'concerts';
  }

}
