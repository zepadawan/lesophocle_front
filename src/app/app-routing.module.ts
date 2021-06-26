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
import { LocalizeComponent } from './components/gui/localize/localize.component';
import { MenuDuJourComponent } from './components/restaurant/menu-du-jour/menu-du-jour.component';
import { EditMenuComponent } from './components/administration/menujour/edit-menu/edit-menu.component';
import { PrintmenuComponent } from './components/administration/menujour/printmenu/printmenu.component';
import { AdminClientComponent } from './components/administration/clients/admin-client/admin-client.component';
import { AddClientComponent } from './components/administration/clients/add-client/add-client.component';
import { EditClientComponent } from './components/administration/clients/edit-client/edit-client.component';

const routes: Routes = [

  { path: 'accueil', component: HomeComponent },
  { path: 'laCarte/:id', component: LaCarteComponent },
  { path: 'laCarte', redirectTo: 'laCarte/1', pathMatch: 'full' },

  { path: 'lesBoissons', component: LesBoissonsComponent },

  // Evenements
  { path: 'concerts', component: LesSoireesComponent },
  { path: 'soirees', component: LesSoireesPriveesComponent },

  // administration
  { path: 'notFound', component: NotFoundComponent },
  { path: 'nousEcrire', component: NousEcrireComponent, },
  { path: 'localize', component: LocalizeComponent, },

  //divers
  { path: 'carousel', component: CarouselComponent },

  //connexion
  { path: 'connexion', component: LoginComponent },
  { path: 'administration', component: AdministrationComponent, },

  // Plats
  { path: 'admin-plat/:id', component: AdminPlatComponent, },
  { path: 'add-plat', component: AddPlatComponent, },
  { path: 'edit-plat/:id', component: EditPlatComponent, },
  { path: 'show-plat/:id', component: ShowPlatComponent, },
  { path: 'show-image/:id', component: ShowImageComponent, },

  // Menu du jour
  { path: 'menujour', component: MenuDuJourComponent },
  { path: 'edit-menu', component: EditMenuComponent },
  { path: 'printmenu', component: PrintmenuComponent },


  // Categories
  { path: 'admin-categorie', component: AdminCategorieComponent, },
  { path: 'add-categorie', component: AddCategorieComponent, },
  { path: 'edit-categorie/:id', component: EditCategorieComponent, },

  // Clients
  { path: 'admin-client', component: AdminClientComponent, },
  { path: 'add-client', component: AddClientComponent, },
  { path: 'edit-client/:id', component:  EditClientComponent, },


  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
