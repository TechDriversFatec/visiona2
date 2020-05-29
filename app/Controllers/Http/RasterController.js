'use strict'

const Drive = use('Drive')

class RasterController {
  async store ({ request }) {
    // regras sobre o tipo de arquivo
    const validationOptions = {
      types: ['jp2', 'tiff'],
      size: '100mb'
    }

    request.multipart.file('image', validationOptions, async file => {
    // validação do tamanho do arquivo
      file.size = file.stream.byteCount

      // validação do arquivo
      await file.runValidations()

      // messagens de erro
      const error = file.error()
      if (error.message) {
        throw new Error(error.message)
      }

      const Name = file.clientName

      // upload do arquivo para o  s3
      await Drive.put(Name, file.stream, {
        ContentType: file.headers['content-type'],
        ACL: 'public-read'
      })
    })

    // Devemos chamar o process para começar a processar o arquivo carregado
    await request.multipart.process()

    return 'done'
  }
}

module.exports = RasterController
