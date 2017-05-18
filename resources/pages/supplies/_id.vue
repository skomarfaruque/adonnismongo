<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" v-model="name" type="text" placeholder="Item Name">
        </p>
        <label class="label">description</label>
        <p class="control">
          <input class="input" v-model="description" name="" id=""/>
        </p>
        <label class="label">Price</label>
        <p class="control">
          <input class="input" v-model="price" name="" />
        </p>
        <label class="label">Commission</label>
        <p class="control">
          <input class="input" v-model="commission" name="" />
        </p>
        <a href="javascript:" class="button is-info" @click="save">Save Information</a>
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
      title: `New Suppliies Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['New Item', 'Add a new Supply item.'])
  },
  components: {
    MaskedInput
  },
  async asyncData ({ store, axios, params }) {
    let { data } = await axios.get(`supplies/${params.id}`)
    return {
      id: data._id,
      name: data.name,
      description: data.description,
      price: data.price,
      commission: data.commission
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  methods: {
    async save () {
      await this.axios.put(`supplies/${this.id}`, this.$data)
      this.$router.go(-1)
    }
  }
}
</script>

