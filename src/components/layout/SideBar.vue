<template>
  <v-app-bar color="surface" elevation="0" height="64" border="b">
    <template v-slot:prepend>
      <div class="text-h6 font-weight-medium">MoEX Admin</div>
    </template>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            v-bind="props"
            class="user-menu-btn"
          >
            <v-avatar size="32" color="primary" class="mr-2">
              <span class="text-white">A</span>
            </v-avatar>
            <span>Admin</span>
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout()">
            <template v-slot:prepend>
              <v-icon>mdi-logout</v-icon>
            </template>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    permanent
    color="surface"
    width="280"
    elevation="0"
    border="r"
  >
    <v-list class="pa-4">
      <template v-for="(item, i) in navigation" :key="i">
        <v-list-item
          v-if="item.icon"
          :to="`/page/${item.link === '/' ? 'dashboard' : item.link.name}`"
          :title="item.text"
          :prepend-icon="item.icon"
          :value="item.text"
          rounded="lg"
          class="mb-1"
          :class="{ 'nav-item-active': isActive(item) }"
        >
        </v-list-item>
        <v-list-subheader 
          v-else-if="item.heading"
          :title="item.heading"
          class="text-caption font-weight-bold text-uppercase mt-4 mb-2"
        />
        <v-divider v-if="!item.link && !item.heading" class="my-4" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import axios from "../../plugins/axios";
import { onBeforeMount, ref } from "vue";
import { useNavStore } from "@/stores/nav";
import initRouter from "@/router/";
import localConfig from "@/local_config";
import { useRoute } from "vue-router";

const nav = useNavStore();
const route = useRoute();

const isActive = (item) => {
  const currentPath = route.path.split('/').pop();
  const itemPath = item.link === '/' ? 'dashboard' : item.link.name;
  return currentPath === itemPath;
};

const apiKey = localConfig.api;

const navigation = ref([]);
const resources = ref([]);

const selected = ref([]);

const logout = () => {
  localStorage.setItem("jwt_token", "");
  initRouter.push({ name: "Login" });
};
const param = ref(route.path);

const devs = ref({});

const getNavigation = async () => {
  if (!window.location.href.includes("/login")) {
    try {
      const response = await axios.get('/navigation/');
      navigation.value = response.data;
      nav.setNavigation(response.data);
      let dStr = "";
      navigation.value.map(($, k) => {
        if ($.heading) {
          devs.value[$.heading] = false;
          dStr = $.heading;
        }
        navigation.value[k]["head"] = dStr;
      });
      try {
        let menu = JSON.parse(localStorage.getItem("menu"));
        if (menu) devs.value = menu;
      } catch (e) {
        console.error('Menu parsing error:', e);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.type === "authentication_failed" ||
        error?.response?.data?.code?.code === "token_not_valid" ||
        error?.response?.data?.type === "not_authenticated"
      ) {
        router.push('/login');
      }
    }
  }
};

const openMenu = ($) => {
  devs.value[$] = !devs.value[$];
  localStorage.setItem("menu", JSON.stringify(devs.value));
};

const getResources = async () => {
  try {
    const response = await axios.get('/resources/');
    resources.value = response.data;
    nav.setResources(response.data);
  } catch (error) {
    console.error('Resources error:', error);
  }
};

onBeforeMount(() => {
  getNavigation();
  getResources();
});
</script>

<style scoped>
.nav-item-active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1)) !important;
  color: rgb(59, 130, 246) !important;
  font-weight: 500;
}

.user-menu-btn {
  padding: 6px 16px;
  height: 44px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.1);
}

:deep(.v-list-item--active) {
  color: rgb(59, 130, 246) !important;
}

:deep(.v-list-item:hover:not(.v-list-item--active)) {
  background: rgba(255, 255, 255, 0.03);
}
</style>
