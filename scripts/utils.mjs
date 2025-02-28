import axios from 'axios'
import { createWriteStream } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

export function getDirName() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  return __dirname
}

export function request(config) {
  return new Promise(resolve => {
    axios(config).then(response => resolve([null, response]))
  }).catch(e => resolve([e]))
}

export function saveFileFromStream(savePath, res) {
  return new Promise(resolve => {
    const writer = createWriteStream(savePath)
    res.data.pipe(writer)
    writer.on('finish', () => resolve([null]))
    writer.on('error', err => resolve([err]))
  })
}
