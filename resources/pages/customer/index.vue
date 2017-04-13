<template>
  <section>
    <nav class="level">
      <div class="level-left">   
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="search" placeholder="Search by Name, Email, Zip Code, City" v-model="search" @keyup.enter="searchCustomer">
            </p>
            <p class="control">
              <button class="button" @click="searchCustomer">
                <i class="fa fa-search"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">   
        <div class="level-item">
          <nuxt-link href="javascript:" class="button is-info" title="Add New" to="/customer/new"> <i class="fa fa-plus"></i> </nuxt-link>
        </div>
      </div>
    </nav>
    <div class="columns">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>
              Customer Name
            </th>
            <th>
              Email
            </th>
            <th>
              Zip Code
            </th>
            <th>
              City
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
            <td>{{ item.zipCode }}</td>
            <td>{{ item.city }}</td>
            <td class="action">
              <section v-show="confirmation === false">
                <a href="javascript:" class="button is-danger" @click="confirmation = true" title="Delete"> <i class="fa fa-trash"></i> </a>
                <nuxt-link class="button is-info" :to="`/customer/${item._id}`" title="Edit"><i class="fa fa-pencil"></i> </nuxt-link>
                <nuxt-link class="button is-info" :to="`/customer/appointment?id=${item._id}`" title="View Appointments"><i class="fa fa-list-ul"></i> </nuxt-link>
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
    <div class="columns">

    </div>
  </section>
</template>
<style>
  td.action {
    text-align: center;
  }
  td.action a {
    margin: 0 5px 0 5px;
  }
</style>
<script>
  import axios from '~/plugins/axios'
export default {
  middleware: 'auth',
  head () {
    return {
      title: `Customer Page`
    }
  },
  async data ({ store }) {
    store.commit('SET_HEAD', ['Your Customer', 'View list of the customers.'])
    axios.setBearer(store.state.authUser)
    let { data } = store.state.role === 'Agent' ? await axios.get('agent/me/customer') : await axios.get('customers')
    return {
      list: data,
      search: '',
      confirmation: false
    }
  },
  created () {
    axios.setBearer(this.$store.state.authUser)
  },
  destroyed () {
    this.list = []
    this.confirmation = false
  },
  watch: {
    search (value) {
      if (value.length === 0) {
        this.searchCustomer()
      }
    }
  },
  methods: {
    async remove (item, ind) {
      await axios.delete(`customers/${item._id}`)
      this.list.splice(ind, 1)
      this.confirmation = false
    },
    async searchCustomer () {
      let { data } = await axios.get(`customer/search?key=${this.search}`)
      this.list = data
    }
  }
}
</script>
