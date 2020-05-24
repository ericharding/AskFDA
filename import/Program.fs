open System.Diagnostics
open System
open System.IO
open IO
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
  printfn "%s" path
  // runCommand "bash" (sprintf "-c pdf2txt %s" path)
  // runCommand "pdf2txt" path
  "ok"

let directoryName = 
  Environment.GetCommandLineArgs()
  |> Array.toList
  |> function
  | [_; arg] -> arg
  | _ -> "../data/2018"


let unzip path =
  Compression.ZipFile.OpenRead path

let category (name:string) =
  let cut = name.IndexOf('/')
  name.Substring(0,cut)

let pdfStreamToText (data:Stream) =
  let temp = Path.GetTempFileName();
  use stream = File.OpenWrite(temp);
  data.CopyTo(stream);
  data.Flush()
  pdf2text temp

let importZip year path =
  let z = unzip path
  seq {
    for entry in z.Entries do
      let fileName = entry.Name
      let category = category entry.FullName
      use mem = new MemoryStream()
      entry.Open().CopyTo(mem)
      let rawData = mem.ToArray()
      let text = pdfStreamToText mem
      { Row.year = year 
        text = text
        file_name = fileName
        title = None
        category = Some category
        original = rawData }
  }

let import directoryName =
  let year = lastPart directoryName |> int
  let zips = 
    getFiles directoryName "*.zip"
    |> Array.take 1
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
  printfn "%s:\n%s" r.file_name r.text