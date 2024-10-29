<template>
  <v-app :theme="theme">
    <!-- 顶部导航栏 - 使用主题色 -->
    <v-app-bar app :color="currentTheme" dark elevation="1">
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title class="text-h6 font-weight-regular">GoOut</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- 侧边导航栏 -->
    <v-navigation-drawer v-model="drawer" app class="white">
      <!-- 用户信息区域 - 使用主题色 -->
      <div class="pa-6" :style="{ backgroundColor: currentTheme }" @click="openProfileEdit">
        <div class="d-flex align-center">
          <v-avatar :color="currentTheme" size="48" class="white--text elevation-2">
            {{ userInfo.nickname ? userInfo.nickname.charAt(0).toUpperCase() : 'U' }}
          </v-avatar>
          <div class="ml-4 white--text">
            <div class="text-h6">{{ userInfo.nickname || '用户' }}</div>
            <div class="text-body-2 text-medium-emphasis-inverse">{{ userInfo.username }}</div>
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- 主菜单 -->
      <v-list class="pa-4">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
          class="mb-2"
          :active="selectedItem === index"
          :active-color="currentTheme"
          @click="selectedItem = index"
        >
        </v-list-item>
      </v-list>

      <!-- 底部操作按钮 -->
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="px-4 py-4 d-flex justify-space-between">
          <v-btn
            variant="text"
            class="text-none px-4"
            prepend-icon="mdi-cog-outline"
            @click="openSettings"
            :color="currentTheme"
          >
            设置
          </v-btn>
          <v-btn
            variant="text"
            class="text-none px-4 text-error"
            prepend-icon="mdi-logout"
            @click="logout"
          >
            退出
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- 主内容区域 -->
    <v-main class="grey lighten-4">
      <v-container fluid class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-card class="pa-6" elevation="0">
              <div class="d-flex align-center mb-6">
                <h1 class="text-h5 font-weight-regular">欢迎回来，{{ userInfo.nickname }}</h1>
                <v-spacer></v-spacer>
                <v-btn
                  :color="currentTheme"
                  prepend-icon="mdi-plus"
                  variant="flat"
                >
                  新建
                </v-btn>
              </div>
              <p class="text-body-1 text-medium-emphasis">开始探索你的生活圈</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- 设置对话框 -->
    <Settings
      v-model="showSettings"
      @theme-changed="handleThemeChange"
    />

    <!-- 个人信息修改对话框 -->
    <ProfileEdit v-model="showProfileEdit" />
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { ElMessage } from 'element-plus'
import Settings from '../components/Settings.vue'
import ProfileEdit from '../components/ProfileEdit.vue'

const router = useRouter()
const drawer = ref(false)
const selectedItem = ref(0)
const showSettings = ref(false)
const showProfileEdit = ref(false)

const userInfo = ref({
  username: '',
  nickname: ''
})

const theme = useTheme()
const currentTheme = ref(localStorage.getItem('theme') || '#1867C0')

// 修改菜单项配置
const menuItems = [
  { title: '常用物品', icon: 'mdi-bag-personal-outline' },
  { title: '行程', icon: 'mdi-map-marker-path' },
  { title: '关于', icon: 'mdi-information-outline' }
]

onMounted(() => {
  validateToken()
  // 初始化主题
  if (currentTheme.value) {
    theme.themes.value.light.colors.primary = currentTheme.value
  }
})

const validateToken = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    ElMessage.error('请先登录')
    router.push('/login')
    return
  }

  try {
    const response = await fetch('/api/users/validate', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const result = await response.json()
    if (!response.ok || result.code !== 0) {
      throw new Error(result.message || 'Token无效')
    }

    const data = result.data
    userInfo.value.username = data.username
    userInfo.value.nickname = data.nickname

    // 如果用户有保存的主题，则使用保存的主题
    if (data.theme) {
      currentTheme.value = data.theme
      theme.themes.value.light.colors.primary = data.theme
      localStorage.setItem('theme', data.theme)
    }
  } catch (error) {
    ElMessage.error(error.message)
    router.push('/login')
  }
}

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const openSettings = () => {
  drawer.value = false // 关闭侧边栏
  showSettings.value = true // 显示设置面板
}

const openProfileEdit = () => {
  drawer.value = false // 关闭侧边栏
  showProfileEdit.value = true // 显示个人信息修改对话框
}

// 监听主题变化
const handleThemeChange = (color) => {
  // 更新主题颜色
  theme.themes.value.light.colors.primary = color
  currentTheme.value = color
  localStorage.setItem('theme', color)
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('nickname')
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.v-list-item {
  min-height: 44px;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.v-list-item--active {
  background-color: rgba(var(--v-theme-primary), 0.1) !important;
  color: rgb(var(--v-theme-primary)) !important;
}

.v-btn {
  text-transform: none;
  letter-spacing: normal;
}

/* 用户信息区域的渐变背景 */
.user-info-bg {
  background: linear-gradient(to right, var(--v-theme-primary), rgba(var(--v-theme-primary), 0.8));
}
</style>
