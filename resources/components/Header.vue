<template>
  <header>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <nuxt-link class="nav-item" to="/dashboard">
            <img src="../assets/img/logo.png" alt="Bulma logo">
          </nuxt-link>
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
          <nuxt-link class="button is-info nav-item is-tab cardicon" title="cart" to="/storeinfo/agent/cart"><i class="fa fa-shopping-cart"></i><span>9{{cartVal()}}</span></nuxt-link> 
        </div>
      </div>
    </nav>
  </header>
</template>
<style scoped>
  .cardicon {
    margin-top: 8px;
  }
  .cardicon i {
    font-size: 25px;
  }
  .cardicon span[data-v-e7863304] {
    border-radius: 50%;
    padding: 0px 4px;
    font-size: 11px;
    margin-top: -13px;
    background-color: red;
  }
</style>
<script>
  export default {
    async asyncData ({ store, axios }) {
    store.commit('SET_HEAD', ['Store', 'Store items.'])
    let { data } = await axios.post('storeinfo/cartitem')
    return {
      list: data,
      search: 0,
      confirmation: false
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      },
       cartVal (){
        return this.search
      }
    }
  }
</script>
