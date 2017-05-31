<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <div class="columns">
          <div class="column is-3 is-offset-2">
          </div>
          <div class="column is-3">
          </div>
          <div class="column is-2">
            Price
          </div>
          <div class="column is-2">
            Quantity
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-12">
        <div class="columns">
          <div class="column is-3 is-offset-2">
            <img src="/item_image/Shirt_back.png" alt="" style="max-width: 150px;max-height: 150px;">
          </div>
          <div class="column is-3 shopitem">
            <span>Mens Shirt - Size M</span>
          </div>
          <div class="column is-2 shopitem">
            <span>$19.99</span>
          </div>
          <div class="column is-2 shopitem">
            <span>2</span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <div class="columns">
          <div class="column is-3 is-offset-2">
            <img src="/item_image/Shirt_back.png" alt="" style="max-width: 150px;max-height: 150px;">
          </div>
          <div class="column is-3 shopitem">
            <span>Mens Shirt - Size M</span>
          </div>
          <div class="column is-2 shopitem">
            <span>$19.99</span>
          </div>
          <div class="column is-2 shopitem">
            <span>2</span>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <div class="columns">
          <div class="column is-3 is-offset-2">
            <img src="/item_image/Shirt_back.png" alt="" style="max-width: 150px;max-height: 150px;">
          </div>
          <div class="column is-3 shopitem">
            <span>Mens Shirt - Size M</span>
          </div>
          <div class="column is-2 shopitem">
            <span>$19.99</span>
          </div>
          <div class="column is-2 shopitem">
            <span>2</span>
          </div>
        </div>
      </div>
    </div>

    <div class="columns subtotal">
      <div class="column is-12">
        <div class="columns">
          <div class="column is-3 is-offset-2">
          </div>
          <div class="column is-3">
          </div>
          <div class="column is-2">
          </div>
          <div class="column is-2 ">
            Subtotal:$159.99
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .float-right {
    text-align: right;
  }
  .shopitem span {
    margin-top: 5%;
    position: absolute;
  }
</style>
<script>

export default {
  middleware: 'auth',
  head () {
    return {
      title: `Cart page`
    }
  },
  async asyncData ({ store, axios }) {
    store.commit('SET_HEAD', ['Cart', 'Finalize Purchase'])
    let { data } = await axios.get('storeinfo')
    return {
      list: data,
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  
  methods: {
    
  }


}
</script>
