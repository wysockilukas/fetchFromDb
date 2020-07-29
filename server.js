const oracledb = require("oracledb");

try {
  oracledb.initOracleClient({ libDir: "D:\\instantclient_19_3" });
} catch (err) {
  console.error("Whoops!");
  console.error(err);
  process.exit(1);
}

// hr schema password
var password = "oracle";
// checkConnection asycn function
async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: password,
      connectString: "192.168.56.1:1521/orcl",
    });
    console.log("connected to database");
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();
