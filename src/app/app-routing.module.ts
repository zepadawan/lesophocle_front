import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AddCategorieComponent } from './components/administration/categories/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './components/administration/categories/edit-categorie/edit-categorie.component';
import { HomeComponent } from './components/gui/home/home.component';
import { NotFoundComponent } from './components/gui/not-found/not-found.component';
import { NousEcrireComponent } from './components/gui/nous-ecrire/nous-ecrire.component';
import { LaCarteComponent } from './components/restaurant/laCarte/la-carte.component';

import { LesBoissonsComponent } from './components/restaurant/lesBoissons/les-boissons.component';
import { LesDessertsComponent } from './components/restaurant/lesDesserts/les-desserts.component';
import { LesSoireesPriveesComponent } from './components/restaurant/lesSoireesPrivees/les-soirees-privees.component';
import { LesSoireesComponent } from './components/restaurant/lesConcerts/les-soirees.component';
import { AuthGuard } from './services/auth.guard.service';
import { AddPlatComponent } from './components/administration/plats/add-plat/add-plat.component';
import { EditPlatComponent } from './components/administration/plats/edit-plat/edit-plat.component';
import { AdminPlatComponent } from './components/administration/plats/admin-plat/admin-plat.component';
import { AdminCategorieComponent } from './components/administration/categories/admin-categorie/admin-categorie.component';
import { ShowPlatComponent } from './components/administration/plats/show-plat/show-plat.component';
import { ShowImageComponent } from './components/administration/show-image/show-image.component';
import { CarouselComponent } from './components/administration/carousel/carousel.component';

const routes: Routes = [

  { path: 'accueil', component: HomeComponent },
  { path: 'laCarte/:id', component: LaCarteComponent },
  { path: 'lesBoissons', component: LesBoissonsComponent },
  { path: 'lesDesserts', component: LesDessertsComponent },
  { path: 'concerts', component: LesSoireesComponent },
  { path: 'soirees', component: LesSoireesPriveesComponent },
  { path: 'nousEcrire', component: NousEcrireComponent, },
  { path: 'carousel', component: CarouselComponent },

  { path: 'connexion', component: LoginComponent },
  { path: 'administration', component: AdministrationComponent, },

  { path: 'admin-plat/:id', component: AdminPlatComponent, },
  { path: 'add-plat', component: AddPlatComponent, },
  { path: 'edit-plat/:id', component: EditPlatComponent, },
  { path: 'show-plat/:id', component: ShowPlatComponent, },
  { path: 'show-image/:id', component: ShowImageComponent, },

  { path: 'admin-categorie', component: AdminCategorieComponent, },
  { path: 'add-categorie', component: AddCategorieComponent, },
  { path: 'edit-categorie/:id', component: EditCategorieComponent, },

  { path: 'notFound', component: NotFoundComponent },

  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
