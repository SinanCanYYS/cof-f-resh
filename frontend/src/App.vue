<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAccountStore } from './stores/account'
import { useSocketStore } from './stores/socket'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView
  },
  data() {
    return {
      currentTime: new Date().toLocaleString()
    }
  },
  async mounted() {
    await this.fetchUser()
    await this.init()
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout']),
    ...mapActions(useSocketStore, ['init'])
  },
  computed: {
    ...mapState(useAccountStore, ['user']),
    ...mapState(useSocketStore, ['connected'])
  }
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <RouterLink class="navbar-brand" to="/">Cof~f~resh</RouterLink>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- <RouterLink to="/">Home</RouterLink> -->
            <li class="nav-item">
              <RouterLink class="nav-link active" to="/about">About</RouterLink>
            </li>
            <li class="nav-item" v-if="!user">
              <RouterLink class="nav-link" to="/login">Log in</RouterLink>
            </li>
            <li class="nav-item" v-if="!user">
              <RouterLink class="nav-link" to="/signup">Sign up</RouterLink>
            </li>
            <li class="nav-item" v-if="user">
              <a class="nav-link" @click="logout">Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <div class="container">
    <RouterLink class="info" :to="user?.type === 'Owner' ? '/ownerhome' : '/customerhome'">
      Logged in as: {{ user?.name }}
    </RouterLink>
    <!-- <h2 class="info">Logged in as: {{ user?.name }}</h2> -->
    <br />
    <p class="info">Socket connected: {{ connected ? 'yes' : 'no' }}</p>
    <br />
    <!-- <p class="info">{{ currentTime }}</p> -->
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style scoped>
.navbar-nav {
  margin-left: auto;
  margin-right: 0;
  text-align: right;
}
</style>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.info {
  font-size: 16px;
  font-weight: bold;
  color: #c90808;
  text-align: left;
  margin-top: 0px;
  margin-bottom: 0px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
