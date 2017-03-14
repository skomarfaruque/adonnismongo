{{{{raw}}}}
<template>
  <section>
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      This page is loaded from the {{ name }}
    </h1>
    <p> {{ auth }} </p>
    <h2 class="info" v-if="name === 'client'">
      Please refresh the page
    </h2>
    <nuxt-link class="button" to="/">
      Home page
    </nuxt-link>
  </section>
</template>
{{{{/raw}}}}
<script>
export default {
  async data ({ req }) {
    return {
      name: req ? 'server' : 'client',
      auth: req ? await req.session.get('token') : ''
    }
  },
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}
</script>

