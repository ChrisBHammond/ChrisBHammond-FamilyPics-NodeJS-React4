// API Setup
import mysql from "mysql2"

// read custom .env file
require("dotenv").config()

let pool: mysql.Pool

// const typeCastFn = (field: any, next: any) => {
//   if (field.type === "DECIMAL" || field.type === "INT" || field.type === "NEWDECIMAL") {
//     return parseInt(field.string(), 10)
//   } else if (field.type === "FLOAT") {
//     return parseFloat(field.string())
//   }
//   return next()
// }

console.log("ENV: " + process.env.NODE_ENV)

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "testing" || process.env.NODE_ENV === "qbseed") {
  pool = mysql.createPool({
    user: "familypics",
    password: "familypics",
    database: "familypics",
    host: "localhost",
    //typeCast: typeCastFn,
  })
} else if (process.env.NODE_ENV === "development-cloud" || process.env.NODE_ENV === "qbseed-prod") {
  pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_IP,
    port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : "", 10),
    //typeCast: typeCastFn,
  })
} else {
  pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    //typeCast: typeCastFn,
  })
}

console.log("init dbconnection")

type Field = import("mysql2").FieldPacket
type Row = import("mysql2").RowDataPacket
type Ok = import("mysql2").OkPacket
type dbDefaults = Row[] | Row[][] | Ok[] | Ok
type dbQuery<T> = T & dbDefaults

export const db = {
  query: async <T>(query: string, params?: Array<any>): Promise<[T, Field[]]> => {
    return pool.promise().query<dbQuery<T>>(query, params)
  },
  pool: pool.promise(),
}

export default pool // TODO: remove. Only using for remaining .js files...
