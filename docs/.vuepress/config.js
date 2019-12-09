const path = require('path')
const os = require('os')
const fs = require('fs')
const dotenv = require('dotenv')

const { prefix } = dotenv.config({ path: path.resolve(__dirname,'../../.env')}).parsed

const prefixStyl = path.join(os.tmpdir(), "prefix.styl");

fs.writeFileSync(prefixStyl, `prefix = ${prefix}`, {
  flag: "w+"
});

const demos = fs.readdirSync(path.resolve(__dirname,'demos'))
const demoNames = demos.map((fileName)=>{
  const demoName = fileName.split('.')[0]
  return demoName
})

fs.writeFileSync(path.join(__dirname,'demosComponents.json'),JSON.stringify(demoNames),{flag:'w+'})

// process.exit(0)
module.exports = {
  plugins:[
    [
      'vuepress-plugin-container',
      {
        type: 'demo',
        // before(name){
        //   console.log('before',{name})
        //   return `<!-- before --><preview-component src="${name}" />`
        // },
        // after:'',

        render(tokens, idx){
          console.log('render',tokens[idx])
          console.log('info',tokens[idx]['info'])
          const componentName = tokens[idx]['info'].split(' ')[1]
          console.log(componentName)
          
          if (tokens[idx].nesting === 1) {
            return `<preview-component src="${componentName}" />`
          }else{
            return ' '
          }
        },
        
        // after:''
        
        // validate(...params){
        //   console.log('validate',{params})
        //   return false
        // }
      }
    ]
  ],
  alias:{
    '@':path.resolve(__dirname,'../../src'),
    '@demo':path.resolve(__dirname,'demos'),
    'vue':'vue/dist/vue.common.js'
  },
  // define:{
  //   prefix,
  // },
  chainWebpack: config => {
    config.plugin("injections").tap(([args]) => {
      console.log({ args }, { prefix: JSON.stringify(prefix) });
      return [
        {
          ...(args?args:{}),
          prefix: JSON.stringify(prefix)
        }
      ];
    });

    config.module
      .rule("docs-mark-open")
      .test(/\.*$/)
      .include.add(path.resolve(__dirname, "demos"))
      .end()
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        search: "<d-",
        replace: `<${prefix}-`,
        flags: "g"
      });

      config.module
      .rule("docs-mark-close")
      .test(/\.*$/)
      .include.add(path.resolve(__dirname, "demos"))
      .end()
      .use("string-replace-loader")
      .loader("string-replace-loader")
      .options({
        search: "</d-",
        replace: `</${prefix}-`,
        flags: "g"
      });
  },
  stylus:{
    import: [prefixStyl,path.resolve(__dirname,'../../src/style/index.styl')]
  },
  // lib,
  // chainWebpack(config){
  //   console.log(config)
  //   // console.log(path.resolve(__dirname,'../../src'))
  //   // config.resolve.alias.set('@',path.resolve(__dirname,'../../src'))
  // },
  // ...vueconfig
}