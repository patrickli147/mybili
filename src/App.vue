<template>
  <div id="app">
    
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view v-if="$route.meta.keepalive"></router-view>
        </transition>
      </keep-alive>
      
      <transition name="fade" mode="out-in">
        <router-view v-if="!$route.meta.keepalive"></router-view>
      </transition>
    
    
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} 

</style>
