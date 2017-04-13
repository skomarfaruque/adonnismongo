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
              <input class="input" type="password" placeholder="New Password">
              <span class="icon is-small">
                <i class="fa material-icons">vpn_key</i>
              </span>
              <span class="help is-danger is-hidden">This email is invalid</span>
            </p>
            <p class="control has-icon has-icon-right">
              <input class="input" type="password" placeholder="Confirm Password">
              <span class="icon is-small">
                <i class="fa material-icons">vpn_key</i>
              </span>
              <span class="help is-danger is-hidden">Email and Password do not match!</span>
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="javascript:" class="button is-info card-footer-item">Confirm</a>
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
    layout: 'header-less'
  }
</script>
