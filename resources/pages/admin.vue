<template>
  <section class="columns">
    <div class="column is-3">
      <aside class="highlight menu">
        <p class="menu-label">
          Administration
        </p>
        <ul class="menu-list">
          <li>
            <nuxt-link to="/admin/staff">Manage Staffs</nuxt-link>
          </li>
        </ul>
      </aside>
    </div>
    <div class="column is-9">
      <nuxt-child/>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  head () {
    return {
      title: `Admin (${this.name}-side)`
    }
  },
  fetch ({ store }) {
    store.commit('SET_HEAD', ['Admin', 'Manage administrative tasks.'])
  }
}
</script>
