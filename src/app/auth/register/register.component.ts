import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { UserAccount } from '../auth.models';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const passwordMatch: ValidatorFn = (fg: FormGroup) => {
    const pword = fg.get('password').value;
    const pconf = fg.get('passConfirm').value;
    return pword !== null && pconf !== null && pword === pconf
        ? null
        : { passwordMatch: true };
};

@Component({
    templateUrl: "register.component.html"
})
export class RegisterComponent {

    errMsg: string = ""

    registerForm = new FormGroup({
        username: new FormControl('', [Validators.minLength(5), Validators.required]),
        password: new FormControl('', Validators.required),
        passConfirm: new FormControl('', Validators.required),
        email: new FormControl('', Validators.pattern(/[A-z]{4,}\@[A-z]{4,}(?:\.com|\.co\.uk|\.org|\.de)/))
    }, { validators: passwordMatch })

    constructor(private service: AuthService, private snackbar: MatSnackBar, private router: Router) { }

    register() {
        // Double-check form is valid.
        if (this.registerForm.valid) {
            let user = new UserAccount(this.registerForm.get('username').value, this.registerForm.get('password').value, this.registerForm.get('email').value);

            this.service.register(user).subscribe(res => {
                this.snackbar.open('Account Created Successfully!', '', {
                    duration: 1200
                }).afterDismissed().subscribe(() => {
                    this.router.navigate(['/login']);
                });
            });
        } else {
            if (this.registerForm.get('username').invalid) {
                this.errMsg = "Username must be at least 5 characters";
            } else if (this.registerForm.get('password').invalid) {
                this.errMsg = "Password is a required field.";
            } else if (this.registerForm.get('passConfirm').invalid) {
                this.errMsg = "Confirmation password did not match password field.";
            } else {
                this.errMsg = "Email address is invalid.";
            }
        }
    }

}