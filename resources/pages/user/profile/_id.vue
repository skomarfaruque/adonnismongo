<template>
  <section>
    <div class="columns">
      <div class="column is-7">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" type="text" v-model="user.name" placeholder="Name">
        </p>
        <label class="label">Email</label>
        <p class="control">
          <input class="input" type="email" v-model="user.email" placeholder="Email">
        </p>
        <label class="label">Address</label>
        <p class="control">
          <input class="input" type="text" v-model="user.address" placeholder="Address Line">
        </p>
        <a href="javascript:" class="button is-primary">Save Information</a>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    middleware: 'auth',
    head () {
      return {
        title: `Profile Page`
      }
    },
    fetch ({ store }) {
      store.commit('SET_HEAD', ['Profile', 'Personal Information.'])
    },
    async data ({ store, params }) {
      axios.setBearer(store.state.authUser)
      let { data } = await axios.get('users/me')
      return {
        user: data
      }
    }
  }

</script>
