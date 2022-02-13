function url(o) {
  o.siteUrl = "http://www.baidu.com";
  o = new Object();
  o.siteUrl = "http://www.google.com";
}
let webSite = new Object();
url(webSite);
ht;
console.log(webSite.siteUrl);
