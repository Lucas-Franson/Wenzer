import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from '../entities/Usuario';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {}