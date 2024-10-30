<template>
  <div class="footer">
    <div class="copyright">GeoTree &copy; {{ new Date().getFullYear() }} by Igor Ratajczak</div>
  </div>
</template>

<style scoped lang="less">
  div.footer {
    display: grid;
    align-content: center;
    justify-content: center;
    height: 65px;
    font-size: large;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
      sans-serif;

    .copyright {
      height: 100%;
    }
  }
</style>
