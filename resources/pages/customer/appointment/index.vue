<template>
  <section>
    <div class="levels">
      <div class="level-left">

      </div>
      <div class="level-right">
        <div class="level-item">
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h2 class="subtitle">
          Upcoming Appointents
        </h2>
        <hr>
        <ul>
          <li class="box is-full" v-for="e in upcoming">
            <h2>Agent Name: {{e.name}}</h2> 
            Appointment Date: {{e.time}}
          </li>
          <li class="title has-text-centered" v-if="upcoming.length === 0">
            Nothing to show.
          </li>
        </ul>
      </div>
      <div class="column">
        <h2 class="subtitle">
          Past Appointents
        </h2>
        <hr>
        <ul>
          <li class="box is-full" v-for="e in past">
            <h2>Agent Name: {{e.name}}</h2> 
            Appointment Date: {{e.time}}
          </li>
          <li class="title has-text-centered" v-if="past.length === 0">
            Nothing to show.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Scheduler from '~components/Scheduler.vue'
export default {
  middleware: '',
  components: {
    Scheduler
  },
  head () {
    return {
      title: `Appointments`
    }
  },
  async asyncData ({ store, axios, query }) {
    
    let event = await axios.get(`appointment/customer/${query.id}`)
    let customer = await axios.get(`customers/${query.id}`)
    store.commit('SET_HEAD', ['Customer Appointents', `View appointments of ${customer.data.name}.`])
    let upcoming = []
    let past = []
    event.data.forEach(e => {
      let evDate = new Date(e.start_time)
      let ev = {
        name: e.agent.name,
        time: `${evDate.toLocaleDateString()} ${evDate.toLocaleTimeString()}`
      }
      if (evDate >= new Date()) {
        upcoming.push(ev)
      } else {
        past.push(ev)
      }
    })
    return {
      id: query.id,
      upcoming,
      past,
      email: customer.data.email
    }
  }
}
</script>
