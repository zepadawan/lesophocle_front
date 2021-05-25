import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './components/administration/administration.component';
import { HomeComponent } from './components/gui/home/home.component';
import { LocaliserComponent } from './components/gui/localiser/localiser.component';
import { NousEcrireComponent } from './components/gui/nous-ecrire/nous-ecrire.component';
import { ClickAndCollectComponent } from './components/restaurant/click-and-collect/click-and-collect.component';
import { LaCarteComponent } from './components/restaurant/la-carte/la-carte.component';
import { LeMenuComponent } from './components/restaurant/le-menu/le-menu.component';
import { LesBoissonsComponent } from './components/restaurant/les-boissons/les-boissons.component';
import { LesDessertsComponent } from './components/restaurant/les-desserts/les-desserts.component';
import { LesSoireesPriveesComponent } from './components/restaurant/les-soirees-privees/les-soirees-privees.component';
import { LesSoireesComponent } from './components/restaurant/les-soirees/les-soirees.component';

const routes: Routes = [

  { path: 'Accueil', component: HomeComponent },
  { path: 'laCarte', component: LaCarteComponent },
  { path: 'lesMenus', component: LeMenuComponent },
  { path: 'lesBoissons', component: LesBoissonsComponent },
  { path: 'lesDesserts', component: LesDessertsComponent },
  { path: 'lesSoirees', component: LesSoireesComponent },
  { path: 'lesPrivees', component: LesSoireesPriveesComponent },
  { path: 'click&collect', component: ClickAndCollectComponent },
  { path: 'nousEcrire', component: NousEcrireComponent },
  { path: 'localiser', component: LocaliserComponent },
  { path: 'administration', component: AdministrationComponent },



  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
