/**
 * 初始化当前页面可刷链接队列
 * @returns
 */
const initLink = () => {
  const list = [];
  document.querySelectorAll('.course-con a').forEach((item) => {
    list.push({
      aTag: item,
      key: item.href,
    });
  });
  return list;
};

/**
 * 控制全流程
 */
const main = () => {
  try {
    console.log('开始执行循环逻辑');
    const links = initLink();
    const video = document.querySelector('video');

    const isPaused = () => video.paused;
    const isFinished = () => video.duration - video.currentTime < 10;

    if (isFinished()) {
      const matchedIndex = links.findIndex((item) => item.key === location.href);
      links[matchedIndex + 1]?.aTag?.click();
    } else if (isPaused()) {
      video.play();
    }
  } catch (error) {
    console.log(error);
  }
};

setInterval(() => {
  main();
}, 5000);
