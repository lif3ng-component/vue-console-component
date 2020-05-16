const fs = require("fs");
const path = require("path");
const { execSync, execFileSync } = require("child_process");
const stylusTpl = (name) => `
@import "~@/style/vars.styl"
@import "~@/style/${name}.styl"
`;

const jsTpl = ({ path, name }) => `
import "./${name}.styl";
import ${name} from '@/components/${path}';
export default ${name};
`;

const componentList = ["button", "table"];

const componentPathMap = {
  button: "Button.js",
  table: "Table.vue",
};

fs.mkdirSync(path.join(__dirname, ".components"), { recursive: true });
const projectPath = path.join(__dirname, "../..");
fs.mkdirSync(path.join(projectPath, "lib", "components"), { recursive: true });
fs.mkdirSync(path.join(projectPath, "lib", "style"), { recursive: true });
componentList.forEach((name) => {
  const styleFd = fs.openSync(
    path.join(__dirname, ".components", `${name}.styl`),
    "w+"
  );
  fs.writeSync(styleFd, stylusTpl(name));
  const jsFd = fs.openSync(
    path.join(__dirname, ".components", `${name}.js`),
    "w+"
  );
  fs.writeSync(jsFd, jsTpl({ name, path: componentPathMap[name] }));
  console.log({ name });

  execSync(
    `npx vue-cli-service build --target lib --name ${name} --dest .components src/lib/.components/${name}.js`
  );
  fs.renameSync(
    path.join(projectPath, ".components", `${name}.umd.min.js`),
    path.join(projectPath, "lib/components", `${name}.js`)
  );
  fs.renameSync(
    path.join(projectPath, ".components", `${name}.css`),
    path.join(projectPath, "lib/style", `${name}.css`)
  );
});
