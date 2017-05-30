<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" v-model="storeinfo.name" type="text" placeholder="Item Name">
        </p>
        <label class="label">description</label>
        <p class="control">
          <input class="input" v-model="storeinfo.description" name="" id=""/>
        </p>
        <label class="label">Price</label>
        <p class="control">
          <input class="input" v-model="storeinfo.price" name="" />
        </p>
        <label class="label">Quantity</label>
        <p class="control">
          <input class="input" v-model="storeinfo.quantity" name="" />
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
      title: `New iteam add Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['New Item', 'Add a new Store item.'])
  },
  components: {
    MaskedInput
  },
  asyncData ({ store, axios }) {

    return {
      storeinfo: {}
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  methods: {
    async save () {
      if (!this.storeinfo._id) {
        const storeinfo = await this.axios.post('storeinfo', this.storeinfo)
        this.storeinfo._id = storeinfo.data._id
      }
      this.$router.push('/storeinfo')
    }
  }
}
</script>

