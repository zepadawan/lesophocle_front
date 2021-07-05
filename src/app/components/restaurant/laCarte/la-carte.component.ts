import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

import { Observable, Subscription } from 'rxjs';
import { Categorie } from 'src/app/models/categorie-modele';
import { Plat } from 'src/app/models/plat-modele';
import { User } from 'src/app/models/user-modele';
import { CategorieService } from 'src/app/services/categorie.service';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ModalComponent } from '../../administration/modal/modal.component';


// let aHTMLOptions: jspdf.HTMLOptions;

@Component({
  selector: 'node-la-carte',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './la-carte.component.html',
  styleUrls: ['./la-carte.component.css']
})
export class LaCarteComponent implements OnChanges, OnInit, OnDestroy {

  plats: Plat[] = [];
  platSubscription: Subscription;
  filtre: any;

  idCategorie: number;
  isCaroussel: boolean = true;

  platType: string;


  user: User;
  isAdmin = false;
  urlImage: string;

  _pathImage: string;
  @Input()
  set pathImage(value: string) {
    this._pathImage = value;
  }
  get(): string {
    return this._pathImage;
  }

  isPrintable: boolean;

  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private platService: PlatService,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService,
    private dialog: MatDialog,
    private userService: UserService) {

    this.urlImage = `${environment.api_image}`;
    this.isPrintable = false;
  };

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
    this.urlImage = `${environment.api_image}`;
    this.route.params.subscribe(
      (request) => {
        this.categorieService.getCategorieNameById(+request.id)
          .then((data) => {
            this.decryptCategorie(data);
          })
          .catch();
        this.platSubscription = this.platService.platSubject.subscribe(
          (data: Plat[]) => {
            const tabs = data.filter(plat => {
              return plat.id_categorie == +request.id;
            });
            this.plats = tabs.sort((a, b) => a.ordre - b.ordre);
          }
        );
        this.platService.emitPlats();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes)', changes);
  }

  decryptCategorie(categ: Categorie) {
    this.platType = categ.libelle;
    this._pathImage = categ.pathImage;
  }

  ngOnDestroy() {
    this.platSubscription.unsubscribe();
  }

  editAllergenes() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      height: '500px',
      backdropClass: 'backdropBackground', // This is the "wanted" line
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  downloadAsPDF() {

    this.isPrintable = true;
    setTimeout(() => {

    }, 1000);
    const htmlData = document.getElementById("htmlData");


    //   html2canvas(this.data, { allowTaint: true }).then(canvas => {
    //     let HTML_Width = canvas.width;
    //     let HTML_Height = canvas.height;
    //     let top_left_margin = 100;
    //     let PDF_Width = HTML_Width + (top_left_margin * 2);
    //     let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    //     let canvas_image_width = HTML_Width;
    //     let canvas_image_height = HTML_Height;
    //     let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    //     canvas.getContext('2d');
    //     let imgData = canvas.toDataURL("image/png", 1.0);
    //     const contentDataURL = canvas.toDataURL('image/png')
    //     let pdf = new jspdf.jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
    //     pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
    //     // pdf.addImage(imgData, 'PNG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
    //     for (let i = 1; i <= totalPDFPages; i++) {
    //       pdf.addPage([PDF_Width, PDF_Height], 'p');
    //       pdf.addImage(imgData, 'PNG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
    //     }
    //     pdf.save("carte.pdf");
    //   });

    // }



    const doc = new jsPDF();
    const pdfTable = this.htmlData.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    this.isPrintable = false;
  }

}

