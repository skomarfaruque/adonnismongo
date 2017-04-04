<template>
  <section>
    <nav class="level">
      <div class="level-left">   
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="search" placeholder="Search by Name, Email, Zip Code, City" v-model="search" @keyup.enter="searchAgent">
            </p>
            <p class="control">
              <button class="button" @click="searchAgent">
                <i class="fa fa-search"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">   
        <div class="level-item">
          <nuxt-link href="javascript:" class="button is-primary" title="Add New" to="/agent/new"> <i class="fa fa-plus"></i> </nuxt-link>
        </div>
      </div>
    </nav>
    <div class="columns">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>
              Agent Name
            </th>
            <th>
              Email
            </th>
            <th>
              City
            </th>
            <th>
              Zip Code
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
            <td>{{ item.city }}</td>
            <td>{{ item.zipCode.join(',') }}</td>
            <td class="action">
              <section v-show="confirmation === false">
                <a href="javascript:" class="button is-danger" @click="confirmation = true" title="Delete"> <i class="fa fa-trash"></i> </a>
                <nuxt-link class="button is-primary" :to="`/agent/${item._id}`" title="Edit"><i class="fa fa-pencil"></i> </nuxt-link>
                <nuxt-link class="button is-primary" :to="`/agent/calendar?id=${item._id}`" title="Edit"><i class="fa fa-calendar"></i> </nuxt-link>
              </section>
              <section v-show="confirmation">
                <a href="javascript:" class="button is-danger" @click="remove(item, ind)" title="Confirm"> <i class="fa fa-check"></i> </a>
                 <a href="javascript:" class="button is-primary" @click="confirmation = false" title="Cancel"> <i class="fa fa-times"></i> </a>
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
  
</style>
<script>
  import axios from '~/plugins/axios'
  export default {
    middleware: 'auth',
    head () {
      return {
        title: `Agent Page`
      }
    },
    fetch ({ store }) {
      store.commit('SET_HEAD', ['Agent', 'View list of the agents.'])
    },
    async data ({ store }) {
      axios.setBearer(store.state.authUser)

      let { data } = await axios.get('agents')
      return {
        list: data,
        search: '',
        confirmation: false
      }
    },
    destroyed () {
      this.confirmation = false
    },
    methods: {
      async remove (item, ind) {
        await axios.delete(`agents/${item._id}`)
        this.list.splice(ind, 1)
      },
      async searchAgent () {
        let { data } = await axios.get(`agent/search?key=${this.search}`)
        this.list = data
      }
    }
  }
</script>
