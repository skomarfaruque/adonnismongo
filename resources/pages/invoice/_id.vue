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
        <div class="level">
          <div class="level-item">
            <div class="level-right">

            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                Action
              </th>
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
              <td><a class="button" @click="removeItem(i)">-</a></td>
              <td>{{i + 1}} </td>
              <td>{{item.description}}</td>
              <td>${{item.price}}</td>
              <td>{{item.quantity}}</td>
              <td>${{item.price * item.quantity}}</td>

            </tr>
            <tr>
              <td>
                <a class="button" @click="addItem">+</a>
              </td>
              <td>
                
              </td>
              <td>
                <p class="control">
                  <span class="select">
                    <select v-model="newItem" @change="changePrice">
                      <option value="" selected>Select item</option>
                      <option v-for="(item, ind) in products" v-bind:value="item">{{ item.name }}</option>
                    </select>
                  </span>
                </p>
              </td>
              <td>
                ${{price}}
              </td>
              <td>
                <input type="number" class="input" min="1"  v-model="quantity">
              </td>
              <td>
                ${{price*quantity}}
              </td>

            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Discount Saving</label></td>
              <td>${{discount}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Shipping</label></td>
              <td>${{shipping}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Total</label></td>
              <td>${{total - parseInt(discount) + parseInt(shipping)}}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="column is-1"></div>
    </div>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-10">
        <div class="columns">
          <div class="column is-6">
            <div class="columns">

              <div class="column is-2">
                <label class="label">Shipping</label>

              </div>
              <div class="column is-5">
                <input class="input" type="number" min="0" v-model="shipping">
              </div>
              <!--<div class="column is-2">
                <a class="button">Apply</a>
              </div>-->
            </div>
          </div>
          <div class="column is-6">
            <div class="columns">

              <div class="column is-3">
                <label class="label">Discount</label>

              </div>
              <div class="column is-5">
                <input class="input" type="number" min="0" v-model="discount">
              </div>
              <!--<div class="column is-2">
                <a class="button">Apply</a>
              </div>-->
            </div>

          </div>
        </div>
        <div class="columns">
          <div class="column is-2"></div>
          <div class="column is-8 block has-text-centered">
            <a class="button is-info is-large">Cash</a>
            <a class="button is-info is-large">Check</a>
            <a class="button is-info is-large">Credit</a>
          </div>
          <div class="column is-2"></div>
        </div>
      </div>
      <div class="column is-1"></div>
    </div>
  </section>
</template>
<style scoped>
  tbody tr td {
    padding: 5px;
  }
  tfoot {
    margin-top: 10px;
    border-top: 1px solid #e3e3e3;
  }
  .block a.button {
    margin: 10px;
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
    let { data: products } = await axios.get('supplies')

    return {
      invoice: data,
      products,
      discount: 0,
      shipping: 0,
      newItem: '',
      price: 0,
      quantity: 1
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
watch: {
    shipping: function (newValue) {
      if(newValue < 0){
        this.shipping = 0
        this.$toasted.show('Shipping can not be less than 0.', { duration: 4500 })
      }
    },
    discount: function (newValue) {
      if(newValue < 0){
        this.discount = 0
        this.$toasted.show('Discount can not be less than 0.', { duration: 4500 })
      }
    },
  },
  computed: {
    total () {
      let total = 0
      this.invoice.items.forEach(item => {
        total += item.quantity * item.price
      })
      return total
    }
  },
  methods: {
    save () {

    },
    async addItem () {
      if(this.newItem.name){
        if(this.quantity > 0){
          this.invoice.items.push({
          description: this.newItem.name,
          price: this.newItem.price,
          quantity: this.quantity
      })
        await this.axios.post(`invoice/item-add`, { id: this.invoice._id, items: this.invoice.items })
        }else{
        this.$toasted.show('Quantity must be greater than 0.', { duration: 4500 })
        }

      }else{
       this.$toasted.show('Items must be selected.', { duration: 4500 })
     }
    },
    async removeItem (index) {
      this.invoice.items.splice(index, 1)
      await this.axios.post(`invoice/item-add`, { id: this.invoice._id, items: this.invoice.items })
    },
    changePrice () {
      this.price = this.newItem.price
    }

  }
}
</script>