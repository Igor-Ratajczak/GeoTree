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
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 150px -50px white;
      z-index: -1;
    }

    .copyright {
      height: 100%;
    }
  }
</style>
