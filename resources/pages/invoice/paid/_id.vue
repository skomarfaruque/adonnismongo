
<template>
  <section>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-10 print-class"><a title="print invoice" @click="printPage" class="button is-primary"><i class="fa fa-print" aria-hidden="true"></i></a></div>
      <div class="column is-1"></div>
    </div>
    <span id="print">
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-4" >
        <label><b>Date:</b> {{ getHumanDate(invoice.start_time) }}</label><br>
        <label><b>Invoice:</b> {{invoice._id}}</label><br>
        <label><b>Phostorian name:</b> {{invoice.agent.name}}</label>
      </div>
      <div class="column is-2">

      </div>
      <div class="column is-4">
        <label><b>Customer:</b> {{invoice.customer.name}}</label><br>
        <label class="label">Address:</label>
        <span> {{invoice.customer.address1}}, {{invoice.customer.address2}}</span><br/>
        <span>City: {{invoice.customer.city}}, </span>
        <span>State: {{invoice.customer.state}}, </span>
        <span>Zip Code: {{invoice.customer.zipCode}} </span><br>
        <label><b>Phone:</b> {{invoice.customer.phone}}</label><br>
        <label><b>Email:</b> {{invoice.customer.email}}</label>
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
          <tbody class="paid-tbody">
            <tr v-for="(item, i) in invoice.items">
              <td>{{i + 1}} </td>
              <td>{{item.description}}</td>
              <td>${{item.price}}</td>
              <td>{{item.quantity}}</td>
              <td>${{twoDigitFormat(item.price * item.quantity)}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Total</label></td>
              <td>${{twoDigitFormat(total)}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Discount Saving</label></td>
              <td>${{parseFloat(!invoice.discount?0:invoice.discount)}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Shipping</label></td>
              <td>${{parseFloat(!invoice.shipping?0:invoice.shipping)}}</td>
            </tr>
            <tr>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Total</label></td>
              <td>${{twoDigitFormat(total - parseFloat(!invoice.discount?0:invoice.discount) + parseFloat(!invoice.shipping?0:invoice.shipping))}}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Tax({{invoice.tax}}%)</label></td>
              <td>${{twoDigitFormat ((total - parseInt(!invoice.discount?0:invoice.discount) + parseInt(!invoice.shipping?0:invoice.shipping))*invoice.tax?0:invoice.tax/100)}}</td>
            </tr>
            <tr>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
              <td><hr></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><label class="label">Grand Total</label></td>
              <!--<td>${{total - parseInt(discount) + parseInt(shipping) * totalTax / 100}}</td> -->
              <td>${{ twoDigitFormat((total - parseInt(!invoice.discount?0:invoice.discount) + parseInt(!invoice.shipping?0:invoice.shipping)) + ((total - parseInt(!invoice.discount?0:invoice.discount) + parseInt(!invoice.shipping?0:invoice.shipping))*!invoice.tax?0:invoice.tax/100)) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="column is-1"></div>
    </div>
    <div class="columns">
      <div class="column is-1"></div>
        <div class="column is-10 box">
          <div v-if="invoice.payment_method === 'cash'">
            <b>Comment: </b>{{ invoice.invoice_comment }}<br>
            <b>Payment Method: </b>Cash<br>
            <b>Paid: </b>${{invoice.payment_method_desc.customer_paid}}<br>
            <b>Change: </b>${{invoice.payment_method_desc.return_amount}}<br>
            <b>Payment Status: </b>PAID<br>
          </div>
          <div v-if="invoice.payment_method === 'check'">
            <b>Comment: </b>{{ invoice.invoice_comment }}<br>
            <b>Payment Method: </b>Check<br>
            <b>Amount: </b>${{invoice.payment_method_desc.amount}}<br>
            <b>Check Number: </b>{{invoice.payment_method_desc.check_no}}<br>
            <b>Account Number: </b>{{ invoice.payment_method_desc.account_no }}<br>
            <b>Routing Number: </b>{{ invoice.payment_method_desc.routing_no }}<br>
            <b>Front Of Check: </b><br><img :src="`/check_doc/${invoice.payment_method_desc.front_file}`" alt=""><br>
            <b>Back Of Check: </b><br><img :src="`/check_doc/${invoice.payment_method_desc.back_file}`" alt=""><br>
            <b>Payment Status: </b>PAID
          </div>
          <div v-if="invoice.payment_method === 'card'">
            <b>Comment: </b>{{ invoice.invoice_comment }}<br>
            <b>Payment Method: </b>Credit Card<br>
            <b>Bill to:</b><br>
            <b>First Name: </b>{{ invoice.payment_method_desc.bill_first_name }}<br>
            <b>Last Name: </b>{{ invoice.payment_method_desc.bill_last_name }}<br>
            <b>Company: </b>{{ invoice.payment_method_desc.bill_company }}<br>
            <b>Address: </b>{{ invoice.payment_method_desc.bill_address }}<br>
            <b>City: </b>{{ invoice.payment_method_desc.bill_city }}<br>
            <b>State: </b>{{ invoice.payment_method_desc.bill_state }}<br>
            <b>Zip: </b>{{ invoice.payment_method_desc.bill_zip }}<br>
            <b>Ship to:</b><br>
            <b>First Name: </b>{{ invoice.payment_method_desc.ship_first_name }}<br>
            <b>Last Name: </b>{{ invoice.payment_method_desc.ship_last_name }}<br>
            <b>Company: </b>{{ invoice.payment_method_desc.ship_company }}<br>
            <b>Address: </b>{{ invoice.payment_method_desc.ship_address }}<br>
            <b>City: </b>{{ invoice.payment_method_desc.ship_city }}<br>
            <b>State: </b>{{ invoice.payment_method_desc.ship_state }}<br>
            <b>Zip: </b>{{ invoice.payment_method_desc.ship_zip }}<br>
            <b>Payment Status: </b>PAID</b>
          </div>
        </div>
      <div class="column is-1"></div>
    </div>
    </span>
  </section>
</template>
<style scoped>
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
  .paid-tbody tr td {
    padding: 5px 0px 5px 0px;
  }
  .print-class a {
    float: right;
  }
</style>
<script>
import MaskedInput from 'vue-text-mask'
import moment from 'moment'
export default {
  middleware: 'auth',
  head () {
    return {
      title: `Invoice paid Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['', ''])
  },
  components: {
    MaskedInput
  },
  async asyncData ({ store, axios, params }) {
    let { data } = await axios.get(`invoice/${params.id}`)
    let { data: products } = await axios.get('supplies')
    return {
      invoice: data,
      invoice_settled:'',
      payment_method:'',
      card: {
        card_no:'4242424242424242',
        tax:'',
        exp_date:'0822',
        ship_first_name:'',
        ship_last_name:'',
        ship_company:'',
        ship_address:'',
        ship_city:'',
        ship_state:'',
        ship_zip:'',
        ship_country:'',
        card_code:'999',
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
      totalTax: '',
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
    getHumanDate (date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    },
    dateFormated (date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    },
    twoDigitFormat (value) {
      return value.toFixed(2);
    },

    changePrice () {
        this.price = 0
        if(this.newItem.price){
        this.price = this.newItem.price
        }
    },
    printPage () {
      var printContents = document.getElementById('print').innerHTML;
       var originalContents = document.body.innerHTML;
       document.body.innerHTML = printContents
       window.print();
       location.reload();
    },


  }
}
</script>