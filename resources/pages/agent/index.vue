<template>
  <section>
    <div class="levels">
      <div class="level-left">   

      </div>
      <div class="level-right">   
        <div class="level-item">
          <nuxt-link href="javascript:" class="button is-primary" title="Add New" to="/agent/new"> <i class="fa fa-plus"></i> </nuxt-link>
        </div>
      </div>
    </div>
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ind) in list">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td class="action">
              <a href="javascript:" class="button is-danger" @click="remove(item, ind)" title="Delete"> <i class="fa fa-trash"></i> </a>
				      <a class="button is-primary" :href="`/agent/edit/${item._id}`" @click="edit(item, ind)" title="Edit"><i class="fa fa-pencil"></i> </a>
              <a class="button is-primary" :href="`/agent/calendar?id=${item._id}`" @click="edit(item, ind)" title="Edit"><i class="fa fa-calendar"></i> </a>
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
        title: `Agent Page`
      }
    },
    fetch ({ store }) {
      store.commit('SET_HEAD', ['Agent', 'View list of the agents.'])
    },
    async data ({ store }) {
      axios.setBearer(store.state.authUser)

      let { data } = await axios.get('users')
      return {
        list: data
      }
    },
    methods: {
      remove (item, ind) {

      },
      edit (item, ind) {

      }
    }
  }
</script>
