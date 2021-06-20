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


// Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

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
import { MessagesComponent } from './components/administration/messages/messages.component';
import { CarouselComponent } from './components/administration/carousel/carousel.component';
import { ModalComponent } from './components/administration/modal/modal.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
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
export function ConfigLoader(configService: ConfigService) {
  //Note: this factory need to return a function (that return a promise)
  return () => configService.onLoad(environment.configFile);
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
    ShowTexteComponent


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
    MatFormFieldModule,
    MatDialogModule,
    MatCarouselModule.forRoot(),
    GoogleMapsModule,
    MatGridListModule
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
    }

  ],
  bootstrap: [AppComponent]
})



export class AppModule { }