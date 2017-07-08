<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="search" placeholder="Search by Name, Price, Description" v-model="search" @keyup.enter="searchStore">
            </p>
            <p class="control">
              <button class="button" @click="searchStore">
                <i class="fa fa-search"></i>
              </button>
            </p>
          </div>
        </div>
      </div>

    </nav>
    <div class="storeitem" v-for="(item, ind) in list">
      <div class="rsizeimg">
        <img :src="`/item_image/${item.image}`" alt=""><br>
      </div>
      <div class="zinfo">
        <b>Name:</b> {{ item.name }}<br>
        <b>Description:</b> {{ item.description }}<br>
        <span v-if="item.quantity > 0"><b>Available:</b> {{ item.quantity }}</span><span v-else>Out of stock</span><br>
        <b>Price:</b> ${{ item.price }}<br>
        <p class="" v-if="item.option">
          <span class="select">
            <select v-model="item.optionVal">
              <option value="undefined" selected>Options</option>
              <option v-for="(optionVal, index) in item.option">{{optionVal}}</option>
            </select>
          </span>
        </p>
        <b>Quantity:</b> <input type="number" min="1" :max="item.quantity" v-model="item.order_quantity"><br>
        <a v-if="item.quantity > 0" href="javascript:" class="button is-info" @click="addToCart(item)" title="Add to cart"> <i class="fa fa-shopping-cart"></i> </a>
        <span v-else  class="button is-danger"><i class="fa fa-shopping-cart"></i></span>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .select select {
    width: 100px;
  }
  .rsizeimg {
    height: 150px;
    z-index: 1;
  }
  .storeitem {
    border-radius: 2px;
    text-align: center;
    margin-right: 1%;
    margin-bottom: 10px;
    width: 19%;
    float: left;
    height: 360px;
    position: relative;
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .button.is-info, .button.is-danger {
    padding: 5px 50px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .storeitem input {
    width:40px;
  }
  .zinfo {
    background-color: #fff;
    z-index: 99999;
    position: absolute;
    width: 100%;
  }
  .storeitem img {
    width: 100%;
  }
  @media only screen and (max-width: 992px) {
    .storeitem {
      width: 49%;
    }
  }
  @media only screen and (max-width: 768px) {
    .storeitem {
      width: 100%;
      margin-right: 0px;
    }
  }
</style>
<script>

export default {
  middleware: 'auth',
  head () {
    return {
      title: `Store item Page`
    }
  },
  async asyncData ({ store, axios }) {
    store.commit('SET_HEAD', ['Store', 'Store items.'])
    let { data } = await axios.get('storeinfo')
    let presentQuantity = await axios.get('store/cart')
    store.commit('SET_CART_ITEM', presentQuantity.data?presentQuantity.data.items.length:0)
    return {
      list: data,
      search: '',
      confirmation: false
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
      await this.axios.delete(`storeinfo/${item._id}`)
      this.list.splice(ind, 1)
      this.confirmation = false
    },
    async searchStore () {
      let { data } = await this.axios.get(`storeall/search?key=${this.search}`)
      this.list = data
    },
    async addToCart (item){
      console.log(item)
      self = this
      if(item.order_quantity > item.quantity){
        return this.$toasted.show('You must select quantity equal or less than available quantity', { duration: 4500 })
      } else if (!item.order_quantity  || item.order_quantity < 1){
        return this.$toasted.show('You must select valid quantity', { duration: 4500 })
      }
      let updateQuantity  = await this.axios.post(`storeinfo/update/${item._id}`,{order_quantity: item.order_quantity, item: item})
      let presentQuantity = await this.axios.get('store/cart')
      self.$store.commit('SET_CART_ITEM', presentQuantity.data.items.length)
      return this.$toasted.show('Successfully added to cart', { duration: 4500 })
    }
  }


}
</script>
