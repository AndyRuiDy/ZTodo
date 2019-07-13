<template>
  <div id="app">
    <div id="cover" />
    <Header />
    <!-- <Todo /> -->
    <transition name="fade">
      <router-view />
    </transition>
    <button @click="notify">
      click me
    </button>
    <Footer />
  </div>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todos/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  computed: {
    // ...mapState(['count']),
    ...mapState({
      counter: (state) => state.count
    }),
    ...mapGetters(['fullName'])
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  mounted () {

    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })
  },
  methods: {
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .5
  z-index -1
}
</style>
