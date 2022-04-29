// process.stdin.pipe(process.stdout)

//node (nodex.exe in windows) -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import { createReadStream } from "fs"
import http from "http"
http.createServer((req, res)=>{
  //nice
  createReadStream('big.file')
    .pipe(res)
}).listen(3000, ()=>console.log("running at 3000"))
// curl localhost:3000 -o output.txt