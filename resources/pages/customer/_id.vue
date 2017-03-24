<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" v-model="name" type="text" placeholder="Customer Name">
        </p>
        <label class="label">Email</label>
        <p class="control">
          <input class="input" v-model="email" type="text" placeholder="Customer Email">
        </p>
        <label class="label">Address</label>
        <p class="control">
          <textarea class="textarea" v-model="address" name="" id="" cols="30" rows="10"></textarea>
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
    store.commit('SET_HEAD', ['New Customer', 'Add a new customer.'])
  },
  async data ({ store, params }) {
    axios.setBearer(store.state.authUser)
    const { data } = await axios.get(`customer/${params.id}`)
    return {
      id: data._id,
      name: data.name,
      email: data.email,
      address: data.address ? data.address : ''
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
