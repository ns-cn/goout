<script setup>
import { ref, onMounted } from 'vue'

const apiResponse = ref('')
const loading = ref(false)
const error = ref(null)

const testApi = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('/api/hello')
    const data = await response.json()
    apiResponse.value = JSON.stringify(data, null, 2)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(testApi)
</script>

<template>
  <div class="api-test">
    <h2>API 测试</h2>
    <button @click="testApi" :disabled="loading">
      {{ loading ? '加载中...' : '测试 API' }}
    </button>
    
    <div v-if="error" class="error">
      错误: {{ error }}
    </div>
    
    <pre v-if="apiResponse" class="response">
      {{ apiResponse }}
    </pre>
  </div>
</template>

<style scoped>
.api-test {
  margin: 20px;
  text-align: left;
}

.error {
  color: red;
  margin: 10px 0;
}

.response {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
}
</style>
