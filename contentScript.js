
function getNextBtn() {
  return document.getElementsByClassName('next')[0];
}

function getContinueBtn() {
  return document.getElementsByClassName('alarmClock-wrapper')[0];
}

function getVideoElement() {
  return document.getElementsByTagName('video')[0];
}

function getRejectBtn() {
  return document.getElementsByClassName('cancel')[0];
}

function isVideoEnd() {
  const video = getVideoElement();
  if (video.duration - video.currentTime < 0.1) {
    console.log('视频时长：', video.duration);
    console.log('视频当前播放量：', video.currentTime);
    return true;
  }
  return false;
}

function isVisible(ele) {
  return ele && getComputedStyle(ele).display !== 'none';
}

/**
 * 每隔5s做一次检测
 */
function action() {
  const video = getVideoElement();
  if (video && video.paused) {
    const nextBtn = getNextBtn();
    const continueBtn = getContinueBtn();
    const rejectBtn = getRejectBtn();
    console.log(nextBtn, continueBtn, rejectBtn);
    if (isVisible(nextBtn) && isVideoEnd()) {
      nextBtn.click();
    } else if (isVisible(continueBtn)) {
      continueBtn.click();
      if (continueBtn) {
        console.log('继续看视频', new Date, continueBtn);
      }
    } else if (isVisible(rejectBtn)) {
      rejectBtn.click();
    }
    if (video.paused) {
      video.play().then(() => {
        console.log('play success');
      }).catch(() => {
        console.log('play fail');
      })
    }
  }

  setTimeout(action, 5000);
}

window.onload = () => {
  setTimeout(action, 5000);
};
