'use strict'

const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Back-End Application',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Adonuxt project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'material-design-icons/iconfont/material-icons.css',
    { src: 'bulma', lang: 'sass' },
    { src: '~assets/css/main.scss', lang: 'scss' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#744d82' },
  /**
   * Environment variables
   */
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '..', 'resources'),
  /**
   * Vendors
   */
  build: {
    vendor: ['axios']
  },
  plugins: ['~/plugins/axios']
}
