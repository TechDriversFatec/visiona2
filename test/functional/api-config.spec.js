'use strict'

const { test, trait } = use('Test/Suite')('Api Config')
const path = require('path')

trait('Test/ApiClient')

test('checks if the app is building', async ({ client }) => {
  const response = await client.get('api/v1').end()
  response.assertStatus(200)
  response.assertJSON({ name: 'Detector de talhões' })
})

test('Test route upload file', async ({ client }) => {
  const response = await client.post('api/v1/files')
    .header('Content-Type', 'multipart/form-data')
    .attach('image', path.resolve(__dirname, '../assets/L2A_T23LLG_20170604T132241_B01_60m.jp2'))
    .end()
  response.assertStatus(200)
})
