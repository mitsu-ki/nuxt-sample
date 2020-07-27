<template>
  <div class="container">
    <div>
      <div class="about">
        <h1>This is about page</h1>
        <p>staticフォルダからの画像の読み込みは、このようにします。</p>
        <figure>
          <img src="/images/about/nuxt-square.svg" alt="nuxt.js" />
          <figcaption>Nuxt.js</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.about h1 {
  color: gray;
  font-size: 26px;
}
</style>
