<template>
  <section>
    <div class="columns">
      <div class="column is-6">
        <form id="myForm" name="myForm">
          <label class="label">Name</label>
          <p class="control">
            <input class="input" name="name" v-model="name" type="text" placeholder="Item Name">
          </p>
          <label class="label">description</label>
          <p class="control">
            <input class="input" name="description" v-model="description"  id=""/>
          </p>
          <label class="label">Price</label>
          <p class="control">
            <input class="input" name="price" v-model="price"  />
            <input type="hidden" class="input" name="image" v-model="image"  />
          </p>
          <label class="label">Quantity</label>
          <p class="control">
            <input class="input" name="quantity" v-model="quantity" />
          </p>
          <label class="label">Image</label>
          <p class="control">
          <img style="max-width: 300px;" :src="`/item_image/${image}`" alt="">
          <img style="max-width: 300px;" alt="">
          </p>
          <label class="label">Change image</label>
          <p class="control">
          <span><input type="file" name="image" id="fileInput" @change="onFileChange"><br>
          <img style="max-width: 300px;" :src="tempImage" alt=""></span>
          </p>

          <label class="label">Option</label>
          <div class="control">
            <ul>
              <li v-for="(item, ind) in storeinfo.option">
                <div class="columns">
                  <div class="column is-1">
                    <a href="javascript:" class="button is-danger" @click="removeOption(ind)"><i class="fa fa-minus"></i></a>
                  </div>
                  <div class="column is-5"><input class="input" name="option[]" v-model="storeinfo.option[ind]" type="text" placeholder="option"></div>
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
      title: `Edit item page`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['New Item', 'Add a new Store item.'])
  },
  components: {
    MaskedInput
  },
  async asyncData ({ store, axios, params }) {
    let { data } = await axios.get(`storeinfo/${params.id}`)
    if (!data.option) {
      data.option = []
    }
    return {
      storeinfo: {
        option: data.option,
      },
      id: data._id,
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      image: data.image,
      tempImage: '',
      
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
      await this.axios.put(`storeinfo/${this.id}`, formData)
      this.$router.go(-1)
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
      vm.tempImage = e.target.result
      };
      reader.readAsDataURL(file);
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

