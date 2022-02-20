
export default function GlobalErrorHandler(app: any) {
    app.use((err: any, req: any, res: any, next: any) => {
        let status = 500;
        
        const corpo = {
            mensagem: err.message
        };

        if (err.name === 'NaoEncontrado') {
            status = 404;
        }

        if (err.name === 'NaoAutorizado') {
            status = 403;
        }

        if (err.name === 'JsonWebTokenError' || err.name === 'ValideSeuEmail' || err.name === 'UsuarioJaCadastrado') {
            status = 400;
        }
        
        res.status(status).json(corpo);
    });
}