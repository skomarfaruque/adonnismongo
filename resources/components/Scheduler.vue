<template>
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
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>
    
  </div>
</template>

<style>

  #scheduler_here {
    height:600px;
    border-style: solid;
    border-color: #CECECE;
    border-width: 1px 1px 0 1px;
  }
  .dhx_cal_event.dhx_cal_select_menu {
    z-index: 9;
  }
</style>

<script>
  export default {
    asyncData () {
      return {
      }
    },
    mounted () {
      scheduler.config.hour_date = "%h:%i %A"
      scheduler.config.time_step = 15
      scheduler.config.event_duration = 120
      scheduler.config.auto_end_date = true
      scheduler.config.first_hour = 9;
      // scheduler.config.last_hour = 17;
      scheduler.config.details_on_create = true;
      scheduler.init('scheduler_here', new Date(), 'month')
      scheduler.config.max_month_events = 4
      scheduler.templates.month_events_link = function (date, count) {
        return '<a style="padding-right:5px;">+ ' + (count - 4) + ' events </a>'
      }
      scheduler.attachEvent('onEventSave', this.save)
      scheduler.attachEvent('onEventDeleted', this.remove)
    },
    destroyed () {
      scheduler.clearAll()
    },
    methods: {
      save (id, ev) {
        this.$emit('save', id, ev)
        return true
      },
      remove (id) {
        this.$emit('remove', id)
        return true
      }
    }
  }
</script>
