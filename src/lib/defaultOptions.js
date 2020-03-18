export default {
  formareaItemType: "input",
  // ({ page, size }) => params to request
  paginArgsHandler: args => args,
  // ( prop, sortType ) => params to request
  sortArgsHandler: (prop, sortType) =>
    sortType ? { sort: `${prop},${sortType}` } : {},
  paginSizeOptions: [10, 20, 30],
  paginSize: 10,

  selectLabelName: "name",
  selectValueName: "id",

  stringMap: {},
  selectOptionsMap: {}
};
