module Database

open Npgsql.FSharp

let postgresPassword = "zNXDVESKIAv!!"

let defaultConnection = 
  Sql.host "cerberus"
  |> Sql.port 5432
  |> Sql.username "postgres"
  |> Sql.password postgresPassword
  |> Sql.database "postgres"
  |> Sql.sslMode SslMode.Prefer
  |> Sql.config "Pooling=true"

type Row = {
  year : int
  text : string
  file_name : string option
  title : string option
  category : string option
  original : byte[] option
}


// let testRows() =
//   defaultConnection
//   |> Sql.connectFromConfig
//   |> Sql.query "select id, year, text, title from inquiries"
//   |> Sql.execute (fun read -> { 
//     year = read.int "year"
//     text = read.string "text"
//     title = read.stringOrNone "title"
//   })




