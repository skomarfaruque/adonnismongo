<template>
  <section>
    <agent-calendar :id="id" />
  </section>
</template>

<script>
  import AgentCalendar from '~components/AgentCalendar.vue'
  export default {
    middleware: '',
    components: {
      AgentCalendar
    },
    head () {
      return {
        title: `Calendar`
      }
    },
    data () {
      return {
        id: 'me',
        block_time: {}
      }
    }
  }
</script>
