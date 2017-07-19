<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <div class="columns title-div">
          <div class="column is-2 is-offset-1">
          </div>
          <div class="column is-3">
            Description
          </div>
          <div class="column is-2">
            Option
          </div>
          <div class="column is-1">
            Price
          </div>
          <div class="column is-1">
            Quantity
          </div>
          <div class="column is-2">
            Action
          </div>
        </div>
      </div>
    </div>
    <div class="columns" v-for="(item, ind) in list">
      <div class="column is-12 title-div">
        <div class="columns">
          <div class="column is-2 is-offset-1">
            <img :src="`/item_image/${item.image}`"  alt="" class="cartImg">
          </div>
          <div class="column is-3 shopitem">
            <span>{{item.description}}</span>
          </div>
          <div class="column is-2">
            <div v-if="item.optionVal" class="shopitemoption">
              
                <span>{{item.optionVal}}</span><br>
              
            </div>
            <div v-else class="shopitem"><span>NA</span></div>
          </div>
          <div class="column is-1 shopitem">
            <span>${{item.order_price}}</span>
          </div>
          
          <div class="column is-1 shopitem">
            <span><input type="number" v-bind:value="item.order_quantity" v-model="item.order_quantity" @click="updateCart(item, ind)"></span>
          </div> 
          <div class="column is-2">
            <section v-show="confirmation === false" class="shopitems">
              <a href="javascript:" class="button is-danger" title="Delete" @click="confirmation = true"> <i class="fa fa-trash"></i> </a>
            </section>
            <section v-show="confirmation" class="shopitems">
              <a href="javascript:" class="button is-danger" @click="remove(item, ind)" title="Confirm"> <i class="fa fa-check"></i> </a>
              <a href="javascript:" class="button is-info" @click="confirmation = false" title="Cancel"> <i class="fa fa-times"></i> </a>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="columns subtotal">
      <div class="column is-12">
        <div class="columns">
          <div class="column is-3 is-offset-2">
          </div>
          <div class="column is-1">
          </div>
          <div class="column is-2">
          </div>
          <div class="column is-2">
            <b>Subtotal:</b> ${{total}}
          </div>
          <div class="column is-2">
            <a href="javascript:" class="button is-info" title="Checkout" @click="isCreditOff=true"> Checkout </a>
          </div>
        </div>
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
                      <span>Credit Card No</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span><input class="input" type="text" v-model="card.card_no" placeholder="Credit Card No"></span>
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
                      <span><input size="5" class="input is-2" v-model="card.exp_month" type="text" placeholder="Month"></span>&nbsp;&nbsp;&nbsp;
                      <span><input size="5" class="input is-2" v-model="card.exp_year" type="text" placeholder="Year"></span>                      
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
                <!--<nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Shipping</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{parseFloat(!shipping?0:shipping)}}</span>
                    </div>
                  </div>
                </nav><br>-->
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span>Amount</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>${{ total }}</span>
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
                      <span><input class="input" v-model="card.card_code" type="text" placeholder="Credit Card Code"></span>
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
                     <span><b>Same as billing</b> &nbsp;&nbsp;&nbsp;<input class="" @click="copyBillingToShip" type="checkbox"></span><br>
                    </div>
                  </div>
                </nav><br>
                <!--<nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span><b>Copy billing</b></span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                     <span><input class="" @click="copyBillingToShip" type="checkbox"></span><br>
                    </div>
                  </div>
                </nav><br>-->
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
              <a class="button is-info" @click="payment">Submit </a>
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
  .float-right {
    text-align: right;
  }
  .block a {
    margin-right: 10px;
  }
  .shopitem span {
    top: 30%;
  }
  .shopitem input {
    width: 50px;
  }
  .title-div {
    margin-bottom: 45px;
  }
  .cartImg {
    max-width: 150px;
    height: 150px;
    margin-top:-45px
  }
  @media only screen and (max-width: 992px) {
  .cartImg {
      max-width: 100px;
      height: 100px;
      margin-top:-25px
    }
  }

</style>
<script>

export default {
  middleware: 'auth',
  head () {
    return {
      title: `Cart page`
    }
  },
  async asyncData ({ store, axios }) {
    store.commit('SET_HEAD', ['Cart', 'Finalize Purchase'])
    let {data} = await axios.get('store/cart')
    return {
      list: data.items?data.items:'',
      cart_id: data._id,
      isCreditOff: false,
      confirmation: false,
      card: {
        card_no:'4242424242424242',
        tax:'',
        exp_date:'',
        exp_month:'08',
        exp_year:'22',
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
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  watch: {
 list: function (newValue) {
      if(newValue < 1 ){
        this.$router.push(`/storeinfo/agent`)
      }
    },
  },
  computed: {
    total () {
      let total = 0
      let self = this
      this.list.forEach(item => {
        item.total = item.order_price
        total += item.order_price
      })
      return total
    }
  },
  destroyed () {
    this.list = []
    this.confirmation = false
  },
  methods: {
    async remove (item, ind) {
      this.list.splice(ind, 1)
      let removeCartItem =  this.axios.post(`storeinfo/removecartitem/${item._id}`,{id: this.cart_id, items: this.list,order_quantity: item.order_quantity, quantity: item.quantity, item: item})
      this.confirmation = false
      let presentQuantity = await this.axios.get('store/cart')
      this.$store.commit('SET_CART_ITEM', presentQuantity.data.items.length)
      return this.$toasted.show('Successfully deleted', { duration: 4500 })
    },
    async payment () {
       this.card.exp_date = this.card.exp_month + this.card.exp_year
       console.log(this.card)
       const card = await this.axios.post(`storeinfo/payment`, { id: this.cart_id, card:this.card })
       if(card.statusText ==='OK'){
         this.$store.commit('SET_CART_ITEM',0)
         this.$toasted.show('Successfully purchased', { duration: 4500 })
       }else{
         this.$toasted.show('There is an error', { duration: 4500 })
       }
       this.$router.push(`/dashboard`)
      //  const card = await this.axios.post('storeinfo/payment/cart_id')
      //  this.card._id = this.cart_id
    },
    async updateCart (item, ind){
      self = this
      
      // let updateQuantity  = await this.axios.post(`storeinfo/updateCart/${item._id}`,{objectId: this.cart_id, order_quantity: item.order_quantity})
      let chk  = await this.axios.post(`storeinfo/cartupdate/${item._id}`,{order_quantity: item.order_quantity, item: item})
      return this.$toasted.show('Successfully updated to cart', { duration: 4500 })
    },
    copyBillingToShip() {
    
        this.card.ship_first_name = this.card.bill_first_name
        this.card.ship_last_name = this.card.bill_last_name
        this.card.ship_company = this.card.bill_company
        this.card.ship_address = this.card.bill_address
        this.card.ship_city = this.card.bill_city
        this.card.ship_state = this.card.bill_state
        this.card.ship_zip = this.card.bill_zip
        this.card.ship_country = this.card.bill_country
    }
  }


}
</script>
