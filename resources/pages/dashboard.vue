<template>
  <section class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile is-horizontal">
        <div class="tile is-parent is-6">
          <article class="tile is-child notification is-primary">
            <p class="title">Calendar</p>
            <p class="subtitle">View all your appointments.</p>
          </article>
        </div>
        <div class="tile is-parent is-6">
          <article class="tile is-child notification is-primary">
            <p class="title">New Customer</p>
            <p class="subtitle">Add a new customer.</p>
          </article>
        </div>       
        
      </div>
      <div class="tile is-horizontal">
        <div class="tile is-parent is-6">
          <nuxt-link class="tile is-child notification is-primary" to="/customer/existing">
            <p class="title">Existing Customer</p>
            <p class="subtitle">View list of customers.</p>
          </nuxt-link>
        </div>
        <div class="tile is-parent is-6">
          <article class="tile is-child notification is-primary">
            <p class="title">Admin</p>
            <p class="subtitle">Manage administrative options.</p>
          </article>
        </div>
      </div>
      <div class="tile is-horizontal">
        <div class="tile is-parent is-6">
          <article class="tile is-child notification is-primary">
            <p class="title">Supplies</p>
            <p class="subtitle">View all your supply items.</p>
          </article>
        </div>
        <div class="tile is-parent is-6">
          <article class="tile is-child notification is-primary">
            <p class="title">Upload</p>
            <p class="subtitle">Upload necessary files and images.</p>
          </article>
        </div>
        
      </div>
      <div class="tile is-horizontal">
        <div class="tile is-parent is-6">
          <article class="tile is-child notification is-primary">
            <p class="title">Invoice</p>
            <p class="subtitle">Create and print invoices.</p>
          </article>
        </div>
        <div class="tile is-parent is-6">
          <article class="tile is-child notification is-primary">
            <p class="title">Store</p>
            <p class="subtitle">Buy something for your service needs.</p>
          </article>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  middelware: 'auth',
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
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Dashboard', 'Navigate your application.'])
  }
}
</script>
