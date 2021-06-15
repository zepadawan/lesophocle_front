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

export class LesSoireesComponent implements OnInit {

  files: string[] = [];
  filesSubscription: Subscription;
  folder: string;
  apathImage = environment.api_image + 'concerts/'

  constructor(private filesDirectoryService: FilesDirectoryService) { }

  ngOnInit(): void {
    this.folder = 'concerts'
    this.filesDirectoryService.getFiles(this.folder)
      .then((data: Result) => {
        this.files = data.args
      })
      .catch();
  }


}
