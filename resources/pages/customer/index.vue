<template>
  <section>
    <div class="levels">
      <div class="level-left">   

      </div>
      <div class="level-right">   
        <div class="level-item">
          <nuxt-link href="javascript:" class="button is-primary" title="Add New" to="/customer/new"> <i class="fa fa-plus"></i> </nuxt-link>
        </div>
      </div>
    </div>
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ind) in list">
            <td>{{ item.customer.name }}</td>
            <td>{{ item.customer.email }}</td>
            <td class="action">
              <a href="javascript:" class="button is-danger" @click="remove(item, ind)" title="Delete"> <i class="fa fa-trash"></i> </a>
						  <nuxt-link class="button is-primary" :to="`/customer/${item._id}`" title="Edit"><i class="fa fa-pencil"></i> </nuxt-link>
              <nuxt-link class="button is-primary" :to="`/customer/calendar?id=${item._id}`" title="Edit"><i class="fa fa-calendar"></i> </nuxt-link>
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
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Your Customer', 'View list of the customers.'])
  },
  async data ({ store }) {
    axios.setBearer(store.state.authUser)

    let { data } = await axios.get('agent/me/customer')
    return {
      list: data
    }
  },
  methods: {
    async remove (item, ind) {
      await axios.delete(`customer/${item._id}`)
      this.list.splice(ind, 1)
    }
  }
}
</script>
