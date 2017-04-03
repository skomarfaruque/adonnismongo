<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Email</label>
        <p class="control">
          <input class="input" v-model="email" type="text" placeholder="Customer Email">
        </p>
        <label class="label">Name</label>
        <p class="control">
          <input class="input" v-model="name" type="text" placeholder="Customer Name">
        </p>
        <label class="label">Phone</label>
        <p class="control">
          <input class="input" v-model="phone" type="text" placeholder="Customer phone">
        </p>
        <label class="label">Address 1</label>
        <p class="control">
          <input class="input" v-model="address1" name="" id=""/>
        </p>
        <label class="label">Address 2</label>
        <p class="control">
          <input class="input" v-model="address2" name="" />
        </p>
        <label class="label">City</label>
        <p class="control">
          <input class="input" v-model="city" type="text" placeholder="City">
        </p>
        <label class="label">State</label>
        <p class="control">
          <input class="input" v-model="state" type="text" placeholder="State">
        </p>
        <label class="label">Zip Code</label>
        <p class="control">
          <input class="input" v-model="zipCode" type="text" placeholder="Zip Code">
        </p>
        <a href="javascript:" class="button is-primary" @click="save">Save</a>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
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
  data ({ store }) {
    axios.setBearer(store.state.authUser)
    return {
      name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: ''
    }
  },
  methods: {
    async save () {
      const customer = await axios.post('customer', this.$data)
      if (this.$store.state.role === 'Agent') {
        const agentCustomer = await axios.get(`agent/me/assign-customer/${customer.data._id}`)
      }
      this.$router.push('/customer')
    }
  }
}
</script>
