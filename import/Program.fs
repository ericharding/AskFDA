open System.Diagnostics
open System.IO
open IO
open System
open Database

let runCommand exe args =
  let info = ProcessStartInfo()
  info.FileName <- exe
  info.Arguments <- args
  info.UseShellExecute <- false
  info.RedirectStandardOutput <- true
  let proc = Process.Start(info)
  let output = proc.StandardOutput.ReadToEnd()
  proc.WaitForExit()
  output

let pdf2text path =
  // printfn "%s" path
  // runCommand "bash" (sprintf "-c pdf2txt %s" path)
  runCommand "pdf2txt" path

let directoryName = 
  Environment.GetCommandLineArgs()
  |> Array.toList
  |> function
  | [_; arg] -> arg
  | _ -> 
    Environment.CurrentDirectory <- """c:\hg\fda_inquiries\import"""
    "../data/2018"


let unzip path =
  Compression.ZipFile.OpenRead path

let category (name:string) (srcPath:string) =
  let cut = name.IndexOf('/')
  if cut > 0 then
    name.Substring(0,cut) |> Some
  else 
    fileName srcPath |> Some

let pdfStreamToText (data:Stream) =
  data.Seek(0L, SeekOrigin.Begin) |> ignore
  let temp = Path.GetTempFileName()
  use stream = File.OpenWrite(temp);
  data.CopyTo(stream);
  data.Flush()
  stream.Close()
  let res = pdf2text temp
  unlink temp
  res

let importZip year path =
  seq {
    use z = unzip path
    for entry in z.Entries do
      let fileName = entry.Name
      let category = category entry.FullName path
      use mem = new MemoryStream()
      entry.Open().CopyTo(mem)
      let rawData = mem.ToArray()
      let text = pdfStreamToText mem
      { Row.year = year 
        text = text
        file_name = fileName
        title = None
        category = category
        original = rawData }
  }

let import directoryName =
  let year = lastPart directoryName |> int
  let zips = 
    getFiles directoryName "*.zip"
    // |> Array.take 1
    |> Array.map (importZip year)
    |> Seq.collect id
  zips
  

// start in a folder full of zip files
// run '7z x' on all files
// recurse into all subdirectories
// run pdf2txt on all files
// slurp in text
printfn "Import from %s" directoryName

let rows = import directoryName
for r in rows do
  // printfn "%A" r.file_name
  match Database.insert r with
  | Ok _ -> printfn "Inserted: '%s'" r.file_name
  | Error e -> printfn "Error on '%s'\n%A" r.file_name e