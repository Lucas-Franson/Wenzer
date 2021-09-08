module.exports = function GlobalErrorHandler(app) {
    app.use((err, req, res, next) => {
        let status = 500;
        
        const corpo = {
            mensagem: err.message
        };

        if (err.name === 'NotFound') {
            status = 404;
        }

        if (err.name === 'NotAuthorized') {
            status = 403;
        }

        if (err.name === 'JsonWebTokenError' || err.name === 'EmailNotValid' || err.name === 'AlreadyRegistered') {
            status = 400;
        }

        res.status(status).json(corpo);
    });
}