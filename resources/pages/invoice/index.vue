<template>
  <section>

    <div class="columns invoice-week">
      <div class="column is-12">
        <label class="invoice-head">Week of April 21st, 2017</label>
      </div>
    </div>
    <div class="columns invoice-label">
      <div class="column is-1"></div>
      <div class="column is-6">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Scanning</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>${{list.scanningTotal}}</span><br/>
            </div>
          </div>
        </nav>
        <nav v-for="other in list.othersTotal" class="level">
          <div class="level-left">
            <div class="level-item">
              <span>{{other.name}}</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>${{other.price}}</span><br/>
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
              <span class="invoice-head">$2625.50</span>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-5"></div>
    </div>

    <div class="columns invoice-week">
      <div class="column is-12">
        <label class="invoice-head">Week of April 21st, 2017</label>
      </div>
    </div>
    <div class="columns invoice-label">
      <div class="column is-1"></div>
      <div class="column is-6">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Scanning</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$1,650.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>VHS</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$224.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Prints</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$250.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>...</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$25</span>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>...</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$75.50</span>
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
              <span class="invoice-head">$2625.50</span>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-5"></div>
    </div>

    <div class="columns invoice-week">
      <div class="column is-12">
        <label class="invoice-head">Week of April 21st, 2017</label>
      </div>
    </div>
    <div class="columns invoice-label">
      <div class="column is-1"></div>
      <div class="column is-6">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Scanning</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$1,650.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>VHS</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$224.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Prints</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$250.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>...</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$25</span>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>...</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$75.50</span>
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
              <span class="invoice-head">$2625.50</span>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-5"></div>
    </div>

    <div class="columns invoice-week">
      <div class="column is-12">
        <label class="invoice-head">Week of April 21st, 2017</label>
      </div>
    </div>
    <div class="columns invoice-label">
      <div class="column is-1"></div>
      <div class="column is-6">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Scanning</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$1,650.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>VHS</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$224.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Prints</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$250.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>...</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$25</span>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>...</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$75.50</span>
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
              <span class="invoice-head">$2625.50</span>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-5"></div>
    </div>
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
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Scanning</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$1,650.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>VHS</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$224.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>Prints</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$250.00</span><br/>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>...</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$25</span>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <span>...</span><br/>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span>$75.50</span>
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
              <span class="invoice-head">$2625.50</span>
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
    store.commit('SET_HEAD', ['Commissions', 'View your earnings.'])
  },
  async asyncData ({ store, axios }) {
     let { data } =  await axios.get('invoice') // store.state.role === 'Agent' ? await axios.get('agent/me/customer') : await axios.get('customers')
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
  methods: {
    remove (item, ind) {

    }
  }
}
</script>
