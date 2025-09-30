<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  msg: String,
});

const checkLogin = () => {
  browser.cookies.get({ url: 'https://x.com', name: 'auth_token' }, (cookie) => {
    console.log(cookie);
  });
};
</script>

<template>
 <button @click="checkLogin">检查登录状态</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
