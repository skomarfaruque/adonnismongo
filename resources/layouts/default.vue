{{{{raw}}}}
<template>
  <div>
    <my-header/>
    <div class="container">
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

<script>
import MyHeader from '~components/Header.vue'
import MyFooter from '~components/Footer.vue'
import Breadcrumb from '~components/Breadcrumb.vue'

export default {
  components: {
    MyHeader,
    MyFooter,
    Breadcrumb
  }
}
</script>

