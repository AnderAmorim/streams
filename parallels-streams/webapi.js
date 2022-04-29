import http from 'http'
import { Readable } from 'stream'

let count = 0;
const maxItens = 99
const api1 = (request,response)=>{
  const readable = Readable({
    read(){
      const everySecond = (intervalContext) => {
        if(count++ <= maxItens){
          this.push(JSON.stringify({id:Date.now() + count, name:`Anderson-${count}`}))
          this.push('\n')
          return;
        }
        clearInterval(intervalContext)
        this.push(null)
      }
      setInterval(function(){everySecond(this)}) 
    }
  })
  readable.pipe(response)//dando pipe na writable stream
}

const api2 = (request,response)=>{
  const readable = Readable({
    read(){
      const everySecond = (intervalContext) => {
        if(count++ <= maxItens){
          this.push(JSON.stringify({id:Date.now() + count, name:`Teste-${count}`}))
          this.push('\n')
          return;
        }
        clearInterval(intervalContext)
        this.push(null)
      }
      setInterval(function(){everySecond(this)}) 
    }
  })
  readable.pipe(response)//dando pipe na writable stream
}

http.createServer(api1).listen(3000, ()=>console.log('listeing on 3000'))
http.createServer(api2).listen(4000, ()=>console.log('listeing on 4000'))