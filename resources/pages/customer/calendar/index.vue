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
      <scheduler v-on:save="save" v-on:remove="remove"/>
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
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Customer Calendar', 'View customer appointments.'])
  },
  async data ({ store, query }) {
    axios.setBearer(store.state.authUser)
    let event = await axios.get(`appointment/customer/${query.id}`)
    let customer = await axios.get(`customers/${query.id}`)
    store.commit('SET_HEAD', ['Customer Calendar', `View appointments of ${customer.data.name}.`])
    return {
      id: query.id,
      events: event.data,
      email: customer.data.email
    }
  },
  mounted () {
    scheduler.config.lightbox.sections=[
      {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
      {name:"Agent", height:25, map_to:"agent", type:"textarea"},
      {name:"time", height:72, type:"time", map_to:"auto"}
    ]
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
  },
  methods: {
    async save(id, ev) {
      const obj = { agent: ev.agent, description: ev.text, customer: this.email, start: ev.start_date }
      let { data } = await axios.post('appointment', obj)
      ev.id = data.id
    },
    async remove(id) {
      await axios.delete(`appointment/${id}`)
    }
  }
}
</script>