<template>
  <section>
    <div class="columns">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>
              Agent Name
            </th>
            <th>
              Customer Name
            </th>
            <th>
              Customer Email
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
            <td>{{ item.agent.name }}</td>
            <td>{{ item.customer.name }}</td>
            <td>{{ item.customer.email }}</td>
            <td>{{ item.customer.zipCode }}</td>
            <td>{{ item.customer.city }}</td>
            <td class="action">
              <section v-show="confirmation === false">
                <a href="javascript:" class="button is-danger" @click="confirmation = true" title="Delete"> <i class="fa fa-trash"></i> </a>
                <nuxt-link class="button is-info" :to="`/invoice/${item._id}`" title="Edit"><i class="fa fa-pencil"></i> </nuxt-link>
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

<script>
export default {
  middleware: 'auth',
  head () {
    return {
      title: `Invoice Page (${this.name}-side)`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Invoice', 'Create and print invoices.'])
  },
  async asyncData ({ store, axios }) {
     let { data } =  await axios.get('invoice') // store.state.role === 'Agent' ? await axios.get('agent/me/customer') : await axios.get('customers')
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
  methods: {
    remove (item, ind) {

    }
  }
}
</script>
