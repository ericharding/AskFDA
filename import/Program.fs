open System.Diagnostics
open System

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
  runCommand "pdf2txt" path

// start in a folder full of zip files
// run '7z x' on all files
// recurse into all subdirectories
// run pdf2txt on all files
// slurp in text

let ls = runCommand "ls" ""


let args = 
  Environment.GetCommandLineArgs()
  |> Array.head

printfn "%s" args