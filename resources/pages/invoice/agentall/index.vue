<template>
  <section>
<span  v-for="(dataVal, i) in list.weeks">
    <div  class="columns invoice-week">
      <div class="column is-12">
        <label class="invoice-head">Week of {{dataVal.date}}</label>
      </div>
    </div>
    <div class="columns invoice-label">
      <div class="column is-1"></div>
      <div class="column is-6">
        <nav class="level" v-for="(itemVal, j) in dataVal.item">
          <div class="level-left">
            <div class="level-item">
              <span>{{j}}</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>${{twoDigitFormat(itemVal)}}</span><br/>
            </div>
          </div>
        </nav>


        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span class="invoice-head">Total</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span class="invoice-head">${{twoDigitFormat(dataVal.totalPrice)}}</span>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-5"></div>
    </div>
</span>



    <hr>
    <div class="columns invoice-year">
      <div class="column is-1"></div>
      <div class="column is-11">
        <label class="invoice-head">Year to Date Earnings</label>
      </div>
    </div>
    <div class="columns invoice-label">
      <div class="column is-2"></div>
      <div class="column is-5">
        <nav class="level" v-for="(dataYearVal, k) in list.year.item">
          <div class="level-left">
            <div class="level-item">
              <span>{{k}}</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>${{twoDigitFormat(dataYearVal)}}</span><br/>
            </div>
          </div>
        </nav>

        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span class="invoice-head">Total</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span class="invoice-head">${{twoDigitFormat(list.year.totalPrice)}}</span>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-5"></div>
    </div>
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
     let { data } =  await axios.get(`invoice/info/all`) //in future it will be "me"
      console.log(data)
     var info = data
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
    twoDigitFormat (value) {
      return value.toFixed(2);
    },
  }
}
</script>
