<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" v-model="name" type="text" placeholder="Staff Name">
        </p>
        <label class="label">Email</label>
        <p class="control">
          <input class="input" v-model="email" type="text" placeholder="Email">
        </p>
        <a href="javascript:" class="button is-info" @click="sendInvitation">Send Invitation</a>
      </div>
    </div>

    <div class="card" v-show="confirmation.length > 0">
      <div class="title">
        A confirmation link has been sent to email.
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
        title: `New Staff Page`
      }
    },
    fetch ({ store }) {
      store.commit('SET_HEAD', ['Admin - New Staff', 'Invite a staff to join.'])
    },
    data ({ store }) {
      axios.setBearer(store.state.authUser)
      return {
        name: '',
        email: '',
        role: 'Staff',
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
