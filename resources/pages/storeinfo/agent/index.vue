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
    <div class="columns">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Description
            </th>
            <th>
              Price
            </th>
            <th>
              Image
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ind) in list">
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>${{ item.price }}</td>
            <td><img style="max-width: 200px;" :src="`/item_image/${item.image}`" alt=""></td>
            <td class="action">
             <a href="javascript:" class="button is-danger" @click="addToCart(item._id)" title="Add to card"> <i class="fa fa-shopping-cart"></i> </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="columns">

    </div>
  </section>
</template>

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
