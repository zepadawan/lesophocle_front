import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plat } from 'src/app/models/plat-modele';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'node-les-viandes',
  templateUrl: './les-viandes.component.html',
  styleUrls: ['./les-viandes.component.css']
})
export class LesViandesComponent implements OnInit, OnDestroy {

  plats: Plat[] = [];
  platSubscription: Subscription;

  isAdmin = true;
  // isAdmin = false;

  constructor(private platService: PlatService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (request) => {
        this.platSubscription = this.platService.platSubject.subscribe(
          (data: Plat[]) => {
            const tabs = data.filter(plat => {
              return plat.id_categorie == 1;
            });
            this.plats = tabs.sort((a, b) => a.ordre - b.ordre);
          }
        );
        this.platService.emitPlats();
      }
    );
  }

  ngOnDestroy() {
    this.platSubscription.unsubscribe();
  }

}
