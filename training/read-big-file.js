import { createReadStream } from 'fs'
import { readdir } from 'fs/promises'
import { join } from 'path'
import StreamConcat from 'stream-concat'
import { pipeline } from "stream";
import { promisify } from 'util'
import split from 'split2'
const pipelineAsync = promisify(pipeline)

let items = 0
async function prepareStreams(){
  const defaultPath = './doc'
  const files = (await readdir(defaultPath))
  const streams = files.map(file=> createReadStream(join(defaultPath,file)))
  const stream = new StreamConcat(streams)
  return stream
}

async function* transformFile(streams){
  for await(const chunk of streams){
    items++
    // console.log(chunk.user_info)
    yield chunk.user_info
  }
  console.log(items)
}

async function* writable(stream){
  for await(const chunk of stream){
    console.log(JSON.stringify(chunk))
  }
}


;(async function(){
  const result = await prepareStreams();
  try {
    await pipelineAsync(
      result,
      split(JSON.parse),
      transformFile,
      writable
    )
  } catch (error) {
    console.log(error)
  }
})()