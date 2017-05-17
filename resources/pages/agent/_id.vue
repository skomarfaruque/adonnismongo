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
          <input class="input" type="email" v-model="user.email" placeholder="Email">
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
      title: `New Customer Page (${this.name}-side)`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Agent Edit', 'Edit agent information.'])
  },
  components: {
    MaskedInput
  },
  async asyncData ({ store, axios, params }) {
    let { data } = await axios.get(`users/${params.id}`)
    if (!data.zipCode) {
      data.zipCode = []
    }
    return {
      user: data
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
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
      await this.axios.put(`users/${this.user._id}`, this.user)
      this.$router.push('/agent')
    }
  }
}
</script>
