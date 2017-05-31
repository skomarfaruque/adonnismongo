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
      Price:{{ item.price }}<br>
      Quantity: <input type="number"><br>
      <a href="javascript:" class="button is-danger" @click="addToCart(item._id)" title="Add to card"> <i class="fa fa-shopping-cart"></i> </a>
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
    height: 300px;
  }
  .button.is-danger {
    padding: 5px 50px;
    margin-top: 5px;
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
    addToCart (itemId){
      console.log(itemId)
    }
  }


}
</script>
