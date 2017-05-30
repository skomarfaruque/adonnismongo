<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <form id="myForm" name="myForm">
          <label class="label">Name</label>
          <p class="control">
            <input class="input" name="name" v-model="name" type="text" placeholder="Item Name">
          </p>
          <label class="label">description</label>
          <p class="control">
            <input class="input" name="description" v-model="description"  id=""/>
          </p>
          <label class="label">Price</label>
          <p class="control">
            <input class="input" name="price" v-model="price"  />
          </p>
          <label class="label">Quantity</label>
          <p class="control">
            <input class="input" name="quantity" v-model="quantity" />
          </p>
          <!--<label class="label">Image</label>
          <p class="control">
          <span><input type="file" name="image" id="fileInput"><br>
          <img style="max-width: 300px;" alt=""></span>
          </p>-->
          <a href="javascript:" class="button is-info" @click="save">Save Information</a>
        </form>
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
    let { data } = await axios.get(`storeinfo/${params.id}`)
    return {
      id: data._id,
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  methods: {
    async save () {
      await this.axios.put(`storeinfo/${this.id}`, this.$data)
      this.$router.go(-1)
    }
  }
}
</script>

