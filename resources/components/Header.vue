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
           <span v-if="userType==='Agent'">
          <nuxt-link v-if="cartItem > 0 " class="button is-info nav-item is-tab cardicon" title="cart" to="/storeinfo/agent/cart"><i class="fa fa-shopping-cart"></i><span>{{cartItem}}</span></nuxt-link>
<nuxt-link v-else class="button is-info nav-item is-tab cardicon" title="cart" to="/storeinfo/agent"><i class="fa fa-shopping-cart"></i><span>{{cartItem}}</span></nuxt-link></span>
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
  .cardicon span {
    border-radius: 50%;
    padding: 0px 4px;
    font-size: 11px;
    margin-top: -13px;
    background-color: red;
  }
</style>
<script>
import { mapState } from 'vuex'
  export default {
    data () {
      return {
        cart:'',
        search: 0,
        confirmation: false,
        axios: this.$root.$options.axios,
        userType: this.$store.state.role
      }
    },
    mounted () {
      let self = this
      this.axios.get('store/cart')
        .then(obj => {
          self.$store.commit('SET_CART_ITEM', obj.data?obj.data.items.length:0)
          self.cart = obj.data.items.length
        })
        .catch(function (err) {
          // console.log(err)
        })
    },
computed: mapState(['heading','cartItem']),
    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      },
      cartVal () {
        return this.search
      }
    }
  }
</script>
