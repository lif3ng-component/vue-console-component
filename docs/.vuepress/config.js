const path = require('path')
const os = require('os')
const fs = require('fs')
const prefix = 'd'

const prefixStyl = path.join(os.tmpdir(), "prefix.styl");
fs.writeFileSync(prefixStyl, `prefix = ${prefix}`, {
  flag: "w+"
});

module.exports = {
  alias:{
    '@':path.resolve(__dirname,'../../src'),
  },
  define:{
    prefix:'d'
  },
  stylus:{
    import: [prefixStyl,path.resolve(__dirname,'../../src/style/index.styl')]
  }
  // lib,
  // chainWebpack(config){
  //   console.log(config)
  //   // console.log(path.resolve(__dirname,'../../src'))
  //   // config.resolve.alias.set('@',path.resolve(__dirname,'../../src'))
  // },
  // ...vueconfig
}