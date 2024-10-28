<template>
  <div>
    <h2>{{ isLogin ? '登录' : '注册' }}</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="username" type="text" placeholder="用户名" required>
      <input v-model="password" type="password" placeholder="密码" required>
      <button type="submit">{{ isLogin ? '登录' : '注册' }}</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <button @click="toggleMode">切换到{{ isLogin ? '注册' : '登录' }}</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AuthForm',
  data() {
    return {
      isLogin: true,
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const endpoint = this.isLogin ? '/api/login' : '/api/register';
        const response = await axios.post(endpoint, {
          username: this.username,
          password: this.password
        });
        this.message = response.data.message;
      } catch (error) {
        this.message = error.response ? error.response.data.error : '请求失败';
      }
    },
    toggleMode() {
      this.isLogin = !this.isLogin;
      this.message = '';
    }
  }
};
</script>
