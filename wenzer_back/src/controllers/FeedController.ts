

module.exports = class FeedController {

    async buscar(req: any, res: any, next: any) {
        const { email, password } = req.body;
        const loginService = new LoginService();
        
        try {
            const accessToken = await loginService.verifyUsuario({ email, password });

            res.status(200).json({ token: accessToken });
        } catch(err) {
            next(err);
        }
    }

}