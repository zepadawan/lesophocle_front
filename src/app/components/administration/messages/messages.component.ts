import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'node-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MessagesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular for beginner',
    }
    //this.dialog.open(MessagesComponent, dialogConfig);

    this.dialogRef = this.dialog.open(MessagesComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(

    )

  }
  public close() {
    this.dialogRef.close();

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }

}
