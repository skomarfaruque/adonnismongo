<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" v-model="name" type="text" placeholder="Agent Name">
        </p>
        <label class="label">Email</label>
        <p class="control">
          <input class="input" v-model="email" type="text" placeholder="Email">
        </p>
        <a href="javascript:" class="button is-primary" @click="sendInvitation">Send Invitation</a>
      </div>
    </div>

    <div class="card" v-show="confirmation.length > 0">
      <div class="title">
        This link will be sent to email for confirmation: (For testing purpose)
      </div>
      <div class="subtitle">
        <a :href="confirmation" target="_blank">Confirmation Link</a>
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
        title: `New Agent Page`
      }
    },
    fetch ({ store }) {
      store.commit('SET_HEAD', ['New Agent', 'Create an agent.'])
    },
    data ({ store }) {
      axios.setBearer(store.state.authUser)
      return {
        name: '',
        email: '',
        confirmation: ''
      }
    },
    methods: {
      async sendInvitation () {
        let { data } = await axios.post('user/invitation', this.$data)
        this.confirmation = data
      }
    }
  }

</script>
