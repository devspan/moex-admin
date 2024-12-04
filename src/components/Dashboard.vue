<template>
  <div class="px-8">
    <!-- Stats Overview -->
    <div class="grid grid-cols-4 gap-6 mb-8">
      <v-card
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-card"
        elevation="0"
      >
        <div class="d-flex align-center mb-2">
          <v-icon
            :color="stat.color"
            size="24"
            class="stat-icon mr-2"
          >{{ stat.icon }}</v-icon>
          <span class="text-medium-emphasis text-body-2">{{ stat.label }}</span>
        </div>
        <div class="text-h5 font-weight-bold mb-1">{{ stat.value }}</div>
        <div class="d-flex align-center">
          <v-icon
            :color="stat.trend > 0 ? 'success' : 'error'"
            size="16"
            class="mr-1"
          >
            {{ stat.trend > 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
          </v-icon>
          <span :class="stat.trend > 0 ? 'text-success' : 'text-error'">
            {{ Math.abs(stat.trend) }}%
          </span>
          <span class="text-medium-emphasis text-caption ml-1">vs last week</span>
        </div>
      </v-card>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-2 gap-8 mb-12">
      <v-card class="overflow-visible" elevation="0" border>
        <card-heading title="Latest Topups" color="primary" icon="mdi-arrow-collapse-down" />
        <TableBlock class="mt-6 mb-1" :path="'dashboard_rest/topups/?limit=10&offset=0'" :pagin="`?limit=10&offset=0`" />
      </v-card>
      
      <v-card class="overflow-visible" elevation="0" border>
        <card-heading title="Latest Withdrawals" color="error" icon="mdi-arrow-expand-up" />
        <TableBlock class="mt-6 mb-1" :path="'dashboard_rest/withdrawals/?limit=10&offset=0'" :pagin="`?limit=10&offset=0`" />
      </v-card>
    </div>

    <div class="grid grid-cols-2 gap-8 mb-12">
      <v-card class="overflow-visible" elevation="0" border>
        <card-heading title="Trading and Withdrawals Fee" color="success" icon="mdi-percent" />
        <TableBlock class="mt-6 mb-1" :path="'dashboard_rest/tradefee/?limit=10&offset=0'" :pagin="`?limit=10&offset=0`" />
      </v-card>
      
      <v-card class="overflow-visible" elevation="0" border>
        <card-heading title="Latest Withdrawals" color="warning" icon="mdi-arrow-expand-up" />
        <TableBlock class="mt-6 mb-1" :path="'dashboard_rest/commonusersstats/?limit=10&offset=0'" :pagin="`?limit=10&offset=0`" />
      </v-card>
    </div>
  </div>
</template>

<script setup>
import CardHeading from "@/components/CardHeading.vue"
import TableBlock from './TableBlock.vue';

const stats = [
  {
    label: 'Total Volume',
    value: '$2.4M',
    trend: 12.5,
    icon: 'mdi-chart-line',
    color: 'primary'
  },
  {
    label: 'Active Users',
    value: '12,234',
    trend: -2.3,
    icon: 'mdi-account-group',
    color: 'info'
  },
  {
    label: 'Total Revenue',
    value: '$482.5K',
    trend: 8.2,
    icon: 'mdi-currency-usd',
    color: 'success'
  },
  {
    label: 'Pending KYC',
    value: '23',
    trend: 5.1,
    icon: 'mdi-file-document',
    color: 'warning'
  }
];
</script>

<style scoped>
.stat-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), transparent) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: 16px !important;
  padding: 20px;
}

.stat-icon {
  padding: 8px;
  border-radius: 8px;
  background: currentColor;
  opacity: 0.1;
}
</style>