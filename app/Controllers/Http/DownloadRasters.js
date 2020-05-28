'use strict'

const axios = use('axios')
const fs = use('fs')
const Drive = use('Drive')
const path = use('path')
const crypto = use('crypto')

class DownloadRasters {
  async index ({ response }) {
    const coords = '-23.21082162580377%20-45.916500091552734,-23.220208448140895%20-45.91830253601074,-23.222732523114207%20-45.90414047241211,-23.21263593700573%20-45.901994705200195,-23.21082162580377%20-45.916500091552734'
    const b02 = await this.getRaster('B02', coords)
    const b03 = await this.getRaster('B03', coords)
    const b04 = await this.getRaster('B04', coords)
    const b08 = await this.getRaster('B08', coords)
    response.json({ status: true, date: new Date(), names: { b02, b03, b04, b08 } })
  }

  async getRaster (band, coords) {
    const url = `http://services.sentinel-hub.com/ogc/wms/067aeea3-60ea-4af8-b5bb-68364de2459b?REQUEST=GetMap&LAYERS=${band}&MAXCC=10&WIDTH=400&HEIGHT=400&TIME=2020-05-01&GEOMETRY=POLYGON((${coords}))&CRS=EPSG%3A4326&BGCOLOR=000000&TRANSPARENT=false&FORMAT=image%2Ftiff`
    const folderName = path.resolve(__dirname, '../../../tmp')
    const name = crypto.randomBytes(8).toString('hex')
    await this.download(url, folderName, name)
    await this.uploadToAws(name, `${folderName}/${name}.tif`)
    fs.unlinkSync(`${folderName}/${name}.tif`)

    return name
  }

  async download (url, folderName, name) {
    try {
      const stream = await axios({
        method: 'get',
        url,
        responseType: 'stream'
      })

      await this.streamToFolder(folderName, name, stream)
    } catch (error) {
      console.log('error -->', error)
      throw error
    }
  }

  streamToFolder (folderName, name, res) {
    return new Promise((resolve, reject) => {
      const stream = res.data.pipe(fs.createWriteStream(`${folderName}/${name}.tif`))
      stream.on('finish', resolve)
      stream.on('error', reject)
    })
  }

  async uploadToAws (name, filePath) {
    const file = fs.createReadStream(filePath)

    await Drive.put(name, file, {
      ContentType: 'image/tif',
      ACL: 'public-read'
    })
  }
}

module.exports = DownloadRasters
