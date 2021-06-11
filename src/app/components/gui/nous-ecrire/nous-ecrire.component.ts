import { CompilerFacadeImpl } from '@angular/compiler/src/jit_compiler_facade';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nextTick } from 'process';
import { timeout } from 'rxjs/operators';
import { Email } from 'src/app/models/email.model';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'node-nous-ecrire',
  templateUrl: './nous-ecrire.component.html',
  styleUrls: ['./nous-ecrire.component.css']
})
export class NousEcrireComponent implements OnInit {

  emailForm: FormGroup;
  errorMessage;
  successMessage;

  constructor(private formBuilder: FormBuilder,
    private emailServices: EmailService,
    private router: Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.emailForm = this.formBuilder.group({
      nom: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      subject: this.formBuilder.control('', []),
      message: this.formBuilder.control('', [Validators.required])

    })
    this.emailForm.reset();

  }

  onSubmit(): void {
    var newEemail = new Email();
    newEemail.nom = this.emailForm.get('nom').value;
    newEemail.email = this.emailForm.get('email').value;
    newEemail.subject = this.emailForm.get('subject').value;
    newEemail.message = this.emailForm.get('message').value;

    this.emailServices.sendMessage(newEemail)
      .then(() => {
        console.log('mail send OK !');
        this.successMessage = 'Mail envoyé!';
        setTimeout(
          () => {
            this.successMessage = "";
            this.router.navigate(['/accueil']);
          }
          , 1000);

      })
      .catch();
  }

}

