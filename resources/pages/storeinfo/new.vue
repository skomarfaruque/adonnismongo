<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <form id="myForm" name="myForm">
          <label class="label">Name</label>
          <p class="control">
            <input class="input" name="name" v-model="storeinfo.name" type="text" placeholder="Item Name">
          </p>
          <label class="label">description</label>
          <p class="control">
            <input class="input" name="description" v-model="storeinfo.description"  id=""/>
          </p>
          <label class="label">Price</label>
          <p class="control">
            <input class="input" name="price" v-model="storeinfo.price"  />
          </p>
          <label class="label">Quantity</label>
          <p class="control">
            <input class="input" name="quantity" v-model="storeinfo.quantity" />
          </p>
          <label class="label">Image</label>
          <p class="control">
          <span><input type="file" name="image" id="fileInput" @change="onFileChange"><br>
          <img style="max-width: 300px;" :src="storeinfo.image" alt=""></span>
          </p>

          <label class="label">Option</label>
          <div class="control">
            <ul>
              <li v-for="(item, ind) in storeinfo.option">
                <div class="columns">
                  <div class="column is-1">
                    <a href="javascript:" class="button is-danger" @click="removeOption(ind)"><i class="fa fa-minus"></i></a>
                  </div>
                  <div class="column is-5"><input class="input" v-model="storeinfo.option[ind]" type="text" placeholder="option"></div>
                </div>
              </li>
            </ul>

            <div class="columns">
              <div class="column is-1"><a href="javascript:" class="button is-info" @click="addOption"><i class="fa fa-plus"></i></a></div>
            </div>

          </div>

          <a href="javascript:" class="button is-info" @click="save">Save Information</a>
        </form>
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
      title: `New item add Page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['New Item', 'Add a new Store item.'])
  },
  components: {
    MaskedInput
  },
  asyncData ({ store, axios }) {
    return {
      storeinfo: {
        image: '',
        option: []
      }
    }
  },
  data () {
    return {
      axios: this.$root.$options.axios
    }
  },
  methods: {
    async save () {
      var myForm = document.getElementById('myForm')
      let formData = new FormData(myForm)
      let newinfo = await this.axios.post(`storeinfo`, formData)
      this.$router.push('/storeinfo')
    },
    onFileChange(e) {
      var targetId = e.target.id
      var files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return;
      this.createImage(files[0], targetId);
    },
    createImage(file, targetId) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
      vm.storeinfo.image = e.target.result
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.storeinfo.image = '';
    },
    addOption () {
      this.storeinfo.option.push('')
    },
    removeOption (ind) {
      this.storeinfo.option.splice(ind, 1)
    },
  }
}
</script>

