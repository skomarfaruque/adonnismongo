<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="search" placeholder="Search by Name, Email, Zip Code, City" v-model="search" @keyup.enter="searchAgent">
            </p>
            <p class="control">
              <button class="button" @click="searchAgent">
                <i class="fa fa-search"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <nuxt-link href="javascript:" class="button is-info" title="Add New" to="/agent/new"> <i class="fa fa-plus"></i> </nuxt-link>
        </div>
      </div>
    </nav>
    <div class="columns">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>
              Agent Name
            </th>
            <th>
              Email
            </th>
            <th>
              City
            </th>
            <th>
              Zip Code
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ind) in list">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.zipCode.join(', ') }}</td>
            <td class="action">
              <section v-show="confirmation === false">
                <a href="javascript:" class="button is-danger" @click="confirmation = true" title="Delete"> <i class="fa fa-trash"></i> </a>
                <nuxt-link class="button is-info" :to="`/agent/${item._id}`" title="Edit"><i class="fa fa-pencil"></i> </nuxt-link>
                <nuxt-link class="button is-info" :to="`/agent/calendar?id=${item._id}`" title="Calender"><i class="fa fa-calendar"></i> </nuxt-link>
                <nuxt-link class="button is-info" :to="`/agent/customers?id=${item._id}`" title="View Customers"><i class="fa fa-users"></i> </nuxt-link>
                <nuxt-link class="button is-info" :to="`invoice?agentId=${item._id}`" title="View Commission"><i class="fa fa-money"></i> </nuxt-link>
              </section>
              <section v-show="confirmation">
                <a href="javascript:" class="button is-danger" @click="remove(item, ind)" title="Confirm"> <i class="fa fa-check"></i> </a>
                 <a href="javascript:" class="button is-info" @click="confirmation = false" title="Cancel"> <i class="fa fa-times"></i> </a>
              </section>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<style>

</style>
<script>
  export default {
    middleware: 'auth',
    head () {
      return {
        title: `Agent Page`
      }
    },
    async asyncData ({ store, axios }) {
      store.commit('SET_HEAD', ['Agent', 'View list of the agents.'])
      let { data } = await axios.get('agents')
      return {
        list: data,
        search: '',
        confirmation: false
      }
    },
    data () {
      return {
        axios: this.$root.$options.axios
      }
    },
    destroyed () {
      this.list = []
      this.confirmation = false
    },
    watch: {
      search (value) {
        if (value.length === 0) {
          this.searchAgent()
        }
      }
    },
    methods: {
      async remove (item, ind) {
        await this.axios.delete(`agents/${item._id}`)
        this.list.splice(ind, 1)
        this.confirmation = false
        return this.$toasted.show('Successfully deleted', { duration: 4500 })
      },
      async searchAgent () {
        let { data } = await this.axios.get(`agent/search?key=${this.search}`)
        this.list = data
      }
    }
  }
</script>
