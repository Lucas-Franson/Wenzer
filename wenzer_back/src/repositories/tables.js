class Tables {
    init(connection) {
        this.connection = connection;

        this.createUsers();
        this.createEmailMarketing();
    }

    createUsers() {
        const sql = `CREATE TABLE IF NOT EXISTS User (id varchar(255) NOT NULL,
            email varchar(255) NOT NULL, name varchar(255) NOT NULL, emailValid 
            tinyint(1), password varchar(255) NOT NULL, updated_at timestamp,
            created_at timestamp, PRIMARY KEY(id))`;

        this.connection.query(sql, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }

    createEmailMarketing() {
        const sql = `CREATE TABLE IF NOT EXISTS EmailMarketing (id varchar(255) NOT NULL, 
            email varchar(255) NOT NULL, created_at timestamp, PRIMARY KEY(id))`

        this.connection.query(sql, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
}

module.exports = new Tables;