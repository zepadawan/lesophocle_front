import { APP_INITIALIZER, NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/gui/home/home.component';
import { HeaderComponent } from './components/gui/header/header.component';
import { FooterComponent } from './components/gui/footer/footer.component';
import { LaCarteComponent } from './components/restaurant/laCarte/la-carte.component';
import { LesBoissonsComponent } from './components/restaurant/lesBoissons/les-boissons.component';
import { LesDessertsComponent } from './components/restaurant/lesDesserts/les-desserts.component';
import { NousEcrireComponent } from './components/gui/nous-ecrire/nous-ecrire.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { LesSoireesComponent } from './components/restaurant/lesConcerts/les-soirees.component';
import { LesSoireesPriveesComponent } from './components/restaurant/lesSoireesPrivees/les-soirees-privees.component';
import { NotFoundComponent } from './components/gui/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderAdminComponent } from './components/gui/header-admin/header-admin.component';


// Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule,  MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMAT } from './models/my-date-format';
import { MatDatepickerModule,  } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';



// Google MAT_DATE_FORMAT

// tinymce
import { EditorModule } from '@tinymce/tinymce-angular';

//RGPD
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';


import { EditCategorieComponent } from './components/administration/categories/edit-categorie/edit-categorie.component';
import { AddCategorieComponent } from './components/administration/categories/add-categorie/add-categorie.component';
import { LesFormaulesComponent } from './components/restaurant/lesMenus/les-formaules/les-formaules.component';
import { LesMenusComponent } from './components/restaurant/lesMenus/les-menus/les-menus.component';
import { LeMenuBrasserieComponent } from './components/restaurant/lesMenus/le-menu-brasserie/le-menu-brasserie.component';
import { LeMenuPizzaComponent } from './components/restaurant/lesMenus/le-menu-pizza/le-menu-pizza.component';
import { LeMenuEnfantComponent } from './components/restaurant/lesMenus/le-menu-enfant/le-menu-enfant.component';
import { LesDessertsEtFromagesComponent } from './components/restaurant/lesMenus/les-desserts-et-fromages/les-desserts-et-fromages.component';
import { EditPlatComponent } from './components/administration/plats/edit-plat/edit-plat.component';
import { AddPlatComponent } from './components/administration/plats/add-plat/add-plat.component';
import { AdminPlatComponent } from './components/administration/plats/admin-plat/admin-plat.component';
import { AdminCategorieComponent } from './components/administration/categories/admin-categorie/admin-categorie.component';
import { ShowPlatComponent } from './components/administration/plats/show-plat/show-plat.component';
import { ShowImageComponent } from './components/administration/show-image/show-image.component';
import { MessagesComponent } from './components/administration/messages/messages.component';
import { CarouselComponent } from './components/administration/carousel/carousel.component';
import { ModalComponent } from './components/administration/modal/modal.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { GoogleMapsModule } from '@angular/google-maps';
import { LocalizeComponent } from './components/gui/localize/localize.component';
import { ConfigComponent } from './components/administration/config/config.component';
import { ConfigService } from '../app/services/config.service';
import { MenuDuJourComponent } from './components/restaurant/menu-du-jour/menu-du-jour.component';

import { environment } from '../environments/environment';
import { AddMenuComponent } from './components/administration/menujour/add-menu/add-menu.component';
import { EditMenuComponent } from './components/administration/menujour/edit-menu/edit-menu.component';
import { AdminMenuComponent } from './components/administration/menujour/admin-menu/admin-menu.component';
import { AdminTexteComponent } from './components/administration/textes/admin-texte/admin-texte.component';
import { CreateTexteComponent } from './components/administration/textes/create-texte/create-texte.component';
import { EditTexteComponent } from './components/administration/textes/edit-texte/edit-texte.component';
import { ShowTexteComponent } from './components/administration/textes/show-texte/show-texte.component';
import { PrintmenuComponent } from './components/administration/menujour/printmenu/printmenu.component';
import { PrintplatComponent } from './components/administration/plats/printplat/printplat.component';
import { AddConcertComponent } from './components/administration/concerts/add-concert/add-concert.component';
import { AdminConcertComponent } from './components/administration/concerts/admin-concert/admin-concert.component';
import { EditConcertComponent } from './components/administration/concerts/edit-concert/edit-concert.component';
import { InscriptionConcertComponent } from './components/administration/concerts/inscription-concert/inscription-concert.component';
import { AddPrivatisationComponent } from './components/administration/privatisation/add-privatisation/add-privatisation.component';
import { AdminPrivatisationComponent } from './components/administration/privatisation/admin-privatisation/admin-privatisation.component';
import { EditPrivatisationComponent } from './components/administration/privatisation/edit-privatisation/edit-privatisation.component';
import { InscriptionPrivatisationComponent } from './components/administration/privatisation/inscription-privatisation/inscription-privatisation.component';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { AddClientComponent } from './components/administration/clients/add-client/add-client.component';
import { AdminClientComponent } from './components/administration/clients/admin-client/admin-client.component';
import { EditClientComponent } from './components/administration/clients/edit-client/edit-client.component';
import { CustomClientComponent } from './components/administration/clients/custom-client/custom-client.component';
import { CustomConcertComponent } from './components/administration/concerts/custom-concert/custom-concert.component';


export function ConfigLoader(configService: ConfigService) {
  //Note: this factory need to return a function (that return a promise)
  return () => configService.onLoad(environment.configFile);
}

// rgpd
const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    // domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
    domain: 'https://lesophocle.com' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  position:"bottom-left",
  palette: {
    popup: {
      "background": "#000000",
      "text": "#ffffff",
      "link": "#ffffff"
    },
    button: {
      "background": "#f1d600",
      "text": "#000000",
      "border": "transparent"
    }
  },
  theme: 'edgeless',
  type: 'info',
  layout: 'my-custom-layout',
  layouts: {
    "my-custom-layout": '{{messagelink}}{{compliance}}'
  },
  // elements:{
  //   messagelink: `
  //   <span id="cookieconsent:desc" class="cc-message">{{message}}
  //     <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank">{{cookiePolicyLink}}</a>,
  //     <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a> and our
  //     <a aria-label="learn more about our terms of service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank">{{tosLink}}</a>
  //   </span>
  //   `,
  // },
  content:{
    // "message" : 'En utilisant notre site, vous reconnaissez avoir lu et compris nos  ',
    "message": "Ce site web utilise des cookies pour vous assurer la meilleure expérience de navigation sur notre site.",
    "dismiss": "OK, j'ai compris!",
    "deny": "Refuser",
    "link": "Plus d'information",
    "href": "https://cookiesandyou.com",
    "policy": "Cookie Policy",
    "header": "Cookies sur le site!",
    "allow": "Autoriser les cookies",

    cookiePolicyLink: 'Cookie Policy',
    cookiePolicyHref: 'https://cookie.com',

    privacyPolicyLink: 'Privacy Policy',
    privacyPolicyHref: 'https://privacy.com',

    tosLink: 'Terms of Service',
    tosHref: 'https://tos.com',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LaCarteComponent,
    EditPlatComponent,
    AddPlatComponent,

    LesBoissonsComponent,
    LesDessertsComponent,
    NousEcrireComponent,
    AdministrationComponent,
    LesSoireesComponent,
    LesSoireesPriveesComponent,

    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HeaderAdminComponent,
    EditCategorieComponent,
    AddCategorieComponent,
    LesFormaulesComponent,
    LesMenusComponent,
    LeMenuBrasserieComponent,
    LeMenuPizzaComponent,
    LeMenuEnfantComponent,
    LesDessertsEtFromagesComponent,
    AdminPlatComponent,
    AdminCategorieComponent,
    ShowPlatComponent,
    ShowImageComponent,
    MessagesComponent,
    CarouselComponent,
    ModalComponent,
    LocalizeComponent,
    ConfigComponent,
    MenuDuJourComponent,
    AddMenuComponent,
    EditMenuComponent,
    AdminMenuComponent,

    AdminTexteComponent,
    CreateTexteComponent,
    EditTexteComponent,
    ShowTexteComponent,
    PrintmenuComponent,
    PrintplatComponent,
    AddConcertComponent,
    AdminConcertComponent,
    EditConcertComponent,
    InscriptionConcertComponent,
    AddPrivatisationComponent,
    AdminPrivatisationComponent,
    EditPrivatisationComponent,
    InscriptionPrivatisationComponent,
    AddClientComponent,
    AdminClientComponent,
    EditClientComponent,
    CustomClientComponent,
    CustomConcertComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCarouselModule.forRoot(),
    GoogleMapsModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MomentDateModule,
    NgcCookieConsentModule.forRoot(cookieConfig),

  ],
  entryComponents: [
    MessagesComponent,
    ModalComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
    {
       provide : MAT_DATE_FORMATS, useValue : MY_DATE_FORMAT
    }

  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
