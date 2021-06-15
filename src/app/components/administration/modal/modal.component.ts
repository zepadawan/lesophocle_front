import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Allergene } from 'src/app/models/allergene';
import { Result } from 'src/app/models/result-modele';
import { AllergeneService } from 'src/app/services/allergene.service';

interface DialogData {
  email: string;
}

@Component({
  selector: 'node-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  allergenes: Allergene[];

  constructor(
    public allergeneService: AllergeneService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.allergeneService.getAllergenes()
      .then((result: Result) => {
        console.log(result.args);
        this.allergenes = result.args;
      }).catch((err) => {
      });
  }

}
