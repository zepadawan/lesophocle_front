import { APP_INITIALIZER, NgModule } from '@angular/core';
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

// Google
// tinymce
import { EditorModule } from '@tinymce/tinymce-angular';

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
import { AppConfiguration } from './services/configuration-helper';
// import { GoogleMapsModule } from '@angular/google-maps';
// import { LocalizeComponent } from './components/gui/localize/localize.component'

export function AppConfigurationFactory(
  appConfig: AppConfiguration) {
  return () => appConfig.ensureInit();
}



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
    // LocalizeComponent,



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
    // GoogleMapsModule


  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigurationFactory,
      deps: [AppConfiguration, HttpClient], multi: true
    },
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }