const typeMap = {
  // formarea: "表单"
};
const globalNameMap = {
  basic: '基础'
};
const nameMap={
  formarea:{
    'all-item':'各种表单项'
  }
}
export default filename => {
  const [type, ...key] = filename.split("-");
  const name = key.join('-')
  const spacePadding = (str)=>{
    const re = /^[a-zA-Z]/
    return re.test(str)?' ':''
  }
  return `${(nameMap[type]||{})[name] || globalNameMap[name]||name}${spacePadding(typeMap[type] || type)[0]}${typeMap[type] || type}`;
};
