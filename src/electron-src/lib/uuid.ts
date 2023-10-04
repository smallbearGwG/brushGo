const uuid = () => {
  let time = new Date().getTime(); // 获取当前时间戳
  const uuid = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (time + Math.random() * 16) % 16 | 0;
      time = Math.floor(time / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

export default uuid;
