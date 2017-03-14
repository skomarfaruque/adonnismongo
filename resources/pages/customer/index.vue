<template>
  <section>
    
  </section>
</template>

<script>
export default {
  middelware: 'auth',
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Existing Customer', 'View list of customers.'])
  }
}
</script>
