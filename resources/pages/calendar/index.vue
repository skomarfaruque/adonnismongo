<template>
  <section class="columns">
   <scheduler />
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import Scheduler from '~components/Scheduler.vue'
export default {
  middleware: '',
  components: {
    Scheduler
  },
  head () {
    return {
      title: `Calendar`      
    }
  },
  async data ({ store, query }) {
    axios.setBearer(store.state.authUser)
    let event = await axios.get(`appointment/agent/me`)
    let agent = await axios.get(`users/me`)
    store.commit('SET_HEAD', [`Your Calendar`, 'View appointments.'])
    return {
      id: query.id,
      events: event.data
    }
  },
  mounted () {
    var events = []
    this.events.forEach(m => {
      events.push( {
        id: m._id,
        text: m.description,
        start_date: new Date(m.start_time),
        end_date: new Date(m.start_time),
        customer: m.customer.email,
        agent: m.agent.email
      }) 
    })
    scheduler.parse(events, "json")
  }
}
</script>
