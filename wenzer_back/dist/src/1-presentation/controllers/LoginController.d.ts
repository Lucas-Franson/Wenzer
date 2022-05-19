export default class LoginController {
    login(req: any, res: any, next: any): Promise<void>;
    logout(req: any, res: any, next: any): Promise<void>;
    register(req: any, res: any, next: any): Promise<any>;
    recoverPassword(req: any, res: any, next: any): Promise<void>;
    verifyEmail(req: any, res: any, next: any): Promise<any>;
    alterPassword(req: any, res: any, next: any): Promise<any>;
    emailMarketing(req: any, res: any, next: any): Promise<any>;
    confirmarEmailMarketing(req: any, res: any, next: any): Promise<any>;
    getUsersActive(req: any, res: any, next: any): Promise<any>;
}
