<template>
  <section>
    <nav class="level">
      <div class="level-left">   
        <div class="level-item">
          <div class="columns">
            <div class="column is-full">
              <div class="field has-addons">
                <p class="control has-icon has-icon-right">
                  <input v-validate="'email'" class="input" type="email" placeholder="Select Customer" name="customer" v-model="customer" @input="searchCustomer($event.target.value)" @keyup.esc="isOpen = false" @blur="isOpen = false" @keydown.down="moveDown" @keydown.up="moveUp" @keydown.enter="selectOption">
                  <span class="help is-danger" v-show="errors.has('customer')" >{{ errors.first('customer') }}</span>
                </p>
                <p class="control">
                  <button class="button" @click="addCustomer">
                    <i class="fa fa-plus"></i>
                  </button>
                </p>
              </div>

              <ul class="options-list" v-show="isOpen">
                <li v-for="(s, index) in searchedCustomers" @click="selectOption" :class="{'highlighted': index === highlightedPosition }" @mouseenter="highlightedPosition = index" @mousedown="selectOption">
                  <h3>{{s.name}}</h3>
                  <h5>{{s.email}}</h5>
                </li>
              </ul>
            </div>         
          </div>
        </div>
      </div>
      <div class="level-right">
      </div>
    </nav>
    <div class="columns">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>
              Customer Name
            </th>
            <th>
              Email
            </th>
            <th>
              Zip Code
            </th>
            <th>
              City
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ind) in list">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.zipCode }}</td>
            <td>{{ item.city }}</td>
            <td class="action">
              <section v-show="confirmation === false">
                <a href="javascript:" class="button is-danger" @click="confirmation = true" title="Delete"> <i class="fa fa-trash"></i> </a>
                <nuxt-link class="button is-info" :to="`/customer/${item._id}`" title="Edit"><i class="fa fa-pencil"></i> </nuxt-link>
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
<style>
  td.action {
    text-align: center;
  }
  td.action a {
    margin: 0 5px 0 5px;
  }
</style>
<script>
  import axios from '~/plugins/axios'
  export default {
    middleware: 'auth',
    head () {
      return {
        title: `Customer Page`
      }
    },
    async data ({ store, query }) {
      store.commit('SET_HEAD', ['Agent Customers', 'View and add customers.'])
      axios.setBearer(store.state.authUser)
      let { data } = await axios.get(`agent/${query.id}/customer`)
      return {
        id: query.id,
        list: data,
        search: '',
        confirmation: false,
        searchedCustomers: [],
        customer: '',
        isOpen: false,
        highlightedPosition: 0
      }
    },
    created () {
      axios.setBearer(this.$store.state.authUser)
    },
    destroyed () {
      this.list = []
      this.confirmation = false
    },
    methods: {
      async remove (item, ind) {
        await axios.delete(`customers/${item._id}?agent=${this.id}`)
        this.list.splice(ind, 1)
        this.confirmation = false
      },
      async addCustomer () {
        if (this.customer && !this.errors.has('customer')) {
          const { data } = await axios.post('customers', { name: this.customer, email: this.customer })
          await axios.get(`agent/${this.id}/assign-customer/${data._id}`)
          this.list.push(data)
          this.isAdded = true
        }
      },
      async searchCustomer (value) {
        this.highlightedPosition = 0
        this.isAdded = false
        if (value) {
          let { data } = await axios.get(`customer/search?agent=${this.id}&key=${value}&excl=1`)
          this.searchedCustomers = data || []
          this.isOpen = this.searchedCustomers.length > 0
        }
      },
      moveDown () {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition = (this.highlightedPosition + 1) % this.searchedCustomers.length
      },
      moveUp () {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition = this.highlightedPosition - 1 < 0 ? this.searchedCustomers.length - 1 : this.highlightedPosition - 1
      },
      selectOption (customer) {
        this.customer = this.searchedCustomers[this.highlightedPosition].email
        this.isOpen = false
      }
    }
  }
</script>
