export class UserAccount {
  // tslint:disable-next-line:variable-name
    user_id: number;
    username: string;
    email: string;
    password: string;
    token: string;
    firstname: string;
    lastname: string;

    constructor(username: string, password: string, email?: string) {
        this.username = username;
        this.password = password;
        this.email = email || '';
    }


}
