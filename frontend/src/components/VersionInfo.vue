<script setup>
import { ref, onMounted } from 'vue'

const version = ref('')

const fetchVersion = async () => {
  try {
    const response = await fetch('/api/health')
    const data = await response.json()
    version.value = data.version
  } catch (err) {
    console.error('获取版本信息失败:', err)
    version.value = '获取失败'
  }
}

onMounted(fetchVersion)
</script>

<template>
  <div class="version-info">
    版本: {{ version }}
  </div>
</template>

<style scoped>
.version-info {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 40px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 24px;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
