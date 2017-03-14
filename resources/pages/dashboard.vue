<template>
  <section class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile is-horizontal">
        <div class="tile is-parent is-6">
          <nuxt-link class="tile is-child notification is-primary" to="/calendar">
            <p class="title">Calendar</p>
            <p class="subtitle">View and create appointments.</p>
          </nuxt-link>
        </div>
        <div class="tile is-parent is-6">
          <nuxt-link class="tile is-child notification is-primary" to="/customer/new">
            <p class="title">New Customer</p>
            <p class="subtitle">Add a new customer.</p>
          </nuxt-link>
        </div>       
        
      </div>
      <div class="tile is-horizontal">
        <div class="tile is-parent is-6">
          <nuxt-link class="tile is-child notification is-primary" to="/customer">
            <p class="title">Existing Customer</p>
            <p class="subtitle">View list of customers.</p>
          </nuxt-link>
        </div>
        <div class="tile is-parent is-6">
          <nuxt-link class="tile is-child notification is-primary" to="/admin">
            <p class="title">Admin</p>
            <p class="subtitle">Manage administrative tasks.</p>
          </nuxt-link>
        </div>
      </div>
      <div class="tile is-horizontal">
        <div class="tile is-parent is-6">
          <nuxt-link class="tile is-child notification is-primary" to="/supplies">
            <p class="title">Supplies</p>
            <p class="subtitle">View all your supply items.</p>
          </nuxt-link>
        </div>
        <div class="tile is-parent is-6">
          <nuxt-link class="tile is-child notification is-primary" to="/upload">
            <p class="title">Upload</p>
            <p class="subtitle">Upload necessary files and images.</p>
          </nuxt-link>
        </div>
        
      </div>
      <div class="tile is-horizontal">
        <div class="tile is-parent is-6">
          <nuxt-link class="tile is-child notification is-primary" to="/invoice">
            <p class="title">Invoice</p>
            <p class="subtitle">Create and print invoices.</p>
          </nuxt-link>
        </div>
        <div class="tile is-parent is-6">
          <nuxt-link class="tile is-child notification is-primary" to="/store">
            <p class="title">Store</p>
            <p class="subtitle">Buy something for your service needs.</p>
          </nuxt-link>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  middelware: 'auth',
  head () {
    return {
      title: `Dashboard Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Dashboard', 'Navigate your application.'])
  }
}
</script>
