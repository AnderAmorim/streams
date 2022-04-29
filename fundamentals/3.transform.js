import { createWriteStream } from 'fs'
import {Readable, Writable, Transform} from 'stream'

// fonte
const readable = Readable({
  read() {
    for (let index = 0; index < 2; index++) {
      const person = {id:Date.now()+index, name:`Anderson-${index}`}
      const data = JSON.stringify(person)
      this.push(data)
    }
    this.push(null)
  }
})

const transform = Transform({
  transform(chunk, enconding, cb){
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`
    cb(null, result)
  }
})

//Criando header do csv
const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0
    if(this.counter){
      return cb(null, chunk)
    }

    this.counter++
    return cb(null, "id,name\n".concat(chunk))
  }
})

const writable = Writable({
  write(chunk, encoding, cb){
    console.log(chunk.toString())
    cb()
  }
})

const pipeline = readable
  .pipe(transform)
  .pipe(mapHeaders)
  .pipe(createWriteStream('my-csv.csv'))

pipeline.on("end", () => console.log('Finalizado'))