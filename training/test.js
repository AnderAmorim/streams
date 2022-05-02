import {Duplex, Readable, Transform, Writable} from 'stream'
import { pipeline } from 'stream/promises'

import { createReadStream } from "fs"

// fonte
const readable = Readable({
  read() {
    for(let i=0; i<=1e3; i++){
      this.push(`Index -> ${i}`)
    }
    this.push(null)
  }
})

const transform = Transform({
  transform(chunk, encoding, cb){
    console.log('mais 1 item - ',chunk.toString())
    cb(null, chunk)
  }
})

const writable = Writable({
  write(chunk, encoding, cb){
    console.log("msg", chunk.toString())
    cb()
  }
})

// readable.pipe(transform).pipe(writable)

async function* readableIterator(stream){
  for(let i=0; i<=1e3; i++){
    yield Buffer.from(`Index -> ${i}`)
  }
}


async function * writableIterator(stream){
  for await(const chunk of stream){
    console.log(chunk.toString())
  }
}


await pipeline(
  readableIterator,
  writableIterator
)

// readbleIterator().pipe(writable)

