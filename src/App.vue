<template>
  <div id="pc-main">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem("site_config_info") != undefined) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("site_config_info"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem(
        "site_config_info",
        JSON.stringify(this.$store.state)
      );
    });
  },
};
</script>
<style lang="sass" scoped>
#pc-main
  width: 100%
  height: 100%
</style>