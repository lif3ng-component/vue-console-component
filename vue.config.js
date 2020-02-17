const fs = require("fs");
const os = require("os");
const path = require("path");
console.log("vue config loaded");

const { prefix } = process.env;

// write stylus prefix file
const prefixStyl = path.join(os.tmpdir(), "prefix.styl");
fs.writeFileSync(prefixStyl, `prefix = ${prefix}`, {
  flag: "w+"
});
// console.log(prefixStyl);
module.exports = {
  outputDir: "lib",
  css: {
    loaderOptions: {
      stylus: {
        import: [prefixStyl]
      }
    }
  },
  chainWebpack: config => {
    config.devtool("source-map");
    config.plugin("define").tap(([args]) => {
      console.log({ args }, { prefix: JSON.stringify(prefix) });
      return [
        {
          ...args,
          prefix: JSON.stringify(prefix)
        }
      ];
    });

    config.module
      .rule("icon")
      .test(/\.*$/)
      .include.add(path.resolve(__dirname, "src/assets/iconfont"))
      .end()
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        search: "pre-icon",
        replace: `${prefix}-icon`,
        flags: "g"
      });
  }
};
