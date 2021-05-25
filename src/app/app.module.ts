import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/gui/home/home.component';
import { HeaderComponent } from './components/gui/header/header.component';
import { FooterComponent } from './components/gui/footer/footer.component';
import { LaCarteComponent } from './components/restaurant/la-carte/la-carte.component';
import { LeMenuComponent } from './components/restaurant/le-menu/le-menu.component';
import { LesBoissonsComponent } from './components/restaurant/les-boissons/les-boissons.component';
import { LesDessertsComponent } from './components/restaurant/les-desserts/les-desserts.component';
import { LocaliserComponent } from './components/gui/localiser/localiser.component';
import { NousEcrireComponent } from './components/gui/nous-ecrire/nous-ecrire.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { LesSoireesComponent } from './components/restaurant/les-soirees/les-soirees.component';
import { LesSoireesPriveesComponent } from './components/restaurant/les-soirees-privees/les-soirees-privees.component';
import { ClickAndCollectComponent } from './components/restaurant/click-and-collect/click-and-collect.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LaCarteComponent,
    LeMenuComponent,
    LesBoissonsComponent,
    LesDessertsComponent,
    LocaliserComponent,
    NousEcrireComponent,
    AdministrationComponent,
    LesSoireesComponent,
    LesSoireesPriveesComponent,
    ClickAndCollectComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
