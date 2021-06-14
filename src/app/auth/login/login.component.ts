import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user-modele';
// import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'node-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  loginSubscription: Subscription;
  errorMessage: string;
  page = 'Connexion';
  currentpage = "Se logger";
  parentPage = "Admin";

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) { };

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin() {
    this.loginForm = this.fb.group({
      email: this.fb.control(' ', [Validators.email]),
      password: this.fb.control('password', [Validators.minLength(3)])
    });
  }

  onSubmit(): void {
    // recupération des champs du formulaire
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const newUser: User = { email: email, password: password };

    this.userService.authentifier(newUser)
      .then(
        (data) => {
          const carts = this.cartService.carts;
          // if (carts.length > 0) {
          if (carts) {
            this.router.navigate(['/checkout']);
          } else {
            this.router.navigate(['/accueil']);
            this.loginForm.reset();
          }
        }
      )
      .catch(
        (error) => {
          this.errorMessage = error;
          setTimeout(
            () => {
              this.errorMessage = null;
            }, 4000);
        }
      )
  };


}
