<template>
  <section class="container">
    <div class="column is-one-third is-offset-one-third">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-medium">
            Forgot Password
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
          </div>
        </div>
        <footer class="card-footer">
          <a href="javascript:" class="button is-info card-footer-item" @click="submit">Submit</a>
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
    asyncData () {
      return {
        formError: null,
        email: 'admin@email.com'
      }
    },
    methods: {
      submit () {
        this.$store.dispatch('forgotpassword', {
          email: this.email
        })
        .then(() => {
          this.email = ''
          this.formError = null
          // this.$router.push('/')
        })
        .catch((e) => {
          this.formError = e.message
        })
      }
    }
  }  
</script>
