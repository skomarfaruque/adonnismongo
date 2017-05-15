<template>
  <section>

  </section>
</template>

<script>
export default {
  middleware: 'auth',
  head () {
    return {
      title: `Supplies Page (${this.name}-side)`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Supplies', 'View all your supply items.'])
  }
}
</script>
