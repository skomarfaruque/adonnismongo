<template>
  <section class="hero breadcrumb">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{heading.title}}
        </h1>
        <h2 class="subtitle">
          {{heading.subtitle}}
        </h2>
        <h2 class="subtitle">
          {{cartItem}}
        </h2>
      </div>
    </div>
  </section>
</template>

<style>
  .breadcrumb .hero-body {
    padding-top: 1.5rem;
    padding-bottom: 2rem;
  }
</style>
<script>
  import { mapState } from 'vuex'
  export default {
    computed: mapState(['heading','cartItem'])
  }
</script>
