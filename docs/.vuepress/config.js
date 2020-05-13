const path = require("path");
const os = require("os");
const fs = require("fs");
const dotenv = require("dotenv");
const pkg = require("../../package");

const { prefix } = dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
}).parsed;

const prefixStyl = path.join(os.tmpdir(), "prefix.styl");

fs.writeFileSync(prefixStyl, `prefix = ${prefix}`, {
  flag: "w+",
});

const resolveDemos = () => {
  const demos = fs.readdirSync(path.resolve(__dirname, "demos"));
  const demoNames = demos.map((fileName) => {
    const demoName = fileName.split(".")[0];
    return demoName;
  });
  fs.writeFileSync(
    path.join(__dirname, "demosComponents.json"),
    JSON.stringify(demoNames),
    { flag: "w+" }
  );
};

resolveDemos();

if (process.argv.length >= 3 && process.argv[2] === "dev") {
  fs.watch(path.join(__dirname, "demos"), (...args) => {
    const t = new Date();
    fs.writeFile(
      path.join(__dirname, "demosDir.log"),
      `${t.toLocaleDateString()} ${t.toLocaleTimeString()} ${args}\n`,
      { flag: "a" },
      function() {}
    );
    resolveDemos();
  });
}

module.exports = {
  base: process.env.base || "/",
  title: pkg.name,
  description: "🛠️ Console 端组件库",
  themeConfig: {
    version: pkg.version,
    smoothScroll: true,
    nav: [
      { text: "指南", link: "/guide/" },
      { text: "组件", link: "/component/" },
      { text: "配置", link: "/config" },
    ],
    sidebarDepth: 2,
    sidebar: {
      "/config": ["/config"],
      "/component/": [
        "",
        {
          title: "表单",
          children: [
            "formarea",
            "form",
            "input",
            "select",
            "switch",
            "datepicker",
          ],
        },
        {
          title: "表格",
          children: ["table", "pagintable", "tableheader", "tablesearcharea"],
        },
        {
          title: "页面",
          children: ["page-login", "page-fullscreen"],
        },
        {
          title: "全局方法",
          children: ["confirm"],
        },
        "icon",
        "button",
        "tree",
        "popper",
        "dialog",
      ],
    },
  },
  plugins: [
    [
      "vuepress-plugin-container",
      {
        type: "demo",
        // before(name){
        //   console.log('before',{name})
        //   return `<!-- before --><preview-component src="${name}" />`
        // },
        // after:'',

        render(tokens, idx) {
          console.log("render", tokens[idx]);
          console.log("info", tokens[idx]["info"]);
          const componentName = tokens[idx]["info"].split(" ")[1];
          console.log(componentName);

          if (tokens[idx].nesting === 1) {
            return `<preview-component src="${componentName}" />`;
          } else {
            return " ";
          }
        },

        // after:''

        // validate(...params){
        //   console.log('validate',{params})
        //   return false
        // }
      },
    ],
  ],
  alias: {
    "@": path.resolve(__dirname, "../../src"),
    "@demo": path.resolve(__dirname, "demos"),
    vue: "vue/dist/vue.common.js",
  },
  // define:{
  //   prefix,
  // },
  chainWebpack: (config) => {
    config.plugin("injections").tap(([args]) => {
      console.log({ args }, { prefix: JSON.stringify(prefix) });

      return [
        {
          ...(args ? args : {}),
          prefix: JSON.stringify(prefix),
        },
      ];
    });

    config.module
      .rule("docs-pkg-name")
      .test(/\.*$/)
      .pre()
      .include.add(path.resolve(__dirname, ".."))
      .add(path.resolve(__dirname, "../utils"))
      .end()
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        search: "pkgname",
        replace: pkg.name,
        flags: "g",
      });

    config.module
      .rule("docs-pkg-version")
      .test(/\.*$/)
      .pre()
      .include.add(path.resolve(__dirname, ".."))
      .add(path.resolve(__dirname, "../utils"))
      .end()
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        search: "pkgversion",
        replace: pkg.version,
        flags: "g",
      });

    config.module
      .rule("css-selector")
      .test(/\.*$/)
      .pre()
      .include.add(path.resolve(__dirname, "demos"))
      .end()
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        search: ".d-",
        replace: `.${prefix}-`,
        flags: "g",
      });
    config.module
      .rule("docs-mark-open")
      .test(/\.*$/)
      .pre()
      .include.add(path.resolve(__dirname, "demos"))
      .end()
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        search: "<d-",
        replace: `<${prefix}-`,
        flags: "g",
      });

    config.module
      .rule("docs-mark-close")
      .test(/\.*$/)
      .pre()
      .include.add(path.resolve(__dirname, "demos"))
      .end()
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        search: "</d-",
        replace: `</${prefix}-`,
        flags: "g",
      });

    config.module
      .rule("icon")
      .test(/\.*$/)
      .include.add(path.resolve(__dirname, "../../src/assets/iconfont"))
      .end()
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        search: "pre-icon",
        replace: `${prefix}-icon`,
        flags: "g",
      });
  },
  stylus: {
    import: [prefixStyl, path.resolve(__dirname, "../../src/style/index.styl")],
  },

  // lib,
  // chainWebpack(config){
  //   console.log(config)
  //   // console.log(path.resolve(__dirname,'../../src'))
  //   // config.resolve.alias.set('@',path.resolve(__dirname,'../../src'))
  // },
  // ...vueconfig
};
