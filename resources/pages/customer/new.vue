<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Email</label>
        <p class="control has-icon has-icon-right">
          <input class="input" v-model="user.email" type="text" placeholder="Customer Email" @blur="checkEmail">
          <span class="icon is-small" v-if="user._id">
            <i class="fa fa-info" aria-hidden="true"></i>
          </span>
          <span class="help is-success" v-if="user._id">Customer exists with this email!</span>
        </p>
        <label class="label">Name</label>
        <p class="control">
          <input class="input" v-model="user.name" type="text" placeholder="Customer Name">
        </p>
        <label class="label">Phone</label>
        <p class="control">
          <masked-input
            type="text"
            name="phone"
            class="input"
           v-model="user.phone"
            :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholderChar="#">
          </masked-input>
        </p>
        <label class="label">Address 1</label>
        <p class="control">
          <input class="input"v-model="user.address1" name="" id=""/>
        </p>
        <label class="label">Address 2</label>
        <p class="control">
          <input class="input"v-model="user.address2" name="" />
        </p>
        <label class="label">City</label>
        <p class="control">
          <input class="input"v-model="user.city" type="text" placeholder="City">
        </p>
        <label class="label">State</label>
        <p class="control">
          <input class="input"v-model="user.state" type="text" placeholder="State">
        </p>
        <label class="label">Zip Code</label>
        <p class="control">
          <input class="input"v-model="user.zipCode" type="text" placeholder="Zip Code">
        </p>
        <a href="javascript:" class="button is-info" @click="save">Save Information</a>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
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
  data ({ store }) {
    return {
      user: {}
    }
  },
  beforeCreate () {
    axios.setBearer(this.$store.state.authUser)
  },
  methods: {
    async save () {
      if (!this.user._id) {
        const customer = await axios.post('customers', this.user)
        this.user._id = customer.data._id
      }
      if (this.$store.state.role === 'Agent') {
        const agentCustomer = await axios.get(`agent/me/assign-customer/${this.user._id}`)
      }
      this.$router.push('/customer')
    },
    async checkEmail () {
      let email = this.user.email
      let { data } = await axios.get(`customer/search?key=${this.user.email}`)
      this.user = data[0] || { email }
    }
  }
}
</script>
