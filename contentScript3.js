const initMenuItems = () => {
  const menuList = [];

  document.querySelectorAll('.firstmenu').forEach((liNode) => {
    menuList.push({
      isFinished: !!liNode.querySelector('.icon_1'),
      aTag: liNode.querySelector('.list-title'),
    });
  });

  return menuList;
};

const main = () => {
  const menuList = initMenuItems();

  console.log(menuList);

  const matchItem = menuList.find((item) => !item.isFinished);

  if (matchItem) {
    matchItem.aTag.click();
  }
};

window.addEventListener('load', () => {
  setTimeout(main, 1000);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      location.reload();
    }
  });
});
