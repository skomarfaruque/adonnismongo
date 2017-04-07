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
<style>
  .gray {
    background-color: gray
  }
  		/* enabling marked timespans for month view */
  .dhx_scheduler_month .dhx_marked_timespan {
    display: block;
  }
  /* style to display special dates, e.g. holidays */
  .holiday {
    background-color: #fadcd3;
    text-align: center;
    font-size: 24px;
    opacity: 0.8;
    color: #e2b8ac;
  }
  .green {
    background-color: rgba(173, 255, 47, 0.05);
    text-align: center;
    font-size: 24px;
    opacity: 0.8;
    color: green;
  }

  .fat_lines_section {
			background-image: url(/calendar/imgs/fat_lines.png);
      opacity: 0.05;
		}

</style>
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
      block_time: JSON.parse(agent.data.block_time),
      allMarkedId: []
    }
  },
  mounted () {
    axios.setBearer(this.$store.state.authUser)
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
    const startMinute = parseInt(startTimes[0]) * 60 + parseInt(startTimes[1])
    const endTimes = this.block_time.work_end_time.split(':')
    const endMinute = parseInt(endTimes[0]) * 60 + parseInt(endTimes[1])
    let offDay = {
      days: this.block_time.days,
      zones: 'fullday',
      css: 'holiday',
      html: 'Personal Off',
      type: 'dhx_time_block'
    }
    let difference = [0, 1, 2, 3, 4, 5, 6].filter(x => this.block_time.days.indexOf(x) === -1)
    // let workingHour = {
    //   days: difference,
    //   zones: [startMinute, endMinute],
    //   css: 'green'
    // }
    let offHour = {
      days: difference,
      zones: [startMinute, endMinute],
      invert_zones: true,
      type: 'dhx_time_block',
      css: 'fat_lines_section'
    }
    scheduler.parse(events, 'json')
    // scheduler.addMarkedTimespan(workingHour)
    let id1 = scheduler.addMarkedTimespan(offHour)
    this.allMarkedId.push(offDay)
    let id2 = scheduler.addMarkedTimespan(offDay)
    this.allMarkedId.push(offHour)
    scheduler.updateView()
  },
  destroyed () {
    this.events = []
    this.allMarkedId.forEach((e) => {
      scheduler.deleteMarkedTimespan(e)
    })
    this.block_time = {}
    this.allMarkedId = []
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
