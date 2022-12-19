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

let frequenceIndex = 0;

let startTime = new Date().valueOf();

const reachMaxTime = () => {
  if (new Date().valueOf() - startTime > 70 * 1000) {
    return true;
  }
  return false;
};

/**
 * 页面是否需要关闭检测
 */
const pageFinishedDetect = () => {
  const tipsRef = document.querySelector('#bestMinutesTips');
  if ((tipsRef && getComputedStyle(tipsRef).display !== 'none') || reachMaxTime()) {
    window.close();
  }
  frequenceIndex += 1;
  if (frequenceIndex > 10) {
    frequenceIndex = 0;
    document.querySelector('.studyCourseTimeRefresh')?.click();
  }
};

/**
 * 控制全流程
 */
const main = () => {
  try {
    console.log('开始执行循环逻辑');
    pageFinishedDetect();

    const links = initLink();
    const video = document.querySelector('video');

    if (video.duration - video.currentTime <= 1) {
      const matchedIndex = links.findIndex((item) => item.key === location.href);
      links[matchedIndex + 1]?.aTag?.click();
    } else if (video?.paused) {
      video.muted = true;
      // console.log('触发video点击');
      video?.play();
    }
  } catch (error) {
    console.log(error);
  }
};

setInterval(() => {
  // if (document.visibilityState === 'hidden') {
  //   console.log('不可见，不执行循环逻辑');
  //   return;
  // }
  main();
}, 5000);
