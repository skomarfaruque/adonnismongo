{{{{raw}}}}
<template>
  <div>
    <my-header/>
    <div class="container">
      
      <div class="columns">
      </div>
      <div class="columns">
        <div class="column is-full">
          <Breadcrumb />
          <nuxt/>
        </div>
      </div>
    </div>
    <my-footer/>
  </div>
</template>
{{{{/raw}}}}
<style scoped>
  .need-help {
    margin-top: 30px;
  }
</style>

<script>
import MyHeader from '~components/Header.vue'
import MyFooter from '~components/Footer.vue'
import Wanthelp from '~components/Wanthelp.vue'
import Breadcrumb from '~components/Breadcrumb.vue'

export default {
  components: {
    MyHeader,
    MyFooter,
    Wanthelp,
    Breadcrumb
  }
}
</script>

