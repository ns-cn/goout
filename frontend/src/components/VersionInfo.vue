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
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}
</style>
