<template>
    <div class="login-container">
      <h1 class="text-center">Login</h1>
      <form @submit.prevent="signin">
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @blur="validatePassword"
            @input="validatePassword"
            class="form-control"
            required
          />
          <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <div v-if="authError" class="text-danger mt-3 text-center">{{ authError }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../Firebase/init.js'
  
  const email = ref('rche0119@student.monash.edu') 
  const password = ref('')
  const errors = ref({
    password: null
  })
  const authError = ref(null)
  const router = useRouter()
  
  const validatePassword = () => {
    if (!password.value) {
      errors.value.password = 'Password is required'
    } else if (password.value.length < 6) {
      errors.value.password = 'Password must be at least 6 characters long'
    } else {
      errors.value.password = null
    }
  }
  
  const signin = () => {
    validatePassword()
  
    if (!errors.value.password) {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
          localStorage.setItem('email', email.value)
          router.push('/home')
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            authError.value = 'Incorrect password. Please try again.'
          } else if (error.code === 'auth/user-not-found') {
            authError.value = 'No user found with this email.'
          } else {
            authError.value = 'Login failed. Please try again.'
          }
        })
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f8f9fa;
  }
  </style>