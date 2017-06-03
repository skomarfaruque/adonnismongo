<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <div class="columns">
          <div class="column is-3 is-offset-2">
          </div>
          <div class="column is-3">
            Description
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
{{list}}
    <div class="columns" v-for="(item, ind) in list">
      <div class="column is-12">
        <div class="columns">
          <div class="column is-3 is-offset-2">
            <img :src="`/item_image/${item.image}`"  alt="" style="max-width: 150px;height: 150px;">
          </div>
          <div class="column is-3 shopitem">
            <span>{{item.description}}</span>
          </div>
          <div class="column is-1 shopitem">
            <span>${{item.price}}</span>
          </div>
          <div class="column is-1 shopitem">
            <span>{{item.quantity}}</span>
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
            Subtotal:$159.99
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
                      <span>Amount</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span>Total</span>
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
                      <span>Shipping</span>
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
  .float-right {
    text-align: right;
  }
  .shopitem span {
    margin-top: 5%;
    position: absolute;
  }
  .shopitems a {
    margin-top: 53px;
    margin-right: 5px;
  }
  .shopitem a {
    margin-top: 4%;
    position: absolute;
  }
  .block a {
    margin-right: 10px;
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
    let {data} = await axios.post('storeinfo/cartitem')
    return {
      list: data[0].items,
      cart_id: data[0]._id,
      isCreditOff: false,
      confirmation: false,
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
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  destroyed () {
    this.list = []
    this.confirmation = false
  },
  methods: {
    async remove (item, ind) {
      this.list.splice(ind, 1)
      let removeCartItem =  this.axios.post(`storeinfo/removecartitem/`,{id: this.cart_id, items: this.list})
      this.confirmation = false
    },
  }


}
</script>
