<template>
  <section class="container">
    <div class="column is-half is-offset-one-quarter">
      <div class="card" v-if="!confirmed">
        <header class="card-header">
          <p class="card-header-title is-medium">
            Enter New Password
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <p class="control has-icon has-icon-right">
              <input class="input" type="password" v-model="password" placeholder="New Password">
              <span class="icon is-small">
                <i class="fa fa-lock"></i>
              </span>
              <span class="help is-danger is-hidden">This email is invalid</span>
            </p>
            <p class="control has-icon has-icon-right">
              <input class="input" type="password" placeholder="Confirm Password">
              <span class="icon is-small">
                <i class="fa fa-lock"></i>
              </span>
              <span class="help is-danger is-hidden">Email aSnd Password do not match!</span>
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="javascript:" class="button is-primary card-footer-item" @click="sendConfirmation">Confirm</a>
        </footer>
      </div>
      <div class="card box" v-else>
        <h1 class="title">
          Confirmed!
        </h1>
        <h2 class="subtitle">
          Your account is now confirmed and you can sign in from <a href="/">here</a>
        </h2>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .card {
    margin-top: 120px;
  }
  .card-footer {
    padding: 10px;
  }
</style>

<script>
  import axios from '~/plugins/axios'
  export default {
    layout: 'header-less',
    data ({ query }) {
      return {
        token: query.token,
        password: '',
        pass: query.pass,
        confirmed:  false
      }
    },
    created () {
      if (this.pass && this.pass === '1') {
        this.sendConfirmation()
      }
    },
    methods: {
      async sendConfirmation () {
        let { data } = await axios.post('user/signup/cofirmation', { token: this.token, password: this.password })
        this.confirmed = data.success
      }
    }
  }
</script>
