export default {
  type: "lineRadio",
  componentName: "line-radio",
  id: "",
  attribute: {
    placeholder: "标题",
    defaultValue: "",
    title: "",
    description: "",
    descriptionPlaceholder: "简介",

    options: [
      {
        name: "选项 1",
        haveAfterText: false,
        afterText: "",
        afterTextRequired: false,
        afterTextFormat: "Unlimited format",
      },
      {
        name: "选项 2",
        haveAfterText: false,
        afterText: "",
        afterTextRequired: false,
        afterTextFormat: "Unlimited format",
      },
    ],
    outline: "Uncategorized",
    must: true,
    haveOptionSettings: true,
    screenshotProof: false,
    companyBase: false,
    logical: {},
  },
};
