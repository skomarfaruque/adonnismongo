<template>
  <section>

    <div  class="columns invoice-week">
      <div class="column is-12">
        <label class="invoice-head">Week of {{list.date}}</label>
      </div>
    </div>

<div v-if="list.weeks.length">
<div v-for="info in list.weeks">
<li>Agent name:{{info.agentName}} , Appointment total:{{info.totalPrice}}, Agents commission amount: {{info.totalCommissionPrice}}, invoice id: {{info.invoiceId}}</li>
</div>



</div>
<button @click="previous()">Previous</button>
<button v-show="flag !== 0" @click="next()">Next</button>


  </section>
</template>

<style scoped>
  .invoice-label .level:not(:last-child) {
     margin-bottom: 0rem;
  }
  .invoice-week .invoice-head, .invoice-year .invoice-head {
    padding-left: 5%;
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
