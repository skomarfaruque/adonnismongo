<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="search" placeholder="Search by Name, Price, Description" v-model="search" @keyup.enter="searchSupplies">
            </p>
            <p class="control">
              <button class="button" @click="searchSupplies">
                <i class="fa fa-search"></i>
              </button>
            </p>
          </div>
        </div>
      </div>

    </nav>
    <div class="storeitem" v-for="(item, ind) in list">
      <img style="max-width: 200px;" :src="`/item_image/${item.image}`" alt=""><br>
      Name:{{ item.name }}<br>
      Description:{{ item.description }}<br>
      Available:{{ item.quantity }}<br>
      Price:{{ item.price }}<br>
      Quantity: <input type="number" min="1" :max="item.quantity" v-model="item.qunatity_temp"><br>
      <a href="javascript:" class="button is-danger" @click="addToCart(item)" title="Add to card"> <i class="fa fa-shopping-cart"></i> </a>
    </div>
  </section>
</template>
<style scoped>
  .storeitem {
    border: 1px solid #ccc;
    text-align: center;
    margin-right: 5px;
    margin-bottom: 10px;
    width: 19%;
    float: left;
    height: auto;
  }
  .button.is-danger {
    padding: 5px 50px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .storeitem input {
    width:40px;
  }
  .storeitem img {
    padding-top: 10px;
    height: 150px;
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
      title: `Store item Page (${this.name}-side)`
    }
  },
  async asyncData ({ store, axios }) {
    store.commit('SET_HEAD', ['Store', 'Store items.'])
    let { data } = await axios.get('storeinfo')
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
    async searchSupplies () {
      let { data } = await this.axios.get(`customer/supplies?key=${this.search}`)
      this.list = data
    },
    addToCart (item){
      if(item.qunatity_temp > item.quantity){
        return this.$toasted.show('You must select quantity equal or less than available quantity', { duration: 4500 })
      } else if (!item.qunatity_temp  || item.qunatity_temp < 1){
        return this.$toasted.show('You must select valid quantity', { duration: 4500 })
      }
      let updateQuantity  = this.axios.post(`storeinfo/update/${item._id}`,{ quantity: item.quantity, quantity_temp: item.qunatity_temp})
    }
  }


}
</script>
