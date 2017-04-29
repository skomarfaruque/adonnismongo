<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" type="text" v-model="user.name" placeholder="Name">
        </p>
        <label class="label">Email</label>
        <p class="control">
          <input class="input" type="user.email" v-model="user.email" placeholder="Email">
        </p>
        <label class="label">Phone</label>
        <p class="control">
          <masked-input
            type="text"
            name="phone"
            class="input"
            v-model="user.phone"
            :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            placeholderChar="#">
          </masked-input>
        </p>
        <label class="label">Address</label>
        <p class="control">
          <input class="input" type="text" v-model="user.address" placeholder="Address Line">
        </p>
        <label class="label">City</label>
        <p class="control">
          <input class="input" v-model="user.city" type="text" placeholder="City">
        </p>
        <label class="label">State</label>
        <p class="control">
          <input class="input" v-model="user.state" type="text" placeholder="State">
        </p>
        <div v-if="!isAgent">
          <label class="label">Zip Code</label>
          <div class="control">
            <ul>
              <li v-for="(zip, ind) in user.zipCode">
                <div class="columns">
                  <div class="column is-1">
                    <a href="javascript:" class="button is-danger" @click="removeZip(ind)"><i class="fa fa-minus"></i></a>
                  </div>
                  <div class="column is-5"><input class="input" v-model="user.zipCode[ind]" type="text" placeholder="Zip Code"></div>
                </div>
              </li>
            </ul>

            <div class="columns">
              <div class="column is-1"><a href="javascript:"
                  class="button is-info"
                  @click="addZip"><i class="fa fa-plus"></i></a></div>
            </div>

          </div>
        </div>
        <section v-if="isAgent">
          <h2 class="subtitle">Working Hour</h2>
          <div class="columns">
            <div class="column is-4"><label class="label">Block Day(s)</label></div>
            <div class="column is-4"><label class="label">Start Time</label></div>
            <div class="column is-4"><label class="label">End Time</label></div>
          </div>
          
          <div class="columns is-multiline" v-for="(d, i) in allDay">
            <div class="column is-4" >
                <label class="checkbox">
                  <input type="checkbox" v-bind:true-value="i" v-model="block_days[i].day">
                  {{d}}
                </label>
            </div>
            <div class="column is-4">
              <input id="" class="input start-time" v-model="block_days[i].start" value="08:00" type="text" placeholder="Block Time">
            </div>
            <div class="column is-4">
              <input id="" class="input end-time" v-model="block_days[i].end" type="text" placeholder="Block Time">
            </div>
          </div>
        </section>
        <hr/>
        <a href="javascript:" class="button is-info" @click="saveInfo">Save Information</a>
      </div>
    </div>
  </section>
</template>

<script>
  import MaskedInput from 'vue-text-mask'
  export default {
    middleware: 'auth',
    head () {
      return {
        title: `Profile Page`
      }
    },
    fetch ({ store }) {
      store.commit('SET_HEAD', ['Profile', 'Personal Information.'])
    },
    components: {
      MaskedInput
    },
    async asyncData ({ store, axios, params }) {
      let { data } = await axios.get('users/me')
      if (!data.zipCode) {
        data.zipCode = []
      }
      let blockTime = JSON.parse(data.block_time || '[{"day": false, "start": "09:00 AM", "end": "05:00 PM"},{"day": false, "start": "09:00 AM", "end": "05:00 PM"},{"day": false, "start": "09:00 AM", "end": "05:00 PM"},{"day": false, "start": "09:00 AM", "end": "05:00 PM"},{"day": false, "start": "09:00 AM", "end": "05:00 PM"},{"day": false, "start": "09:00 AM", "end": "05:00 PM"},{"day": false, "start": "09:00 AM", "end": "05:00 PM"}]')
      return {
        user: data,
        isAgent: store.state.role === 'Agent',
        allDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        block_days: blockTime || []
      }
    },
    data () {
      return {
        axios: this.$root.$options.axios
      }
    },
    mounted () {
      if (this.isAgent && process.BROWSER_BUILD) {
        const flatpicker = require('flatpickr')
        let options = { enableTime: true, noCalendar: true, dateFormat: 'h:i K' }
        let starts = document.getElementsByClassName('start-time')
        let ends = document.getElementsByClassName('end-time')
        for (var i = 0; i < starts.length; i++) {
          new flatpicker(starts[i], options)
          new flatpicker(ends[i], options)
        }        
      }
    },
    methods: {
      addZip () {
        this.user.zipCode.push('')
      },
      removeZip (ind) {
        this.user.zipCode.splice(ind, 1)
      },
      async saveInfo () {
        this.user.block_time = JSON.stringify(this.block_days)
        await this.axios.put(`users/${this.user._id}`, this.user)
        this.$toasted.show('Profile Saved Successfully.', { duration: 4500 })
      }
    }
  }

</script>
