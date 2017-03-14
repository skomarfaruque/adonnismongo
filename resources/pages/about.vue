{{{{raw}}}}
<template>
  <section>
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      This page is loaded from the {{ name }}
    </h1>
    <p v-for="l in list"> {{ l.email }} </p>
    <h2 class="info" v-if="name === 'client'">
      Please refresh the page
    </h2>

  </section>
</template>
{{{{/raw}}}}
<script>
import axios from '~/plugins/axios'
export default {
  async data ({ store, req }) {
    axios.setBearer(store.state.authUser)
    const { data } = await axios.get('api/users')
    return {
      name: req ? 'server' : 'client',
      list: data
    }
  },
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  },
  middelware: 'auth'
}
</script>

