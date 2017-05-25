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
              <td>
              <a v-if="item.description !== '2 Hour Scanning' && item.description !== 'Scanning 1/4 Hour'" class="button" @click="removeItem(i)">-</a>
              </td>
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
            <a href="javascript:" class="button is-info is-large" @click="isCashOff=true">Cash</a>
            <a class="button is-info is-large" @click="isCheckOff=true">Check</a>
            <a class="button is-info is-large" @click="isCreditOff=true">Credit</a>
          </div>
          <div class="column is-2"></div>
        </div>
      </div>
      <div class="column is-1"></div>
    </div>
    <div v-bind:class="{ modal: true, 'is-active': isCashOff }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h1 class="title">Pay Via Cash</h1>
          <div class="box">
            <div class="columns invoice-label">
              <div class="column is-2"></div>
              <div class="column is-8">
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Total</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{total}}</span><br/>
                    </div>
                  </div>
                </nav>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Shipping</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{parseInt(shipping)}}</span><br/>
                    </div>
                  </div>
                </nav>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Discount</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{parseInt(discount)}}</span><br/>
                    </div>
                  </div>
                </nav>
                <hr>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Calculate Change</span><br/>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{total - parseInt(discount) + parseInt(shipping)}}</span>(PAID)<br/>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="column is-2"></div>
            </div>
          </div>
          <div class="level">
            <div class="level-left is-6">

            </div>
            <div class="level-right is-6 block">
              <a class="button is-info" @click="payment('cash')">Submit</a>
              <a class="button is-info" @click="isCashOff=false">Cancel</a>
            </div>
          </div>
        </div>
        <button class="modal-close" @click="isCashOff=false"></button>
      </div>
    </div>
    <div v-bind:class="{ modal: true, 'is-active': isCheckOff }">
      <div class="modal-background"></div>
      <div class="modal-content">
      <form id="myForm" name="myForm">
        <div class="box">
          <h1 class="title">Pay Via Check</h1>
          <div class="box">
            <div class="columns invoice-label">
              <div class="column is-1"></div>
              <div class="column is-10">
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Check Number</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input"  name="check_no" type="number" v-model="check.check_no" placeholder="Enter Check Number">
                      <input class="input"  name="paymentType" type="hidden" value="check" placeholder="Enter Check Number">
                      <input class="input"  name="id" type="hidden" v-bind:value="invoice._id" placeholder="Enter Check Number">
                      </span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Account Number</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" name="account_no" type="number" v-model="check.account_no" placeholder="Account Number"></span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Routing Number</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" id ="routing_no" name="routing_no" type="number" v-model="check.routing_no" placeholder="Routing Number"></span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Upload Front of Check</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input type="file" name="front_file"><br><img style="width:220px; height:100px" src="/_nuxt/img/logo.9fd5444.png" alt=""></span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Upload Back of Check</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input type="file" name="back_file" id="fileInput" ref="fileInput"><br><img style="width:220px; height:100px" src="/_nuxt/img/logo.9fd5444.png" alt=""></span>
                      <!-- <span><input type="file" @change="onFileChange"><br><img style="width:220px; height:100px" :src="check.check_back" alt=""><button @click="removeImage">Remove image</button></span> -->
                    </div>
                  </div>
                </nav><br>
              </div>
              <div class="column is-1"></div>
            </div>
          </div>
          <div class="level">
            <div class="level-left is-6">

            </div>
            <div class="level-right is-6 block">
              <a class="button is-info" @click="payment('check')">Submit</a>
              <a class="button is-info" @click="isCheckOff=false">Cancel</a>
            </div>
          </div>
        </div>
</form>
        <button class="modal-close" @click="isCheckOff=false"></button>
      </div>
    </div>
    <div v-bind:class="{ modal: true, 'is-active': isCreditOff }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h1 class="title">Pay Via Credit Card</h1>
          <div class="box">
            <div class="columns invoice-label">
              <div class="column is-6">
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Amount</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{total - parseInt(discount) + parseInt(shipping)}}</span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Exp Date</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.exp_date" type="text" placeholder="Date"></span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Tax</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.tax" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span><b>Bill to</b></span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>First Name</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input"  v-model="card.bill_first_name" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Last Name</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_last_name" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Company</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_company" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Address</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_address" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>City</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_city" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>State</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_state" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Zip</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_zip" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Country</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.bill_country" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>

              </div>
              <div class="column is-6">
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Shipping</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{parseInt(shipping)}}</span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Credit Card No</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" type="Number" v-model="card.card_no" placeholder="Credit Card No"></span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Card Code</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.card_code" type="number" placeholder="Credit Card Code"></span>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span><b>Ship to</b></span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>First Name</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_first_name" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Last Name</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_last_name" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Company</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_company" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Address</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_address" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>City</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_city"  type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>State</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_state" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Zip</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_zip" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Country</span><br>
                    </div>
                  </div><br>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" v-model="card.ship_country" type="text"></span><br>
                    </div>
                  </div>
                </nav><br>

              </div>
            </div>
          </div>
          <div class="level">
            <div class="level-left is-6">

            </div>
            <div class="level-right is-6 block">
              <a class="button is-info" @click="payment('card')">Submit</a>
              <a class="button is-info" @click="isCreditOff=false">Cancel</a>
            </div>
          </div>
        </div>
        <button class="modal-close" @click="isCreditOff=false"></button>
      </div>
    </div>
  </section>
</template>
<style scoped>
  tbody tr td {
    padding: 5px;
  }
  .invoice-label .level:not(:last-child) {
     margin-bottom: 0rem;
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
      card: {
        card_no:'',
        tax:'',
        exp_date:'',
        ship_first_name:'',
        ship_last_name:'',
        ship_company:'',
        ship_address:'',
        ship_city:'',
        ship_state:'',
        ship_zip:'',
        ship_country:'',
        card_code:'',
        bill_first_name:'',
        bill_last_name:'',
        bill_company:'',
        bill_address:'',
        bill_city:'',
        bill_state:'',
        bill_zip:'',
        bill_country:''
      },
      check: {
        check_no:'',
        account_no:'',
        check_front:'/_nuxt/img/logo.9fd5444.png',
        check_back:'/_nuxt/img/logo.9fd5444.png',
        check_front_file:'',
        check_back_file:'',
        routing_no:''
      },
      products,
      discount: 0,
      shipping: 0,
      newItem: '',
      price: 0,
      quantity: 1,
      isCashOff: false,
      isCheckOff: false,
      isCreditOff: false,
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
watch: {
    shipping: function (newValue) {
      if(newValue < 0 ){
        this.shipping = 0
        this.$toasted.show('Shipping can not be less than 0.', { duration: 4500 })
      }else if(newValue== ''){
        this.shipping = 0
      }
    },
    discount: function (newValue) {
      if(newValue < 0){
        this.discount = 0
        this.$toasted.show('Discount can not be less than 0.', { duration: 4500 })
      }else if(newValue== ''){
        this.discount = 0
      }
    },

  },
  computed: {
    total () {
      let total = 0
      this.invoice.items.forEach(item => {
        item.total = item.quantity * item.price * item.commission / 100
        total += item.quantity * item.price
      })
      return total
    }
  },
  methods: {
    save () {

    },
    async addItem () {
      if(!this.newItem.name) {
        return this.$toasted.show('Items must be selected.', { duration: 4500 })
      }
      if(this.quantity === 0) {
        return this.$toasted.show('Quantity must be greater than 0.', { duration: 4500 })
      }
      this.invoice.items.push({
        description: this.newItem.name,
        price: this.newItem.price,
        quantity: this.quantity,
        commission: this.newItem.commission
      })
      await this.axios.post(`invoice/item-add`, { id: this.invoice._id, items: this.invoice.items })
    },
    async removeItem (index) {
      this.invoice.items.splice(index, 1)
      await this.axios.post(`invoice/item-add`, { id: this.invoice._id, items: this.invoice.items })
    },
    async payment (type) {
      var paymentDescription ={}
      if (type === 'card') {
        paymentDescription = this.card
      } else if (type === 'check') {
        var myForm = document.getElementById('myForm');
        let formData = new FormData(myForm);
        console.log(formData)
        // let formData = new FormData();
        // formData.append('file', this.$refs.fileInput.files[0]);
        // paymentDescription = formData
         await this.axios.post(`invoice/payment`, formData)
         return;
      } else {
        paymentDescription = {}
      }
      await this.axios.post(`invoice/payment`, { id: this.invoice._id, paymentType: type, paymentDescription: paymentDescription, file: this.check.check_back_file })
    },
    changePrice () {
        this.price = 0
        if(this.newItem.price){
        this.price = this.newItem.price
        }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      this.check.check_back_file =file
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.check.check_back = e.target.result


      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.check.check_back = '';
    }

  }
}
</script>