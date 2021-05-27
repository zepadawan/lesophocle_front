import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart-modele';
import { Categorie } from 'src/app/models/categorie-modele';
import { User } from 'src/app/models/user-modele';
import { CartService } from 'src/app/services/cart.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  carts: Cart[] = [];
  cartData: any;
  categories: Categorie[];
  categorySubcription: Subscription;
  cartSubsription: Subscription;
  userSubsription: Subscription;
  refApiImages = environment.api_image;


  @Input() isAuth = false;
  @Input() user: User;
  @Input() isAdmin = false;
  @Input() isSuperArmin = false;



  constructor(private cartService: CartService,
    private userService: UserService,
    private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.carts = this.cartService.carts;
    this.categories = this.categorieService.categories;

    this.isAuth = this.userService.isAuth;
    this.user = this.userService.user;
    if (this.user) {
      this.isAdmin = ((this.user?.role == 'admin') || (this.user?.role == 'superadmin')) ? true : false;
      this.isSuperArmin = ((this.user?.role == 'superadmin')) ? true : false;
    }
  }

  ngOnDestroy(): void {
  }

  getTexte(id: number): string {
    return "";
  }
  onLogOut() {
    this.userService.logOut();
    this.isAuth = this.userService.isAuth;
  }
}
