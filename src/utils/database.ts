import { Pool } from "oracledb";




let conn: any;

if (!conn) {
  conn =  
  
  new Pool({
    user: "acessoweb",
    password: "ar24btus",
    host: "10.18.1.89",
    port: 1522,
    database: "acessoweb",
  });
}
 

export { conn };
