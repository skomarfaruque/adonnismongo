<template>
  <section>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-4">
        <label class="label">Invoice: {{invoice.title}}</label>
        <label class="label">Invoice for: {{invoice.agent.name}}</label>
      </div>
      <div class="column is-2">

      </div>
      <div class="column is-4">
        <label class="label">Customer: {{invoice.customer.name}}</label>
        <label class="label">Address:</label>
        <span> {{invoice.customer.address1}}, {{invoice.customer.address2}}</span><br/>
        <span>City: {{invoice.customer.city}}, </span>
        <span>State: {{invoice.customer.state}}, </span>
        <span>Zip Code: {{invoice.customer.zipCode}} </span>
        <label class="label">Phone: {{invoice.customer.phone}}</label>
      </div>
      <div class="column is-1"></div>
    </div>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-10 box">
        <table>
          <thead>
            <tr>
              <th>
                Sl#
              </th>
              <th>
                Item
              </th>
              <th>
                Price
              </th>
              <th>
                Quantity
              </th>
              <th>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in invoice.items">
              <td>{{i + 1}}</td>
              <td>{{item.description}}</td>
              <td>${{item.price}}</td>
              <td>{{item.quantity}}</td>
              <td>${{item.total}}</td>
              
            </tr>
            
          </tbody>
          <tfoot>
          <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Total</label></td>
              <td>${{total}}</td>
            </tr></tfoot>
        </table>
      </div>
      <div class="column is-1"></div>
    </div>
  </section>
</template>
<style scoped>
  tfoot {
    margin-top: 10px;
    border-top: 1px solid #e3e3e3;
  }
</style>
<script>
import MaskedInput from 'vue-text-mask'
export default {
  middleware: 'auth',
  head () {
    return {
      title: `Invoice Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Invoice Edit', 'Edit Invoice information.'])
  },
  components: {
    MaskedInput
  },
  async asyncData ({ store, axios, params }) {
    let { data } = await axios.get(`invoice/${params.id}`)
    let total = 0
    data.items.forEach(item => {
      item.total = item.quantity * item.price
      total += item.total
    })
    return {
      invoice: data,
      total
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  methods: {
    save () {
      
    }
  }
}
</script>
