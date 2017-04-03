<template>
  <section>
    <div class="columns">
      <div class="column is-6">
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
      title: `New Customer Page (${this.name}-side)`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Customer Edit', 'Edit customer information.'])
  },
  async data ({ store, params }) {
    axios.setBearer(store.state.authUser)
    const { data } = await axios.get(`customer/${params.id}`)
    return {
      id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      zipCode: data.zipCode,
      state: data.state,
      address1: data.address1,
      address2: data.address2
    }
  },
  methods: {
    async save () {
      const customer = await axios.put(`customer/${this.id}`, this.$data)
      this.$router.push('/customer')
    }
  }
}
</script>
