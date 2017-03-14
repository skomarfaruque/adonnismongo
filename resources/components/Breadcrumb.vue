<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{heading.title}}
        </h1>
        <h2 class="subtitle">
          {{heading.subtitle}}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: mapState(['heading'])
  }
</script>
