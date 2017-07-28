<template>
  <section class="container">
    <div class="column is-one-third is-offset-one-third">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-medium">
            Enter New Password
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <p class="control has-icon has-icon-right">
              <input class="input" type="password" placeholder="New Password" v-model="password" >
              <span class="icon is-small">
                <i class="fa fa-lock"></i>
              </span>
              <span class="help is-danger is-hidden">This email is invalid</span>
            </p>
            <p class="control has-icon has-icon-right">
              <input class="input" type="password" placeholder="Confirm Password" v-model="repass">
              <span class="icon is-small">
                 <i class="fa fa-lock"></i>
              </span>
              <span :class="{ 'help is-danger': true,  'is-hidden': password == repass}">Password do not match!</span>
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="javascript:" class="button is-info card-footer-item" @click="sendConfirmation">Reset</a>
        </footer>
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
  export default {
    layout: 'header-less',
    asyncData ({ axios, query }) {
      return {
        token: query.re,
        password: '',
        repass: '',
        confirmed:  false
      }
    },
    data () {
      return {
        axios: this.$root.$options.axios
      }
    },
    created () {
      if (this.pass && this.pass === '1') {
        this.sendConfirmation()
      }
    },
    methods: {
      async sendConfirmation () {
        let { data } = await this.axios.post('user/reset-password', { re: this.token, password: this.password })
        this.confirmed = data.success
      }
    }
  }
</script>
