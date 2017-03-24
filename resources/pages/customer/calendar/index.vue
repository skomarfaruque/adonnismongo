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
      <div id="scheduler_here" class="column is-full dhx_cal_container">
        <div class="dhx_cal_navline">
          <div class="dhx_cal_prev_button">&nbsp;</div>
          <div class="dhx_cal_next_button">&nbsp;</div>
          <div class="dhx_cal_today_button"></div>
          <div class="dhx_cal_date"></div>
          <div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
          <div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
          <div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
        </div>
        <div class="dhx_cal_header">
        </div>
        <div class="dhx_cal_data">
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>

  #scheduler_here {
    height:600px;
    border-style: solid;
    border-color: #CECECE;
    border-width: 1px 1px 0 1px;
  }
</style>
<script>
import axios from '~/plugins/axios'
export default {
  middleware: '',
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
    let customer = await axios.get(`customer/${query.id}`)
    return {
      id: query.id,
      events: event.data,
      email: customer.data.email
    }
  },
  mounted () {
    // scheduler.config.xml_date="%Y-%m-%d %H:%i"
		scheduler.init('scheduler_here',new Date(),"month")
    scheduler.config.lightbox.sections=[
      {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
      {name:"Agent", height:25, map_to:"agent", type:"textarea"},
      {name:"time", height:72, type:"time", map_to:"auto"}
    ]
    scheduler.config.max_month_events = 4
    scheduler.templates.month_events_link = function(date, count) {
        return "<a style='padding-right:5px;'>+ "+(count - 4)+" events </a>";
    }
    scheduler.attachEvent('onEventSave', this.save)
    scheduler.attachEvent('onEventDeleted', this.remove)
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