<template>
  <header>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <figure class="icon is-medium" style="margin-right: 8px;">
              <i class="fa material-icons">home</i>
            </figure>
            BackEnd App
          </a>
          <nuxt-link class="nav-item is-tab is-hidden-mobile is-active" to="/">Home</nuxt-link>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab is-hidden-tablet is-active">Home</a>
          <a class="nav-item is-tab">
            <figure class="icon" style="margin-right: 8px;">
              <i class="fa material-icons">face</i>
            </figure>
            Profile
          </a>
          <a class="nav-item is-tab">Log out</a>
        </div>
      </div>
    </nav>
  </header>
</template>
