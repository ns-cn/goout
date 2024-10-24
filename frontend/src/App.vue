<template>
  <div id="app">
    <!-- 您的其他组件 -->
    <footer>
      <p>后端版本: {{ backendVersion }}</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'App',
  setup() {
    const backendVersion = ref('加载中...')

    const fetchVersion = async () => {
      try {
        const response = await axios.get('/api/version')
        backendVersion.value = response.data.version
      } catch (error) {
        console.error('获取后端版本失败:', error)
        backendVersion.value = '获取失败'
      }
    }

    onMounted(() => {
      fetchVersion()
    })

    return {
      backendVersion
    }
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
  margin-top: 60px;
}
</style>
