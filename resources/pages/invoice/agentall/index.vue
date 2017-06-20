<template>
  <section>

    <div  class="columns invoice-week">
      <div class="column is-12">
        <h2>Week of {{list.date}}</h2>
      </div>
    </div>
    
    <div class="columns" v-if="list.weeks.length">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>
              Agent name
            </th>
            <th>
              Appointment total
            </th>
            <th>
              Agents commission amount
            </th>
            <th>
              invoice id
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="info in list.weeks">
            <td>{{ info.agentName }}</td>
            <td>{{ info.totalPrice }}</td>
            <td>{{ info.totalCommissionPrice }}</td>
            <td>{{ info.invoiceId }}</td>
            <td><nuxt-link :to="`/invoice/paid/${info.invoiceId}`" class="button is-info">View Invoice</nuxt-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="columns" v-else>
      <div class="column is-12">
        <h2>No Invoice Found !</h2>
      </div>
    </div>
    <nav class="pagination is-centered">
      <a @click="previous()" class="pagination-previous">Previous</a>
      <a v-show="flag !== 0" @click="next()" class="pagination-next">Next</a>
    </nav>

  </section>
</template>

<style scoped>
  .invoice-label .level:not(:last-child) {
     margin-bottom: 0rem;
  }
  .invoice-week h2 {
    font-size: 20px;
  }
  .invoice-head {
    font-size: 20px;
  }
  @media screen and (max-width: 768px){
    .level-left + .level-right {
        margin-top: 0rem;
    }
    nav {
      margin-bottom: 10px !important;
    }
  }
</style>

<script>
export default {
  middleware: 'auth',
  head () {
    return {
      title: `Invoice Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Invoice all', 'View report.'])
  },
  async asyncData ({ store, axios, query }) {
     let { data } =  await axios.get(`invoice/info/all/0`) //in future it will be "me"
     console.log(data)
     var info = data
    return {
      list: data,
      flag: parseInt(data.flag),
      search: '',
      confirmation: false
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
computed: {
    total () {
      let total = 0
      this.invoice.items.forEach(item => {
        item.total = item.quantity * item.price * item.commission / 100
        total += item.quantity * item.price
      })
      return total
    }
  },
  methods: {
    remove (item, ind) {

    },
    async previous () {
      this.flag += 1
      let self = this
      let { data } =  await this.axios.get(`invoice/info/all/${this.flag}`)
      // console.log(data)
      self.list = data
      
    },
    async next () {
      this.flag -= 1
      let self = this
      let { data } =  await this.axios.get(`invoice/info/all/${this.flag}`)
      self.list = data
      
    },
  }
}
</script>
