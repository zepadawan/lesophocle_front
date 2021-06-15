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
export class LesSoireesPriveesComponent implements OnInit {


  files: string[] = [];
  filesSubscription: Subscription;
  folder: string;
  apathImage = environment.api_image + 'concerts/'

  constructor(private filesDirectoryService: FilesDirectoryService) { }

  ngOnInit(): void {
    this.folder = 'soirees_privees'
    this.filesDirectoryService.getFiles(this.folder)
      .then((data: Result) => {
        this.files = data.args
      })
      .catch();
  }
}
