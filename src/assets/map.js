export function loadBMap(funcName) {
  var script = document.createElement("script");
  script.src =
    "http://api.map.baidu.com/api?v=2.0&ak=7a2c5927d5bbd9007f6811da63019bd0&callback=" +
    funcName;
  document.body.appendChild(script);
}
