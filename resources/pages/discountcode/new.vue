<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <form id="myForm" name="myForm">
          <label class="label">Discount code</label>
          <p class="control">
            <input class="input" name="name" v-model="discountcode.discount_code" type="text" placeholder="Discount code">
          </p>
          <label class="label">Percentage</label>
          <p class="control">
            <input class="input" name="description" v-model="discountcode.percentage"  id="" placeholder="Percentage"/>
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
      title: `New discount code add Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['New discount code', 'Add a new discount code.'])
  },
  components: {
    MaskedInput
  },
  asyncData ({ store, axios }) {
    return {
      discountcode: {
        discount_code: '',
        precentage:''
      }
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  methods: {
    async save () {
      let newinfo = await this.axios.post(`discountcode`, this.discountcode)
      this.$router.push('/discountcode')
    },
  }
}
</script>

