<template>
  <div class="login-wrapper">
    <div class="background-pattern"></div>
    
    <div class="login-container">
      <!-- Left Side - Branding -->
      <div class="branding-section">
        <h1 class="welcome-text">Welcome to MoEX Admin</h1>
        <p class="welcome-desc">
          Secure access to manage your cryptocurrency exchange platform. Enhanced with advanced security features and real-time monitoring.
        </p>

        <!-- Market Stats -->
        <div class="stats-grid">
          <div v-for="(stat, index) in stats" :key="index" class="stat-card">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <v-sheet class="login-form-container" elevation="0">
        <h2 class="text-h5 font-weight-bold text-center mb-6">Sign In to Dashboard</h2>
        
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="user"
            label="Email"
            variant="outlined"
            density="comfortable"
            bg-color="rgba(26, 27, 31, 0.6)"
            class="mb-4 login-field"
            hide-details
          ></v-text-field>

          <v-text-field
            v-model="pass"
            label="Password"
            type="password"
            variant="outlined"
            density="comfortable"
            bg-color="rgba(26, 27, 31, 0.6)"
            class="mb-4 login-field"
            hide-details
          ></v-text-field>

          <v-text-field
            v-model="code"
            label="2FA Code"
            variant="outlined"
            density="comfortable"
            bg-color="rgba(26, 27, 31, 0.6)"
            class="mb-6 login-field"
            hide-details
            type="text"
            maxlength="6"
            @input="value => code = value.replace(/\D/g, '')"
          ></v-text-field>

          <div class="d-flex justify-space-between align-center mb-6">
            <v-checkbox
              label="Remember me"
              color="primary"
              density="compact"
              hide-details
            ></v-checkbox>
            <a href="#" class="text-primary text-decoration-none text-body-2 font-weight-medium">Forgot password?</a>
          </div>

          <v-btn
            block
            color="primary"
            size="large"
            type="submit"
            :loading="loading"
            class="login-btn text-none"
            elevation="0"
          >
            Sign In
          </v-btn>

          <!-- Security Notice -->
          <div class="security-notice mt-6">
            <v-icon color="primary" size="24" class="mr-3">mdi-shield-check</v-icon>
            <div>
              <div class="font-weight-medium">Enhanced Security</div>
              <div class="text-caption text-medium-emphasis">
                Protected by two-factor authentication
              </div>
            </div>
          </div>
        </v-form>
      </v-sheet>
    </div>

    <v-alert
      v-model="alert"
      :color="alertColor"
      :text="alertText"
      class="alert-block"
      closable
      variant="tonal"
    ></v-alert>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../plugins/axios';
import localConfig from "@/local_config";
import { useRouter } from 'vue-router';
import { findErrMessage } from "@/plugins/helpers";

const apiKey = localConfig.api;
const router = useRouter();

const user = ref('');
const pass = ref('');
const code = ref('');
const loading = ref(false);
const alert = ref(false);
const alertText = ref('');
const alertColor = ref('error');

const stats = [
  { label: "Active Users", value: "12.5K+" },
  { label: "Daily Volume", value: "$2.8M" },
  { label: "Markets", value: "89+" }
];

const login = async () => {
  try {
    loading.value = true;
    const loginData = {
      username: user.value,
      password: pass.value,
      ...(code.value ? { otp_token: code.value.toString() } : {})
    };

    console.log('Login data:', loginData);

    const response = await axios.post('login/', loginData);    

    if (response.data.access_token) {
      localStorage.setItem("jwt_token", response.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem("refresh_token", response.data.refresh_token);
      }
      router.push('/admin');
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Login error:', error?.response?.data || error);
    
    if (error.response?.data?.error === "Incorrect 2FA token") {
      alertText.value = "Incorrect 2FA code. Please try again.";
      code.value = '';
    } else {
      showAlert(error);
    }
  } finally {
    loading.value = false;
  }
}

const showAlert = (err) => {
  let message = 'Login failed. Please check your credentials.';
  
  if (err.response?.data?.error) {
    message = err.response.data.error;
  } else if (err.response?.data?.detail) {
    message = err.response.data.detail;
  } else if (typeof err === 'string') {
    message = err;
  }

  alert.value = true;
  alertText.value = message;
  alertColor.value = 'error';
  setTimeout(() => {
    alert.value = false;
    alertText.value = '';
  }, 3000);
}
</script>

<style>
/* Global styles */
:root {
  --primary-gradient: linear-gradient(135deg, #3B82F6, #8B5CF6);
  --surface-dark: rgba(30, 35, 45, 0.65);
  --border-light: rgba(255, 255, 255, 0.08);
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --background-start: #111827;
  --background-end: #0F172A;
}

/* Remove Vuetify field details margin */
.v-input__details {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 0 !important;
}
</style>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15), transparent 75%),
              radial-gradient(circle at 0% 50%, rgba(139, 92, 246, 0.15), transparent 50%),
              linear-gradient(180deg, var(--background-start) 0%, var(--background-end) 100%);
  position: relative;
  overflow: hidden;
}

.background-pattern {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%);
  background-size: 60px 60px;
  opacity: 0.1;
  pointer-events: none;
}

.login-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  padding: 40px;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  align-items: center;
}

.branding-section {
  padding: 60px;
}

.welcome-text {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 24px;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.welcome-desc {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 480px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.stat-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid var(--border-light);
  backdrop-filter: blur(20px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 8px;
}

.login-form-container {
  background: var(--surface-dark) !important;
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light) !important;
  border-radius: 24px !important;
  padding: 40px !important;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
}

:deep(.login-field) {
  border-radius: 12px;
}

:deep(.login-field .v-field__outline) {
  --v-field-border-opacity: 0.15 !important;
}

:deep(.login-field .v-field--focused .v-field__outline) {
  --v-field-border-opacity: 0.25 !important;
}

:deep(.login-field .v-field__input) {
  color: var(--text-primary) !important;
}

:deep(.login-field .v-label) {
  color: var(--text-secondary) !important;
}

.login-btn {
  background: var(--primary-gradient) !important;
  border-radius: 12px !important;
  height: 48px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
}

.login-btn:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4) !important;
}

.security-notice {
  padding: 16px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.alert-block {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 400px;
  z-index: 100;
}

@media (max-width: 1024px) {
  .login-container {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .branding-section {
    display: none;
  }

  .login-form-container {
    padding: 30px !important;
  }
}

@media (max-width: 480px) {
  .login-form-container {
    padding: 20px !important;
  }

  .alert-block {
    width: calc(100% - 32px);
    right: 16px;
    bottom: 16px;
  }
}
</style>