import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

// Google
import { GoogleMapsModule } from '@angular/google-maps';
// tinymce
import { EditorModule } from '@tinymce/tinymce-angular';
import { EditPlatComponent } from './components/administration/plats/edit-plat/edit-plat.component';
import { EditCategorieComponent } from './components/administration/categories/edit-categorie/edit-categorie.component';
import { AddCategorieComponent } from './components/administration/categories/add-categorie/add-categorie.component';
import { AddPlatComponent } from './components/administration/plats/add-plat/add-plat.component';
import { environment } from 'src/environments/environment';
import { AppConfiguration } from './services/config-helper.service';
import { LesFormaulesComponent } from './components/restaurant/lesMenus/les-formaules/les-formaules.component';
import { LesMenusComponent } from './components/restaurant/lesMenus/les-menus/les-menus.component';
import { LeMenuBrasserieComponent } from './components/restaurant/lesMenus/le-menu-brasserie/le-menu-brasserie.component';
import { LeMenuPizzaComponent } from './components/restaurant/lesMenus/le-menu-pizza/le-menu-pizza.component';
import { LeMenuEnfantComponent } from './components/restaurant/lesMenus/le-menu-enfant/le-menu-enfant.component';
import { LesDessertsEtFromagesComponent } from './components/restaurant/lesMenus/les-desserts-et-fromages/les-desserts-et-fromages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Déclaration de la fonction d'initialisation de la configuration
// export function initConfig(configService: ConfigHelperService) {
//   return () => configService.load(environment, 'assets/config.json');
// }


export function AppConfigurationFactory(
  appConfig: AppConfiguration) {
  return () => appConfig.ensureInit()
    .then((data) =>
      console.log(data)
    )
    .catch();
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LaCarteComponent,
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
    AddPlatComponent,
    EditPlatComponent,
    EditCategorieComponent,
    AddCategorieComponent,
    LesFormaulesComponent,
    LesMenusComponent,
    LeMenuBrasserieComponent,
    LeMenuPizzaComponent,
    LeMenuEnfantComponent,
    LesDessertsEtFromagesComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    NgbModule,

  ],
  providers: [
    AppConfiguration,

    // { provide: APP_INITIALIZER, useFactory: AppConfigurationFactory, deps: [AppConfiguration, HttpClient], multi: true },
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }