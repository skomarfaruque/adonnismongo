<template>
  <section>
    <div class='levels'>
      <div class='level-left'>

      </div>
      <div class='level-right'>
        <div class='level-item'>
        </div>
      </div>
    </div>
    <div class='columns'>
      <scheduler v-on:save='save' v-on:remove='remove'/>
    </div>
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
    let event = await axios.get(`appointment/agent/${query.id}`)
    let agent = await axios.get(`users/${query.id}`)
    store.commit('SET_HEAD', [`Agent Calendar`, `View appointments of ${agent.data.name}.`])
    return {
      id: query.id,
      events: event.data,
      email: agent.data.email,
      name: agent.data.name,
      block_time: JSON.parse(agent.data.block_time)
    }
  },
  mounted () {
    scheduler.config.lightbox.sections = [
      {name: 'description', height: 200, map_to: 'text', type: 'textarea', focus: true},
      {name: 'Customer', height: 25, map_to: 'customer', type: 'textarea'},
      {name: 'time', height: 72, type: 'time', map_to: 'auto'}
    ]
    var events = []
    this.events.forEach(m => {
      events.push({
        id: m._id,
        text: m.description,
        start_date: new Date(m.start_time),
        end_date: new Date(m.start_time),
        customer: m.customer.email,
        agent: m.agent.email
      })
    })
    const startTimes = this.block_time.work_start_time.split(':')
    const startMinute = startTimes[0] * 60 + startTimes[1]
    const endTimes = this.block_time.work_end_time.split(':')
    const endMinute = endTimes[0] * 60 + endTimes[1]
    let config = {
      days: this.block_time.days,
      zones: [parseInt(startMinute), parseInt(endMinute)],
      invert_zones: true
    }
    console.log(config)
    scheduler.addMarkedTimespan(this.block_time)
    scheduler.parse(events, 'json')
  },
  methods: {
    async save (id, ev) {
      const obj = { agent: this.email, description: ev.text, customer: ev.customer, start: ev.start_date }
      let { data } = await axios.post('appointment', obj)
      ev.id = data.id
    },
    async remove (id) {
      await axios.delete(`appointment/${id}`)
    }
  }
}
</script>
