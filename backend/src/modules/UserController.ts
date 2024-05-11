export default class UserController {
  name: string;
    mobile: number;
    nic: string;
    userName: string;
    password: string;
    role: string;

    constructor(name: string, mobile: number, nic: string, userName: string, password: string, role: string) {
        this.name = name;
        this.mobile = mobile;
        this.nic = nic;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }   
    getUser(email: string) {
        return {
            name: "John Smith",
            email,
            role: "admin",
        };
    }
}
      