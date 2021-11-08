const globby = require("globby");
const yaml = require("js-yaml");
const fs = require("fs");
// Use the following to frontload docs
// Uncomment the following line when we have an intro doc
// var docs = ["expander/expander"];
var docs = [];

// Change these variables to match your doc path
const relativePath = "expander";
const absolutePath = "/api/expander";
function genEndpoints() {
  const endpoints = [];
  // Absolute path from project root
  specs = globby.sync(["./static/oas/expander/*.yml"], {
    absolute: false,
    objectMode: true,
    deep: 1,
    onlyDirectories: false,
  });
  specs.map((spec) => {
    const specContents = fs.readFileSync(spec.path, "utf8");
    const data = yaml.load(specContents);
    const categoryLabel = data.info.title;
    const docId = categoryLabel
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .replace("--", "")
      .toLowerCase();
    const paths = data.paths;
    var category = {
      type: "category",
      label: categoryLabel,
    };
    var items = [`${relativePath}/${docId}`];
    for ([path, methods] of Object.entries(paths)) {
      for ([method, attributes] of Object.entries(methods)) {
        const operationId = attributes.operationId ?? "none";
        const linkLabel = attributes.summary ?? "none";
        const item = {
          type: "link",
          label: linkLabel,
          href: `${absolutePath}/${docId}#operation/${operationId}`,
          customProps: {
            method: method,
          },
        };
        items.push(item);
      }
    }
    category.items = items;
    endpoints.push(category);
  });
  return endpoints;
}
const endpoints = genEndpoints();
const sidebar = docs.concat(endpoints);
module.exports = {
  sidebar: sidebar,
};
