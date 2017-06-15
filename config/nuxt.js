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
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      },
      {
        rel: 'stylesheet',
        href: '/calendar/dhtmlxscheduler.css'
      }
    ],
    script: [
      {
        src: '/calendar/dhtmlxscheduler.js'
      },
      {
        src: '/calendar/dhtmlxscheduler_limit.js'
      },
      {
        src: '/calendar/dhtmlxscheduler_tooltip.js'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: 'bulma', lang: 'sass' },
    { src: 'flatpickr/dist/flatpickr.min.css' },
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
    vendor: ['axios', 'vee-validate', 'vue-text-mask', 'flatpickr', 'vue-toasted', 'moment']
  },
  plugins: ['~/plugins/cookie', { src: '~/plugins/axios', injectAs: 'axios' }, '~/plugins/veelidate', { src: '~/plugins/notification', ssr: false }, '~/plugins/helper']
}
