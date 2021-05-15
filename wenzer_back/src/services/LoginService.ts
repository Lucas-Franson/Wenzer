import { getCustomRepository, Repository } from 'typeorm';
import { Usuario } from '../entities/Usuario';
import { NaoEncontrado, UsuarioJaCadastrado } from '../erros';
import { ILogin, ILoginCadastro } from '../interfaces/ILogin';
import { UsuarioRepository } from '../repositories/UsuarioRepository';

class LoginService {
    private userRepository: Repository<Usuario>;

    constructor() {
        this.userRepository = getCustomRepository(UsuarioRepository);
    }

    async cadastrar({ nome, email, senha }: ILoginCadastro) {
        const userExists = await this.userRepository.findOne({
            email
        });

        if (userExists) {
            throw new UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
        }

        const senhaHash = await Usuario.gerarSenhaHash(senha);
        
        const user = this.userRepository.create({
            nome, email, emailValidado: false, senha: senhaHash
        });
        await this.userRepository.save(user);

        return user.id;
    }

    async verificarUsuario({ email, senha }: ILogin) {
        const senhaHash = await Usuario.gerarSenhaHash(senha);
        console.log(senhaHash);
        const userOne = await this.userRepository.findOne({
            email, senha: senhaHash
        });
        
        if (!userOne) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }
        
        return userOne;
    }
}
// $2b$12$m/1E9yQutdogIKHKEe.zTuy16fKSqMTc7TQ5zUeaveqMw8sGxADeu
// $2b$12$U6UxQsPmI5s3.nQfYHnKNej6q9j1v8HEi0UcnjeqR07fWK/XGDgaK	
export { LoginService };