<template>
  <section class="container">
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
              <input class="input" type="email" placeholder="Email input" v-model="email">
              <span class="icon is-small">
                <i class="fa material-icons">email</i>
              </span>
              <span class="help is-danger is-hidden">This email is invalid</span>
            </p>
            <p class="control has-icon has-icon-right">
              <input class="input" type="password" placeholder="Password" v-model="password">
              <span class="icon is-small">
                <i class="fa material-icons">vpn_key</i>
              </span>
              <span class="help is-danger is-hidden">Email and Password do not match!</span>
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="javascript:" class="button is-primary card-footer-item" @click="login">Sign in</a>
          <a href="javascript:" class="button is-primary card-footer-item">Forgot Password</a>
        </footer>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .card {
    margin-top: 120px;
    margin-bottom: 100px;
  }
  .card-footer {
    padding: 10px;
  }
</style>
<script>    
  export default {
    layout: 'header-less',
    data () {
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
