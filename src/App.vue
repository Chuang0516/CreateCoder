<template>
  <Header />
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
html {
  font-family: NSimSun;
}

body {
  background-color: #eaeaea;
}

ul,
ol,
li {
  list-style-type: none;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
