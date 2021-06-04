import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AddCategorieComponent } from './components/administration/categories/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './components/administration/categories/edit-categorie/edit-categorie.component';
import { AddPlatComponent } from './components/administration/plats/add-plat/add-plat.component';
import { EditPlatComponent } from './components/administration/plats/edit-plat/edit-plat.component';
import { HomeComponent } from './components/gui/home/home.component';
import { NotFoundComponent } from './components/gui/not-found/not-found.component';
import { NousEcrireComponent } from './components/gui/nous-ecrire/nous-ecrire.component';
import { LaCarteComponent } from './components/restaurant/laCarte/la-carte.component';

import { LesBoissonsComponent } from './components/restaurant/lesBoissons/les-boissons.component';
import { LesDessertsComponent } from './components/restaurant/lesDesserts/les-desserts.component';
import { LesSoireesPriveesComponent } from './components/restaurant/lesSoireesPrivees/les-soirees-privees.component';
import { LesSoireesComponent } from './components/restaurant/lesConcerts/les-soirees.component';
import { AuthGuard } from './services/auth.guard.service';
import { CarouselComponent } from './components/gui/carousel/carousel.component';

const routes: Routes = [

  { path: 'accueil', component: HomeComponent },
  { path: 'laCarte/:id', component: LaCarteComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'lesBoissons', component: LesBoissonsComponent },
  { path: 'lesDesserts', component: LesDessertsComponent },
  { path: 'lesSoirees', component: LesSoireesComponent },
  { path: 'lesPrivees', component: LesSoireesPriveesComponent },
  { path: 'nousEcrire', component: NousEcrireComponent, canActivate: [AuthGuard] },
  { path: 'connexion', component: LoginComponent },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard] },
  { path: 'add-plat', component: AddPlatComponent, },
  { path: 'edit-plat/:id', component: EditPlatComponent, canActivate: [AuthGuard] },
  { path: 'add-categorie', component: AddCategorieComponent, canActivate: [AuthGuard] },
  { path: 'edit-categorie/:id', component: EditCategorieComponent, canActivate: [AuthGuard] },

  { path: 'notFound', component: NotFoundComponent },

  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
