import { join } from 'node:path'
import { config } from './config.mjs'
import { getDirName, request, saveFileFromStream } from './utils.mjs'

const __dirname = getDirName()

config.forEach(cfg => {
  cfg.urls.forEach(url => {
    const config = {
      url,
      method: cfg.method,
      headers: cfg.method,
      dir: cfg.name,
    }
    config.fileName = cfg.getName(config)
    downloadResource(config)
  })
})

async function downloadResource(config) {
  const [err, res] = await request({
    url: config.url,
    method: config.method,
    headers: config.method,
    responseType: 'stream',
  })
  if (err) {
    console.error(e)
    return
  }
  const savePath = join(__dirname, '../resources', config.dir, config.fileName)
  const [err1] = await saveFileFromStream(savePath, res)
  if (err1) {
    console.error(err1)
  }
}
