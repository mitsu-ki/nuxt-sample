<template>
  <div class="container">
    <div>
      <div class="about">
        <h1>This is about page</h1>
        <p>staticフォルダからの画像の読み込みは、このようにします。</p>
        <figure>
          <amp-img
            src="/images/about/nuxt-square.svg"
            alt="nuxt.js"
            width="430"
            height="430"
            v-if="$isAMP"
          />
          <img src="/images/about/nuxt-square.svg" alt="nuxt.js" v-else="" />
          <figcaption>Nuxt.js</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  amp: "hybrid",
  ampLayout: "default.amp"
};
</script>
