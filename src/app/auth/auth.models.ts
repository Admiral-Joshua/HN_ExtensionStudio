export class UserAccount {
    userId: number
    username: string
    email: string
    password: string
    token: string

    constructor(username: string, password: string, email?: string) {
        this.username = username;
        this.password = password;
        this.email = email || '';
    }


}