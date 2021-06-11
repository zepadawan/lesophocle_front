import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Result } from 'src/app/models/result-modele';
import { FilesDirectoryService } from 'src/app/services/files-directory.service';

@Component({
  selector: 'node-les-soirees',
  templateUrl: './les-soirees.component.html',
  styleUrls: ['./les-soirees.component.css']
})

export class LesSoireesComponent implements OnInit {

  files: string[] = [];
  filesSubscription: Subscription;
  @Input() folder: string;

  constructor(private filesDirectoryService: FilesDirectoryService) { }

  ngOnInit(): void {
    this.filesDirectoryService.getFiles(this.folder)
      .then((data: Result) => {
        this.files = data.args;
      })
      .catch();
  }


}
