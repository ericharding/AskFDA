module IO
open System.IO


let getFiles dir pattern = 
  Directory.GetFiles(dir, pattern)

let combine path1 path2 = Path.Combine(path1, path2)

let getTempDir () =
  let temp = Path.GetTempPath()
  let name = sprintf "FDA-%s" (Path.GetRandomFileName())
  let path = combine temp name
  Directory.CreateDirectory path |> ignore
  path

let lastPart (path:string) = 
  Path.TrimEndingDirectorySeparator path
  |> Path.GetFileNameWithoutExtension
