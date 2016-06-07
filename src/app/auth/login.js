import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export class Login {
    heading = 'Login';
    email = '';
    password = '';
    loginError = '';

    constructor(auth) {
        this.auth = auth;
    };

    login() {
        let authObject = {
            username: this.username,
            password: this.password
        };
        
        return this.auth.login(authObject)
        .then(response => {
            console.log(`Login response: ${response}`);
        })
        .catch(error => {
            this.loginError = error.response;
        });
    };
}