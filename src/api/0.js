function sortClass(sortData) {
  const groupBy = (array, f) => {
    let groups = {};
    array.forEach((o) => {
      let group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map((group) => {
      return groups[group];
    });
  };
  const sorted = groupBy(sortData, (item) => {
    // console.log("分组的对象", item.name);
    return item.name; // 返回需要分组的对象
  });
  // console.log(sorted);
  return sorted;
}
var data = [
  { id: 1, name: "小明", type: "分类" },
  { id: 2, name: "大明", type: "分钱" },
  { id: 3, name: "中明", type: "分兵" },
  { id: 4, name: "小明", type: "分分" },
  { id: 5, name: "雷明", type: "分兵" },
  { id: 6, name: "小明", type: "分兵" },
  { id: 7, name: "出明", type: "分钱" },
  { id: 8, name: "中明", type: "分钱" },
  { id: 9, name: "出明", type: "分分钱" },
  { id: 10, name: "雷明", type: "分分钱" },
];
console.log(data);
console.log(sortClass(data));
