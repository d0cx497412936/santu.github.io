export default {
  type: "lineInput",
  componentName: "line-input",
  id: "input-1",
  attribute: {
    placeholder: "标题",
    defaultValue: "",
    title: "",
    description: "",
    descriptionPlaceholder:
      "简介",
    must: true,
    screenshotProof: false,
    outline: "Uncategorized",
    companyBase: false,
    questions: [
      {
        placeholder: "子问题1",
        value: "",
      },
      {
        placeholder: "子问题2",
        value: "",
      }
    ],
  },
};