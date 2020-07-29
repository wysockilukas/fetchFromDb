const oracledb = require('oracledb');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

try {
  oracledb.initOracleClient({ libDir: 'D:\\instantclient_19_3' });
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

// checkConnection asycn function

const checkConnection = async () => {
  try {
    connection = await oracledb.getConnection({
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      connectString: process.env.DATABASE_CONN_STRING,
    });
    console.log('connected to database');
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        const result1 = await connection.execute(`SELECT * FROM employees where EMPLOYEE_ID = 101`);
        console.log(result1);
        const result2 = await connection.execute(
          `SELECT department_id, department_name
           FROM departments
           WHERE manager_id < :id`,
          [110], // bind value for :id
          { extendedMetaData: true }
        );
        console.log(result2);
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};

checkConnection();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Serwer pracuje na porcie ', port);
});

// to przechwytuje wszsytkie nie obsluzone promises
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
