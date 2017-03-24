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
    store.commit('SET_HEAD', ['Agent Calendar', 'View agents appointments.'])
  },
  data ({ store, query }) {
    axios.setBearer(store.state.authUser)
    return {
      id: query.id
    }
  },
  mounted () {
    // scheduler.config.xml_date="%Y-%m-%d %H:%i"
		scheduler.init('scheduler_here',new Date(),"month")
    scheduler.config.lightbox.sections=[
      {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
      {name:"Customer", height:25, map_to:"customer", type:"textarea"},
      {name:"time", height:72, type:"time", map_to:"auto"}
    ]
    var events = [
      {id:1, text:"Meeting",   start_date:"04/11/2017 14:00",end_date:"04/11/2017 17:00"},
      {id:2, text:"Conference",start_date:"04/15/2017 12:00",end_date:"04/15/2017 19:00"},
      {id:3, text:"Interview", start_date:"04/24/2017 09:00",end_date:"04/24/2017 10:00"}
    ]
    scheduler.config.max_month_events = 4
    scheduler.templates.month_events_link = function(date, count){
        return "<a style='padding-right:5px;'>+ "+(count - 4)+" events </a>";
    }
    scheduler.attachEvent("onEventSave", this.save)

    scheduler.parse(events, "json")
  },
  methods: {
    async save(id, ev) {
      const obj = { description: ev.text, customer: ev.customer, start: ev.start_date }
      let event = await axios.post('appointment', obj)
      ev.id = event.id
    }
  }
}
</script>