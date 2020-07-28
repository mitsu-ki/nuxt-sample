const ampBoilerplate =
  "<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>";
const modifyHtml = (html, isGenerate) => {
  html = html.replace(/<html/gi, "<html amp ");
  // Add amp-custom tag to added CSS
  html = html.replace(/<style data-vue-ssr/g, "<style amp-custom data-vue-ssr");
  // Remove every script tag from generated HTML
  html = html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
  // Replace img tag
  if (isGenerate) html = html.replace(/<img/gi, "<amp-img");
  // Add AMP script before </head>
  const ampScript =
    '<script async src="https://cdn.ampproject.org/v0.js"></script>';
  html = html.replace("</head>", ampScript + ampBoilerplate + "</head>");
  return html;
};

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/stylesheets/main.css"],

  loading: false,
  render: {
    resourceHints: false
  },

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [["nuxt-canonical", { baseUrl: "https://my-nuxt-sample.com" }]],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  /*
   ** generateコマンドでの設定
   ** 出力ディレクトリの設定を行っている
   */
  generate: {
    dir: "./public",
    fallback: false
  },

  hooks: {
    "generate:page": page => {
      page.html = modifyHtml(page.html, true);

      // 特定ページをAMP対応する場合
      // if (page.route === '/enterprise/use-case/') {
      //   page.html = modifyHtml(page.html, true);
      // }
    },
    "render:route": (url, page, { req, res }) => {
      page.html = modifyHtml(page.html, false);
      // if (page.route === '/enterprise/use-case/') {
      //   page.html = modifyHtml(page.html, false);
      // }
    }
  }
};
