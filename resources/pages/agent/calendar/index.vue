<template>
  <section>
    <div v-bind:class="{ modal: true, 'is-active': isPersonalOff }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h1 class="title">Book Personal Task</h1>
          <div class="box">
            <div class="columns">
              <div class="column is-6">
                <label class="label">Provider</label>
                <span class="subtitle">{{name}}</span>
                <label for="" class="label">Date</label>
                <p class="control"><input id="date-off" class="input" type="date" v-model="personal.blockDate"></p>
                <label class="checkbox">
                  <input type="checkbox" v-model="personal.fullday">
                Whole Day Off
                </label>
                 <label for="" class="label">Time Period</label>
                <div class="columns">
                  <div class="column is-5">
                    <input id="personal-start" class="input" type="text" v-model="personal.start">
                  </div>
                  <div class="column is-2 has-text-centered">to</div>  
                  <div class="column is-5">
                    <input id="personal-end" class="input" type="text" v-model="personal.end">
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <label class="checkbox">
                  <input type="checkbox" v-model="personal.isRepeat">
                  Repeat
                </label>
                <p v-show="personal.isRepeat" class="control"><input id="date-off-end" class="input" type="date" v-model="personal.endDate"></p>
                <label for="" class="label">Comment</label>
                <p class="control">
                  <textarea name="" id="" cols="30" rows="10" class="textarea" v-model="personal.comment"></textarea>
                </p>
              </div>
            </div>
          </div>
          <div class="level">
            <div class="level-left is-6">
              <a class="button is-danger" @click="deletePersonalTask" v-show="isDeletePersonalOff">Delete</a>
            </div>
            <div class="level-right is-6 block">
              <a class="button is-info" @click="saveOff">Save</a>
              <a class="button is-info" @click="isPersonalOff=false">Cancel</a>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close" @click="isPersonalOff=false"></button>
    </div>
    <div class='level'>
      <div class='level-left'>

      </div>
      <div class='level-right'>
        <div class='level-item'>
          <a href="javascript:" class="button is-info" @click="isPersonalOff=true"> 
            <i class="fa fa-plus"></i> &nbsp;
            Personal Task
          </a>
        </div>
      </div>
    </div>
    <div class='columns'>
      <calendar />
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
                <p class="control"><input v-validate="'required|email'" class="input" type="text" name="customer" v-model="customer"></p>
                <span class="help is-danger" v-show="errors.has('customer')" >{{ errors.first('customer') }}</span>
                <label for="" class="label">Name</label>
                <p class="control"><input class="input" type="text" v-model="customerData.name"></p>
                <label for="" class="label">Cell Phone</label>
                <p class="control">
                  <masked-input
                    type="text"
                    name="phone"
                    class="input"
                    v-model="customerData.phone"
                    :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                    :guide="false"
                    placeholderChar="#">
                  </masked-input>
                </p>
                <label for="" class="label">Address</label>
                <p class="control"><textarea class="textarea" style="min-height:60px !important" v-model="customerData.address1"></textarea></p>
              </div>
              <div class="column is-6">
                <label for="" class="label">Zip</label>
                <p class="control"><input class="input" type="text" v-model="customerData.zip"></p>
                <label for="" class="label">City</label>
                <p class="control"><input class="input" type="text" v-model="customerData.city"></p>
                <label for="" class="label">Country</label>
                <p class="control"><input class="input" type="text" v-model="customerData.country"></p>
                <label for="" class="label">State</label>
                <p class="control"><input class="input" type="text" v-model="customerData.state"></p>
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
  
  import Calendar from '~components/Scheduler.vue'
  import MaskedInput from 'vue-text-mask'
  import helper from '~/plugins/helper'
  export default {
    middleware: 'auth',
    components: {
      Calendar,
      MaskedInput
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
      let blockTime = agent.data.block_time ? JSON.parse(agent.data.block_time) : [{ day: false, start: '09:00 AM', end: '05:00 PM' }]
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
        customerData: {
          name: '',
          email: '',
          phone: '',
          address1: '',
          zipCode: '',
          city: '',
          country: '',
          state: ''
        },
        isCustomer: false,
        isOpen: false,
        highlightedPosition: 0,
        isPersonalOff: false,
        isAdded: false,
        personal: {
          blockDate: (new Date()).toLocaleDateString(),
          endDate: (new Date().toLocaleDateString()),
          fullday: false,
          start: '09:00 AM',
          end: '05:00 PM',
          isRepeat: false
        },
        isDeletePersonalOff: false
      }
    },
    data () {
      return {
        axios: this.$root.$options.axios
      }
    },
    watch: {
      'block_time.work_start_time': (val) => {
        console.log(val)
      }
    },
    mounted () {
      window.calendar = this 
      let self = this
      const flatpicker = require('flatpickr')
      var options = { allowInput: false, enableTime: true, noCalendar: true, dateFormat: 'h:i K' }
      new flatpicker(document.getElementById('date-off'))
      new flatpicker(document.getElementById('date-off-end'))
        new flatpicker(document.getElementById('personal-start'), options)
        new flatpicker(document.getElementById('personal-end'), options)

      let startOption = Object.assign({}, options)
      startOption.onChange = (date, datestr, instance) => {
        let dt = date[0]
        if (!dt) return false
        dt.setHours(dt.getHours() + 2)
        dt.setMinutes(dt.getMinutes())
        endTime.setDate(dt)
      }
      let startTime = window.startTime = new flatpicker(document.getElementById('start-time'), startOption)
  
      let endTime = new flatpicker(document.getElementById('end-time'), options)
      var custom_form = document.getElementById('custom_form')
      scheduler.showLightbox = function (id) {
        var ev = scheduler.getEvent(id)
        scheduler.startLightbox(id, document.getElementById('custom_form'))
        self.title = ev.text
        self.customer = ev.customer
        startTime.setDate(ev.start_date)
        endTime.setDate(ev.end_date)
        let timeFormat = (date) => {
          var hours = date.getHours()
          var minutes = date.getMinutes()
          var ampm = hours >= 12 ? 'PM' : 'AM'
          hours = hours % 12
          hours = hours || 12 // the hour '0' should be '12'
          minutes = minutes < 10 ? '0' + minutes : minutes
          var strTime = hours + ':' + minutes + ' ' + ampm
          return strTime
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
          end_date: new Date(m.end_time),
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
            html: 'Off Day',
            type: 'dhx_time_block'
          }
        } else {
          const startMinute = helper.covertTimetoInt(b.start)
          const endMinute = helper.covertTimetoInt(b.end)
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
      function showPersonalTask (id) {
        this.showPersonalTask(id)
      }
      this.blockDays.forEach((b) => {
        
        const startMinute = helper.covertTimetoInt(b.start)
        const endMinute = helper.covertTimetoInt(b.end)
        let date = new Date(b.blockDate)
        date.setHours(0, 0, 0)
        let day = {
          _id: `${b._id}`,
          days: b.isRepeat ? date.getDay() : date,
          zones: b.fullday ? 'fullday' : [startMinute, endMinute],
          invert_zones: true,
          css: 'holiday',
          html: `<a href="javascript:" onclick="calendar.showPersonalTask('${b._id}')">Personal Task</a>`,
          type: 'dhx_time_block'
        }
        if (b.isRepeat) {
          day.start_date = date
          let endDate = new Date(b.endDate)
          endDate.setHours(24, 0, 0)
          day.end_date = endDate
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
        if (this.errors.any()) {
          return
        }
        const startMinute = helper.convertTimetoInt(this.block_time.work_start_time)
        ev.start_date.setHours(0, 0, 0)
        ev.start_date.setMinutes(startMinute)
        const obj = { agent: this.email, description: this.title, customer: this.customer, start: ev.start_date, comment: this.comment }
        let { data } = await this.axios.post('appointment', obj)
        ev.customer = data.customer.email
        ev.text = data.description
        ev._id = data._id
        scheduler.endLightbox(true, document.getElementById('custom_form'))
        this.isCustomer = false
      },
      async saveOff () {
          if (this.errors.any()) {
            return
          }          
          if (this.personal._id) {
            for (var i = 0; i < this.blockDays.length; i++ ) {
              let off = this.blockDays[i]
              
              if (off._id && off._id === this.personal._id) {      
                this.blockDays.slice(i, 1)
                break;         
              }
            }
            for (var i = 0; i < this.allMarkedId.length; i++ ) {
              let off = this.allMarkedId[i]
              
              if (off._id && off._id === this.personal._id) {      
                scheduler.deleteMarkedTimespan(off)
                scheduler.updateView()
                this.allMarkedId.splice(i, 1)
                break;         
              }
            }
          }
          this.isAdded = false
          const { data } = await this.axios.post(`agent/${this.id}/block-date`, this.personal)

          this.blockDays.push(data)
          const startMinute = helper.covertTimetoInt(this.personal.start)
          const endMinute = helper.covertTimetoInt(this.personal.end)
          let date = new Date(this.personal.blockDate)
          date.setHours(0, 0, 0)
          let endDate = new Date(this.personal.endDate)
          endDate.setHours(24, 0, 0)
          let offDay = {
            _id: `${data._id}`,
            days: this.personal.isRepeat ? date.getDay() : date,
            zones: this.personal.fullday ? 'fullday' : [startMinute, endMinute],
            css: 'holiday',
            html: `<a href="javascript:" onclick="calendar.showPersonalTask('${data._id}')">Personal Task</a>`,
            type: 'dhx_time_block'
          }
          if (this.personal.isRepeat) {
            offDay.start_date = date
            offDay.end_date = endDate
          }
          scheduler.addMarkedTimespan(offDay)
          this.allMarkedId.push(offDay)
          scheduler.endLightbox(false, document.getElementById('custom_form'))
          scheduler.updateView()
          this.personal = {
            blockDate: (new Date()).toLocaleDateString(),
            endDate: (new Date().toLocaleDateString()),
            fullday: false,
            start: '09:00 AM',
            end: '05:00 PM',
            isRepeat: false
          }
          this.isPersonalOff = false
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
          this.customerData.email = this.customer
          const { data } = await this.axios.post('customers', this.customerData)
          await this.axios.get(`agent/${this.id}/assign-customer/${data._id}`)
          this.isAdded = true
          this.isCustomer = false
          this.customerData = {}
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
      showPersonalTask (id) {
        this.isPersonalOff = true

        for (var i = 0; i < this.blockDays.length; i++ ) {
          let off = this.blockDays[i]
          
          if (off._id && off._id === id) {      
            this.personal = off
            this.personal.blockDate = (new Date(this.personal.blockDate)).toLocaleDateString()
            this.personal.endDate = (new Date(this.personal.endDate)).toLocaleDateString()
            break;         
          }
        }
        this.isDeletePersonalOff = true
        
      },
      async deletePersonalTask() {
        const id = this.personal._id
        let d = new Date(this.personal.blockDate)
        await this.axios.delete(`agent/${this.id}/block-date/${d.getFullYear()}-${('0'+(d.getMonth()+1)).slice(-2)}-${d.getDate()}`)
        for (var i = 0; i < this.allMarkedId.length; i++ ) {
          let off = this.allMarkedId[i]
          
          if (off._id && off._id === id) {      
            scheduler.deleteMarkedTimespan(off)
            scheduler.updateView()
            this.allMarkedId.splice(i, 1)
            break;         
          }
        }
        this.personal = {
          blockDate: (new Date()).toLocaleDateString(),
          endDate: (new Date().toLocaleDateString()),
          fullday: false,
          start: '09:00 AM',
          end: '05:00 PM',
          isRepeat: false
        }
        this.isPersonalOff = false
        this.isDeletePersonalOff = false
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
