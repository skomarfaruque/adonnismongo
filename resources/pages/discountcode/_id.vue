<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <form id="myForm" name="myForm">
          <label class="label">Discount code</label>
          <p class="control">
            <input class="input" name="name" v-model="discount_code" type="text" placeholder="Discount code">
          </p>
          <label class="label">Percentage</label>
          <p class="control">
            <input class="input" name="percentage" v-model="percentage"  id="" placeholder="Percentage"/>
          </p>
          
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
      title: `Discount Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['New Item', 'Add a new Discount item.'])
  },
  components: {
    MaskedInput
  },
  async asyncData ({ store, axios, params }) {
    let { data } = await axios.get(`discountcode/${params.id}`)
    return {
      id: data._id,
      discount_code: data.discount_code,
      percentage: data.percentage,
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  methods: {
    async save () {
      await this.axios.put(`discountcode/${this.id}`, this.$data)
      this.$router.go(-1)
    }
  }
}
</script>

