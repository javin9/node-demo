(async () => {
  const mysql = require('mysql2/promise')
  const config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'krup'
  }

  const connection = await mysql.createConnection(config)

  /**
   * // 查询 conn.query()
  // 创建表
  const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
                      id INT NOT NULL AUTO_INCREMENT,
                      message VARCHAR(45) NULL,
                      PRIMARY KEY (id))`;
      const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
      const SELECT_SQL = `SELECT * FROM test`;
   */
  const CREATE_SQL = `
 create table if not exists tua(
   id int not null auto_increment,
   message varchar(45) null,
  primary key(id)
 )
`;
  const INSERT_SQL = `
insert into tua(message) values(?);
`
  const SELECT_SQL = `select * from tua;`;

  // connection.connection.execute
  const r1 = await connection.execute(CREATE_SQL)
  const r2 = await connection.execute(INSERT_SQL, ['hello body'])
  // console.log(r2);
  const [row, fields] = await connection.execute(SELECT_SQL)
  console.log(JSON.stringify(row, '', '\t'));


})()