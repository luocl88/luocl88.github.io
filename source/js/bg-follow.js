/* 让全站背景跟随当前页面的顶部大图
 *
 * 原理：Butterfly 把背景渲染成 <div id="web_bg" style="background-image:url(配置的图)">
 *       把顶部大图渲染成 <div id="page-header" style="background-image:url(本页的图)">
 *       这里把 page-header 的图复制给 web_bg，背景就跟当前页面走了。
 *
 * 首页背景 = index_img，文章页 = 该文章的 cover，归档/标签/分类页 = 各自配置的图。
 */
(function () {
  function apply() {
    var header = document.getElementById('page-header');
    var bg = document.getElementById('web_bg');
    if (!header || !bg) return;

    // 优先取行内样式，取不到再取计算样式
    var img = header.style.backgroundImage;
    if (!img || img === 'none') {
      img = window.getComputedStyle(header).backgroundImage;
    }

    // 只接受真正的图片；没有顶图的页面可能是渐变或纯色，此时保持原背景不动
    if (img && img.indexOf('url(') === 0) {
      bg.style.backgroundImage = img;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
