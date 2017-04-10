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
      <scheduler />
    </div>
    <div id="custom_form" class="modal">
      <div class="modal-content">
        <div class="box">
          <div>          
            <h1 class="title">Create Appointment for {{name}}</h1>
            <div class="columns">
              <div class="column is-2">
                <label class="label">Title</label>
              </div>
              <div class="column is-10">
                <input class="input" type="text" placeholder="Appoinemnt Title" v-model="title">
              </div>
            </div>
            <div class="columns">
              <div class="column is-2">
                <label class="label">Customer</label>
              </div>
              <div class="column is-10">
                <div class="field has-addons">
                  <p class="control">
                    <input class="input" type="text" placeholder="Select Customer" v-model="customer" @input="searchCustomer($event.target.value)" @keyup.esc="isOpen = false" @blur="isOpen = false" @keydown.down="moveDown" @keydown.up="moveUp" @keydown.enter="selectOption">
                  </p>
                  <p class="control">
                    <button class="button" @click="addCustomer">
                      <i class="fa fa-plus"></i>
                    </button>
                  </p>
                </div>

                <ul class="options-list" v-show="isOpen">
                  <li v-for="(s, index) in searchedCustomers" @click="selectOption" :class="{'highlighted': index === highlightedPosition }" @mouseenter="highlightedPosition = index" @mousedown="selectOption">
                    <h3>{{s.name}}</h3>
                    <h5>{{s.email}}</h5>
                  </li>
                </ul>
              </div>
            </div>
            <div class="columns">
              <div class="column is-2">
                <label class="label">Time</label>
              </div>
              <div class="column is-10">
                <input id="start-time" class="input" type="text" v-model="block_time.work_start_time" placeholder="Appoinemnt Time">
              </div>
            </div>
          </div>
          <br>
          <div class="box">
            <div class="field">
              <p class="control block">
                <label class="checkbox">
                  <input type="checkbox" v-model="isPersonalOff">
                  Personal Off
                </label>
                <!--<label class="checkbox">
                  <input type="checkbox" v-model="isRepeat">
                  Repeat for this day
                </label>-->
              </p>
            </div>
          </div>
          <div class="level">
            <div class="level-left is-6">
              <div class="block">
                <a class="button is-info" name="save" value="Save" id="" @click="save"> Save </a>          
                <a class="button is-primary" name="close" value="Close" id="" @click="closeForm">Close</a>
              </div>
            </div>
            <div class="level-right is-6">
              <button class="button is-danger" @click="remove">Delete</button>
            </div>
          </div>
          </div>
      </div>
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
    opacity: 0.04;
  }
  .block a {
    margin-right: 10px;
  }
  #custom_form .modal-content {
    overflow: visible !important;
  }  
  #custom_form .modal-content .control:first-child {
    width: 100% !important;
  }  
  #custom_form .block label {
    margin-right: 10px;
  }
  ul.options-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 0 0 3px 3px;
    position: absolute;
    width: 78%;
    overflow: hidden;
    z-index:999;
  }

  ul.options-list li {
    width: 100%;
    flex-wrap: wrap;
    background: white;
    margin: 0;
    border-bottom: 1px solid #eee;
    color: #363636;
    padding: 7px;
    cursor: pointer;
  }

  ul.options-list li.highlighted {
    background: #f8f8f8
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
      let blockTime = agent.data.block_time ? JSON.parse(agent.data.block_time) : { days: [], work_start_time: '08:00', work_end_time: '16:00' }
      return {
        id: query.id,
        events: event.data,
        title: 'Customer Appointment',
        email: agent.data.email,
        name: agent.data.name,
        block_time: blockTime,
        allMarkedId: [],
        searchedCustomers: [],
        customer: '',
        isOpen: false,
        highlightedPosition: 0,
        isPersonalOff: false,
        isRepeat: false
      }
    },
    mounted () {
      let self = this
      axios.setBearer(this.$store.state.authUser)
      if (process.BROWSER_BUILD) {
        const flatpicker = require('flatpickr')
        let options = { enableTime: true, noCalendar: true }
        new flatpicker(document.getElementById('start-time'), options)
      }
      var custom_form = document.getElementById('custom_form')
      scheduler.showLightbox = function(id){
        var ev = scheduler.getEvent(id)
        scheduler.startLightbox(id, document.getElementById('custom_form'))
        self.title = ev.text
        self.customer = ev.customer
        let hour = `${ev.start_date.getHours()}`
        hour = ('00'+hour).substring(hour.length)
        let minute = `${ev.start_date.getMinutes()}`
        minute = ('00'+minute).substring(minute.length)
        self.block_time.work_start_time = `${hour}:${minute}`
      }
      var events = []
      this.events.forEach(m => {
        events.push({
          id: m._id,
          _id: m._id,
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
      this.title = 'Customer Appointment'
    },
    methods: {
      async save () {
        if (!this.isPersonalOff) {
          let id = scheduler.getState().lightbox_id
          let ev = scheduler.getEvent(id)
          const startTimes = this.block_time.work_start_time.split(':')
          const startMinute = parseInt(startTimes[0]) * 60 + parseInt(startTimes[1])
          ev.start_date.setHours(startTimes[0], startTimes[1])
          const obj = { agent: this.email, description: this.title, customer: this.customer, start: ev.start_date }
          let { data } = await axios.post('appointment', obj)
          ev.customer = data.customer.email
          ev.text = data.description
          ev._id = data._id
          scheduler.endLightbox(true, document.getElementById('custom_form'))
        } else {
          this.isPersonalOff = false
          scheduler.endLightbox(false, document.getElementById('custom_form'))
        }
      },
      async remove () {
        let id = scheduler.getState().lightbox_id
        let ev = scheduler.getEvent(id)
        let { date } = await axios.delete(`appointment/${ev._id}`)

        scheduler.endLightbox(false, document.getElementById('custom_form'))
        scheduler.deleteEvent(id)
      },
      closeForm () {
        this.isPersonalOff = false
        scheduler.endLightbox(false, document.getElementById('custom_form'))
      },
      async addCustomer () {
        if (this.customer) {
          const { data } = await axios.post('customers', { name: this.customer, email: this.customer })
          await axios.get(`agent/${this.id}/assign-customer/${data._id}`)
        }
      },
      async searchCustomer (value) {
        this.highlightedPosition = 0
        if (value) {
          let { data } = await axios.get(`customer/search?agent=${this.id}&key=${value}`)
          this.searchedCustomers = data || []
          this.isOpen = this.searchedCustomers.length > 0
        }
      },
      moveDown () {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition = (this.highlightedPosition + 1) % this.searchedCustomers.length
      },
      moveUp () {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition = this.highlightedPosition - 1 < 0 ? this.searchedCustomers.length - 1 : this.highlightedPosition - 1
      },
      selectOption (customer) {
        this.customer = this.searchedCustomers[this.highlightedPosition].email
        this.isOpen = false
      }
    }
  }
</script>
