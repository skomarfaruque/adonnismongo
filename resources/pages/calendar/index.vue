<template>
  <section>
    
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Calendar', 'View all your appointments.'])
  }
}
</script>
