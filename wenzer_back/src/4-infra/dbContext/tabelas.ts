export class Tabelas {
    conexao: any = null;

    init(conexao: any) {
        this.conexao = conexao;

        this.criarUsuarios();
        this.criarEmailMarketing();
    }

    criarUsuarios() {
        const sql = `CREATE TABLE IF NOT EXISTS User (id varchar(255) NOT NULL,
            email varchar(255) NOT NULL, name varchar(255) NOT NULL, emailValid 
            tinyint(1), password varchar(255) NOT NULL, updated_at timestamp,
            created_at timestamp, PRIMARY KEY(id))`;

        this.conexao.query(sql, (err: any) => {
            if (err) {
                console.error(err);
            }
        });
    }

    criarEmailMarketing() {
        const sql = `CREATE TABLE IF NOT EXISTS EmailMarketing (id varchar(255) NOT NULL, 
            email varchar(255) NOT NULL, created_at timestamp, PRIMARY KEY(id))`

        this.conexao.query(sql, (err: any) => {
            if (err) {
                console.error(err);
            }
        });
    }
}