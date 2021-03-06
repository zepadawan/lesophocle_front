import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuJour } from 'src/app/models/menujour';
import { Result } from 'src/app/models/result-modele';
import { MenujourService } from 'src/app/services/menujour.service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'node-menu-du-jour',
  templateUrl: './menu-du-jour.component.html',
  styleUrls: ['./menu-du-jour.component.css']
})
export class MenuDuJourComponent implements OnChanges, OnInit, OnDestroy {

  menuJour: MenuJour;
  menuJourSubscription: Subscription;
  isAdmin: boolean;

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private menujourService: MenujourService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
    this.menujourService.getMenuJour()
      .then(
        (data: Result) => {
          console.log('data', data);
          this.menuJour = data.args;
        })
      .catch(
        (err) => {
          console.log('err', err);
        }
      );
  }

  ngOnDestroy(): void {

  }

  ngOnChanges() {

  }

  downloadAsPDF() {

    const doc = new jsPDF();
    const pdfTable = this.htmlData.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
}
