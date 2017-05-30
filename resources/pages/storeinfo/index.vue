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
      <div class="level-right">
        <div class="level-item">
          <nuxt-link href="javascript:" class="button is-info" title="Add New" to="/storeinfo/new"> <i class="fa fa-plus"></i> </nuxt-link>
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
              Quantity
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
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td><img style="max-width: 300px;" :src="`item_image/${item.image}`" alt=""></td>
            <td class="action">
              <section v-show="confirmation === false">
                <a href="javascript:" class="button is-danger" @click="confirmation = true" title="Delete"> <i class="fa fa-trash"></i> </a>
                <nuxt-link class="button is-info" :to="`/supplies/${item._id}`" title="Edit"><i class="fa fa-pencil"></i> </nuxt-link>
              </section>
              <section v-show="confirmation">
                <a href="javascript:" class="button is-danger" @click="remove(item, ind)" title="Confirm"> <i class="fa fa-check"></i> </a>
                 <a href="javascript:" class="button is-info" @click="confirmation = false" title="Cancel"> <i class="fa fa-times"></i> </a>
              </section>
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
    store.commit('SET_HEAD', ['Store', 'View all your Store items.'])
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
      await this.axios.delete(`supplies/${item._id}`)
      this.list.splice(ind, 1)
      this.confirmation = false
    },
    async searchSupplies () {
      let { data } = await this.axios.get(`customer/supplies?key=${this.search}`)
      this.list = data
    }
  }


}
</script>
