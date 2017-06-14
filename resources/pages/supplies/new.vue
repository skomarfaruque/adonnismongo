<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" v-model="supplies.name" type="text" placeholder="Item Name">
        </p>
        <label class="label">Description</label>
        <p class="control">
          <input class="input" v-model="supplies.description" name="" id=""/>
        </p>
        <label class="label">Price</label>
        <p class="control">
          <input class="input" v-model="supplies.price" name="" />
        </p>
        <label class="label">Commission</label>
        <p class="control">
          <input class="input" v-model="supplies.commission" name="" />
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
  asyncData ({ store, axios }) {
    
    return {
      supplies: {}
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  methods: {
    async save () {
      if (!this.supplies._id) {
        const supplies = await this.axios.post('supplies', this.supplies)
        this.supplies._id = supplies.data._id
      }
      this.$router.push('/supplies')
    }
  }
}
</script>

