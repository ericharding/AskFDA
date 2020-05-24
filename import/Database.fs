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
  file_name : string
  title : string option
  category : string option
  original : byte[]
}

let insert row =
  defaultConnection
  |> Sql.connectFromConfig
  |> Sql.query """INSERT INTO public.inquiries(
	year, text, file_name, title, category, original)
	VALUES (@year, @text, @file_name, @title, @category, @original);"""
  |> Sql.parameters [
    "@year", Sql.int row.year
    "@text", Sql.text row.text
    "@file_name", Sql.text row.file_name
    "@title", Sql.textOrNone row.title
    "@category", Sql.textOrNone row.category
    "@original", Sql.bytea row.original
  ]
  |> Sql.executeNonQuery

let row = {
  year = 1999
  text = """ I was dreaming when I wrote this, forgive me if it goes astray
When I woke up this morning, got up this morning was judgement day
Sky was all purple there was people running everywhere
Try to run from my destruction, you know I didn't even care
Say, say 2 thousand zero zero party over it's out of time
So tonight I'm gonna party like its 1999
I was dreaming when I wrote this, so sue me if I go too fast
Well life is just a party and partys aren't meant to last
Worries all around us, my mind says prepare to bite
So if I'm gonna die gonna listen to my body tonight
Yeah
They say 2 thousand zero zero party over it's out of time
So tonight I'm gonna party like its 1999
Yeah
(Let me tell you somethin')
If you didn't come to party, don't bother knocking on my door
I got a lion in my pocket, and baby he's a ready to roar
If the world's got a bomb we can all hide here today
Ow
But before I let that happen, I'll dance my life away
They say 2 thousand zero zero party over it's out of time
So tonight I'm gonna party like it's 1999
(Say it one more time)
2 thousand zero zero party over it's out of time
Yeah
So tonight I'm gonna party like it's 1999
1999
(Don't you wanna go)
1999
(Don't you wanna go)
1999
  """
  file_name = "party_like_its_1999.txt"
  title = Some "Party Like Its 1999"
  category = None
  original = [||]
}


let insertTestRow () = 
  insert row

// let testRows() =
//   defaultConnection
//   |> Sql.connectFromConfig
//   |> Sql.query "select id, year, text, title from inquiries"
//   |> Sql.execute (fun read -> { 
//     year = read.int "year"
//     text = read.string "text"
//     title = read.stringOrNone "title"
//   })




