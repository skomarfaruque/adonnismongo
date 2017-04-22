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
        <div class="box" v-if="!isCustomer"> 
          <h1 class="title">Create Appointment for {{name}}</h1>
          <div class="box">          
           
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
                  <p class="control has-icon has-icon-right">
                    <input v-validate="'required|email'" class="input" type="email" placeholder="Select Customer" name="customer" v-model="customer" @input="searchCustomer($event.target.value)" @keyup.esc="isOpen = false" @blur="isOpen = false" @keydown.down="moveDown" @keydown.up="moveUp" @keydown.enter="selectOption">
                    <span class="icon is-small" v-if="isAdded">
                      <i class="fa fa-check" aria-hidden="true"></i>
                    </span>
                    <span class="help is-success" v-if="isAdded">Customer with this email has added to your profile!</span>
                    <span class="help is-danger" v-show="errors.has('customer')" >{{ errors.first('customer') }}</span>
                  </p>
                  <p class="control">
                    <button class="button" @click="isCustomer=true">
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
              <div class="column is-4">
                <input id="start-time" class="input" type="text" v-model="block_time.work_start_time" placeholder="Appoinemnt Time">
              </div>
              <div class="column is-2 has-text-centered">
                <label class="label">To</label>
              </div>
              <div class="column is-4">
                <input id="end-time" class="input" type="text" v-model="block_time.work_end_time" placeholder="Appoinemnt Time">
              </div>
            </div>
            <div class="columns">
              <div class="column is-2">
                <label class="label">Comment</label>
              </div>
              <div class="column is-10">
                <textarea class="input" type="text" style="height:70px" v-model="comment"></textarea>
              </div>
            </div>
          </div>
          <div class="level">
            <div class="level-left is-6">
              <div class="block">
                <a class="button is-info" name="save" value="Save" id="" @click="save"> Save </a>          
                <a class="button is-info" name="close" value="Close" id="" @click="closeForm">Close</a>
              </div>
            </div>
            <div class="level-right is-6">
              <button class="button is-danger" @click="remove">Delete</button>
            </div>
          </div>
        </div>
        <div class="box" v-if="isCustomer">
          <h2 class="title">Create Customer</h2>
          <div class="box">
            <div class="columns">
              <div class="column is-6">
                <label for="" class="label">Email Address</label>
                <p><input class="input" type="text" v-model="customer"></p>
                <label for="" class="label">Name</label>
                <p><input class="input" type="text"></p>
                <label for="" class="label">Cell Phone</label>
                <p><input class="input" type="text"></p>
                <label for="" class="label">Address</label>
                <p><textarea class="textarea" style="min-height:60px !important"></textarea></p>
              </div>
              <div class="column is-6">
                <label for="" class="label">Zip</label>
                <p><input class="input" type="text"></p>
                <label for="" class="label">City</label>
                <p><input class="input" type="text"></p>
                <label for="" class="label">Country</label>
                <p><input class="input" type="text"></p>
                <label for="" class="label">State</label>
                <p><input class="input" type="text"></p>
              </div>
            </div>
          </div>
          <div class="level">
            <div class="level-left is-6">
              
            </div>
            <div class="level-right is-6 block">
              <a class="button is-info" @click="addCustomer">Save</a>
              <a class="button is-info" @click="isCustomer=false">Cancel</a>
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
    font-size: 14px;
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
  .block a:first-child {
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
</style>
<script>
  import Scheduler from '~components/Scheduler.vue'
  export default {
    middleware: 'auth',
    components: {
      Scheduler
    },
    head () {
      return {
        title: `Calendar`
      }
    },
    async asyncData ({ store, axios, query }) {
      const id = query.id || 'me'
      let agent = await axios.get(`users/${id}`)
      let event = await axios.get(`appointment/agent/${agent.data._id}`)

      let blockDays = await axios.get(`agent/${agent.data._id}/block-dates`)
      store.commit('SET_HEAD', [`Agent Calendar`, `View appointments of ${agent.data.name}.`])
      let blockTime = agent.data.block_time ? JSON.parse(agent.data.block_time) : [{ day: false, start: '09:00', end: '17:00' }]
      return {
        id: agent.data._id,
        events: event.data,
        comment: '',
        blockDays: blockDays.data,
        title: 'Scanning Session',
        email: agent.data.email,
        name: agent.data.name,
        block_time: blockTime,
        allMarkedId: [],
        searchedCustomers: [],
        customer: '',
        isCustomer: false,
        isOpen: false,
        highlightedPosition: 0,
        isPersonalOff: false,
        isAdded: false
      }
    },
    data () {
      return {
        axios: this.$root.$options.axios
      }
    },
    mounted () {
      let self = this
      if (process.BROWSER_BUILD) {
        const flatpicker = require('flatpickr')
        let options = { allowInput: true, enableTime: true, noCalendar: true } // , dateFormat: 'h:i K'
        new flatpicker(document.getElementById('start-time'), options)
        new flatpicker(document.getElementById('end-time'), options)
      }
      var custom_form = document.getElementById('custom_form')
      scheduler.showLightbox = function(id){
        var ev = scheduler.getEvent(id)
        scheduler.startLightbox(id, document.getElementById('custom_form'))
        self.title = ev.text
        self.customer = ev.customer
        let timeFormat = (date) => {
          let hour = `${date.getHours()}`
          hour = ('00'+hour).substring(hour.length)
          let minute = `${date.getMinutes()}`
          minute = ('00'+minute).substring(minute.length)
          return `${hour}:${minute}`
        }
        self.block_time.work_start_time = timeFormat(ev.start_date)
        self.block_time.work_end_time = timeFormat(ev.end_date)
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
      this.block_time.forEach((b, i) => {
        let off
        if (typeof b.day === 'number') {
          off = {
            days: b.day,
            zones: 'fullday',
            css: 'holiday',
            html: 'Personal Off',
            type: 'dhx_time_block'
          }
        } else {
          const startTimes = b.start.split(':')
          const startMinute = parseInt(startTimes[0]) * 60 + parseInt(startTimes[1])
          const endTimes = b.end.split(':')
          const endMinute = parseInt(endTimes[0]) * 60 + parseInt(endTimes[1])
          off = {
            days: i,
            zones: [startMinute, endMinute],
            invert_zones: true,
            type: 'dhx_time_block',
            css: 'fat_lines_section'
          }          
        }
        scheduler.addMarkedTimespan(off)
        self.allMarkedId.push(off)
      })

      
      this.blockDays.forEach((b) => {
        let day = {
          days: new Date(b.blockDate),
          zones: 'fullday',
          css: 'holiday',
          html: 'Personal Off',
          type: 'dhx_time_block'
        }
        scheduler.addMarkedTimespan(day)
        self.allMarkedId.push(day)
      })
      
      scheduler.parse(events, 'json')
      // scheduler.addMarkedTimespan(workingHour)
      
      
      // scheduler.addMarkedTimespan(offDay)

      scheduler.updateView()
    },
    destroyed () {
      this.events = []
      this.allMarkedId.forEach((e) => {
        scheduler.deleteMarkedTimespan(e)
      })
      this.block_time = {}
      this.allMarkedId = []
      this.title = 'Scanning Session'
    },
    methods: {
      async save () {
        let id = scheduler.getState().lightbox_id
        let ev = scheduler.getEvent(id)
        if (!this.isPersonalOff) {
          if (this.errors.any()) {
            return
          }
          const startTimes = this.block_time.work_start_time.split(':')
          const startMinute = parseInt(startTimes[0]) * 60 + parseInt(startTimes[1])
          ev.start_date.setHours(startTimes[0], startTimes[1])
          const obj = { agent: this.email, description: this.title, customer: this.customer, start: ev.start_date }
          let { data } = await this.axios.post('appointment', obj)
          ev.customer = data.customer.email
          ev.text = data.description
          ev._id = data._id
          scheduler.endLightbox(true, document.getElementById('custom_form'))
        } else {
          this.isPersonalOff = false
          this.isAdded = false
          await this.axios.get(`agent/${this.id}/block-date/${ev.start_date.toISOString()}`)
          let offDay = {
            days: ev.start_date,
            zones: 'fullday',
            css: 'holiday',
            html: 'Personal Off',
            type: 'dhx_time_block'
          }
          scheduler.addMarkedTimespan(offDay)
          this.allMarkedId.push(offDay)
          scheduler.endLightbox(false, document.getElementById('custom_form'))
          scheduler.updateView()
        }
      },
      async remove () {
        let id = scheduler.getState().lightbox_id
        let ev = scheduler.getEvent(id)
        let { date } = await this.axios.delete(`appointment/${ev._id}`)

        scheduler.endLightbox(false, document.getElementById('custom_form'))
        scheduler.deleteEvent(id)
      },
      closeForm () {
        this.isPersonalOff = false
        this.isAdded = false
        scheduler.endLightbox(false, document.getElementById('custom_form'))
      },
      async addCustomer () {
        if (this.customer && !this.errors.has('customer')) {
          const { data } = await this.axios.post('customers', { name: this.customer, email: this.customer })
          await this.axios.get(`agent/${this.id}/assign-customer/${data._id}`)
          this.isAdded = true
        }
      },
      async searchCustomer (value) {
        this.highlightedPosition = 0
        this.isAdded = false
        if (value) {
          let { data } = await this.axios.get(`customer/search?agent=${this.id}&key=${value}`)
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
