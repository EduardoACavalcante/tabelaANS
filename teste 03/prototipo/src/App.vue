<template>
  <PageHeader />
  <ANSTable />
</template>

<script>
import PageHeader from "./components/PageHeader.vue";
import ANSTable from "./components/table-generator/ANSTable.vue";

export default {
  name: "App",
  components: {
    PageHeader,
    ANSTable,
  },
};
</script>

<style>
body {
  background-color: #f1f1f1 !important;
}
</style>
