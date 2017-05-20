<template>
  <section class="container">
    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <img class="logo" src="../assets/img/logo.png" alt="">
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-medium">
              Sign in
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p class="control has-icon has-icon-right">
                <input class="input" type="email" name="email" placeholder="Email input" v-model="email">
                <span class="icon is-small">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <span class="help is-danger is-hidden">This email is invalid</span>
              </p>
              <p class="control has-icon has-icon-right">
                <input class="input" type="password" name="password" placeholder="Password" v-model="password">
                <span class="icon is-small">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
                <span class="help is-danger is-hidden">Email and Password do not match!</span>
              </p>
            </div>
          </div>
          <footer class="card-footer">
            <a href="javascript:" class="button is-info card-footer-item" @click="login">Sign in</a>
            <nuxt-link class="button is-info card-footer-item" to="/user/forgotpassword">Forgot Password</nuxt-link>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
  img.logo {
    margin-top: 40px;
  }
  .card {
    margin-top: 10px;
    margin-bottom: 100px;
  }
  .card-footer {
    padding: 10px;
  }
  .card-footer-item {
    margin-left: 5px;
    margin-right: 5px;
  }

</style>
<script>
  export default {
    layout: 'header-less',
    asyncData () {
      return {
        formError: null,
        email: 'admin@email.com',
        password: '123456'
      }
    },
    methods: {
      login () {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.email = ''
          this.password = ''
          this.formError = null
          this.$router.push('/dashboard')
        })
        .catch((e) => {
          this.formError = e.message
        })
      }
    }
  }  
</script>
