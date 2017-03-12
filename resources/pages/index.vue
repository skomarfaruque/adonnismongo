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
              <input class="input" type="text" placeholder="Email input" value="hello@">
              <span class="icon is-small">
                <i class="fa material-icons">email</i>
              </span>
              <span class="help is-danger is-hidden">This email is invalid</span>
            </p>
            <p class="control has-icon has-icon-right">
              <input class="input" type="password" placeholder="Password" value="hello@">
              <span class="icon is-small">
                <i class="fa material-icons">vpn_key</i>
              </span>
              <span class="help is-danger is-hidden">Email and Password do not match!</span>
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="javascript:" class="button is-primary card-footer-item" @click="signin">Sign in</a>
          <a href="javascript:" class="button is-primary card-footer-item">Forgot Password</a>
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
  import axios from '~/plugins/axios'

  export default {
    layout: 'header-less',
    // async data() {
    //   let { data } = await axios.get(`api/users`)
    //   return {
    //     list: data
    //   }
    // }
    methods: {
      signin () {
        this.$router.push({ path: '/about'} )
      }
    }
  }  
</script>
