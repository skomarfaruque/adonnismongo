<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        supply@page
      </div>
    </div>
  </section>
</template>

<script>
import MaskedInput from 'vue-text-mask'
export default {
  middleware: 'auth',
  head () {
    return {
      title: `New Customer Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['New Customer', 'Add a new customer.'])
  },
  components: {
    MaskedInput
  },
  asyncData ({ store, axios }) {
    
    return {
      user: {}
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  methods: {
    async save () {
      if (!this.user._id) {
        const customer = await this.axios.post('customers', this.user)
        this.user._id = customer.data._id
      }
      if (this.$store.state.role === 'Agent') {
        const agentCustomer = await this.axios.get(`agent/me/assign-customer/${this.user._id}`)
      }
      this.$router.push('/customer')
    },
    async checkEmail () {
      let email = this.user.email
      let { data } = await this.axios.get(`customer/search?key=${this.user.email}`)
      this.user = data[0] || { email }
    }
  }
}
</script>
