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
    store.commit('SET_HEAD', ['New Customer', 'Add a new customer.'])
  }
}
</script>
