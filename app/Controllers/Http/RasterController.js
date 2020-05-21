'use strict'

const Drive = use('Drive')

class RasterController {
  async store ({ request }) {
    // upload rules
    const validationOptions = {
      types: ['jp2', 'tiff'],
      size: '5mb'
    }

    request.multipart.file('image', validationOptions, async file => {
    // set file size from stream byteCount, so adonis can validate file size
      file.size = file.stream.byteCount

      // run validation rules
      await file.runValidations()

      // catches validation errors, if any and then throw exception
      const error = file.error()
      if (error.message) {
        throw new Error(error.message)
      }

      const Key = `raster-${(Math.random() * 50).toString(32)}`

      // upload file to s3
      await Drive.put(Key, file.stream, {
        ContentType: file.headers['content-type'],
        ACL: 'public-read'
      })
    })

    // You must call this to start processing uploaded file
    await request.multipart.process()

    return 'done'
  }
}

module.exports = RasterController
