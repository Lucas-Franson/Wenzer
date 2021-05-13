import { getCustomRepository, Repository } from 'typeorm';
import { Usuario } from '../entities/Usuario';
import { UsuarioJaCadastrado } from '../erros';
import { ILoginCadastro } from '../interfaces/ILogin';
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
}

export { LoginService };