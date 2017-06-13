<template>
  <section class="tile is-ancestor">
    <div class="tile is-vertical is-12">
      <div class="tile is-vertical">
        <div class="tile is-parent is-vertical">
          <nuxt-link class="tile is-child notification is-info" to="/agent/calendar" v-if="isCalendar">
            <p class="title">Calendar</p>
            <p class="subtitle">View and create appointments.</p>
          </nuxt-link>
          <nuxt-link class="tile is-child notification is-info" to="/agent" v-if="isAgent">
            <p class="title">Agent</p>
            <p class="subtitle">View list of the agents</p>
          </nuxt-link>
          <nuxt-link class="tile is-child notification is-info" to="/customer" v-if="isCustomer">
            <p class="title">Customer</p>
            <p class="subtitle">View list of customers.</p>
          </nuxt-link>
          <nuxt-link class="tile is-child notification is-info" to="/admin" v-if="isAdmin">
            <p class="title">Admin</p>
            <p class="subtitle">Manage administrative tasks.</p>
          </nuxt-link>
          <nuxt-link class="tile is-child notification is-info" to="/supplies" v-if="isSupply">
            <p class="title">Supplies</p>
            <p class="subtitle">View all your supply items.</p>
          </nuxt-link>
          <nuxt-link class="tile is-child notification is-info" to="/storeinfo" v-if="isAdmin">
            <p class="title">Store</p>
            <p class="subtitle">View all store items.</p>
          </nuxt-link>
          <nuxt-link class="tile is-child notification is-info" to="/storeinfo/agent" v-if="usertype ==='Agent'">
            <p class="title">Store</p>
            <p class="subtitle">View all store items.</p>
          </nuxt-link>
          <nuxt-link class="tile is-child notification is-info" to="/invoice?agentId=me" v-if="isInvoice && usertype ==='Agent'">
            <p class="title">Invoice</p>
            <p class="subtitle">Create and print invoices.</p>
          </nuxt-link>
          <nuxt-link class="tile is-child notification is-info" to="/invoice/agentall" v-if="isInvoice && usertype ==='Admin'">
            <p class="title">Invoice</p>
            <p class="subtitle">Show agents report.</p>
          </nuxt-link>
        </div>

      </div>
    </div>

  </section>
</template>

<script>
export default {
  middleware: 'auth',
  head () {
    return {
      title: `Dashboard Page`
    }
  },
  asyncData ({ store }) {
    store.commit('SET_HEAD', ['Dashboard', 'Navigate your application.'])
    const per = store.state.permissions
    const usertype = store.state.role
    return {
      isCalendar: per.includes('calendar-view'),
      isAgent: per.includes('agent-view'),
      isAdmin: per.includes('admin-view'),
      isCustomer: per.includes('customer-view'),
      isSupply: per.includes('supply-view'),
      isInvoice: per.includes('invoice-view'),
      usertype: usertype
    }
  }
}
</script>
