<template>
  <header>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <figure class="icon" style="margin-right: 8px;">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </figure>
            Back Portal
          </a>
          <nuxt-link class="nav-item is-tab is-hidden-mobile is-active" to="/dashboard">Home</nuxt-link>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab is-hidden-tablet is-active">Home</a>
          <nuxt-link class="nav-item is-tab" to="/user/profile/me">
            <figure class="icon" style="margin-right: 2px;">
              <i class="fa fa-user" aria-hidden="true"></i>
            </figure>
            Profile
          </nuxt-link>
          <a href="javascript:" class="nav-item is-tab" @click="logout">Log out</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>
