<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const isLogin = ref<boolean | null>(null);
const isLoading = ref(false);

const checkLogin = () => {
  isLoading.value = true;
  browser.cookies.get({ url: 'https://x.com', name: 'auth_token' }, (cookie) => {
    console.log(cookie);
    
    if (cookie) {
      // Check if cookie exists and is not expired
      const currentTime = Date.now() / 1000; // Convert to seconds
      console.log('Current time:', currentTime);
      const isExpired = cookie.expirationDate && cookie.expirationDate < currentTime;
      
      if (isExpired) {
        console.log('Cookie exists but is expired');
        isLogin.value = false;
      } else {
        isLogin.value = true;
      }
    } else {
      isLogin.value = false;
    }
    isLoading.value = false;
  });
};

onMounted(() => {
  checkLogin();
});
</script>

<template>
  <div class="container">
    <div class="header">
      <svg class="logo" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      <h1 class="title">X 登录状态检查</h1>
    </div>

    <div class="status-card">
      <div v-if="isLoading" class="status-content loading">
        <div class="spinner"></div>
        <p class="status-text">检查中...</p>
      </div>
      
      <div v-else-if="isLogin === true" class="status-content success">
        <svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <p class="status-text">已登录</p>
        <p class="status-desc">您已成功登录 X</p>
      </div>
      
      <div v-else-if="isLogin === false" class="status-content error">
        <svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <p class="status-text">未登录</p>
        <p class="status-desc">请先登录 X 账号</p>
      </div>
      
      <div v-else class="status-content unknown">
        <svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <p class="status-text">未知状态</p>
        <p class="status-desc">点击下方按钮检查</p>
      </div>
    </div>

    <button class="check-button" @click="checkLogin" :disabled="isLoading">
      <svg v-if="!isLoading" class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="23 4 23 10 17 10"></polyline>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
      </svg>
      <span>{{ isLoading ? '检查中...' : '重新检查' }}</span>
    </button>
  </div>
</template>

<style scoped>
.container {
  width: 360px;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.logo {
  width: 48px;
  height: 48px;
  color: white;
  margin-bottom: 12px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-card {
  background: white;
  border-radius: 12px;
  padding: 32px 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-content {
  text-align: center;
  width: 100%;
}

.status-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  display: block;
}

.success .status-icon {
  color: #10b981;
  animation: scaleIn 0.3s ease-out;
}

.error .status-icon {
  color: #ef4444;
  animation: scaleIn 0.3s ease-out;
}

.unknown .status-icon {
  color: #6b7280;
}

.status-text {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1f2937;
}

.status-desc {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.check-button {
  width: 100%;
  padding: 14px 24px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.check-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #f9fafb;
}

.check-button:active:not(:disabled) {
  transform: translateY(0);
}

.check-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-icon {
  width: 20px;
  height: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
