<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" type="text" placeholder="Text input">
        </p>
        <label class="label">Email</label>
        <p class="control">
          <input class="input" type="text" placeholder="Text input">
        </p>
        <label class="label">Address</label>
        <p class="control">
          <input class="input" type="text" placeholder="Text input">
        </p>
        <a href="javascript:" class="button is-primary">Send Invitation</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  head () {
    return {
      title: `New Customer Page (${this.name}-side)`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['New Customer', 'Add a new customer.'])
  }
}
</script>
