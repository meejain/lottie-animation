// Delayed: load Lottie script only when the page has a Lottie block.
// Moves script fetch/parse off the critical path (better LCP/TBT in PageSpeed).
// Blocks still load the script on first viewport intersect if not yet loaded.
(function () {
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
  if (document.querySelector('.lottie-container')) {
    loadScript('https://unpkg.com/lottie-web@5.12.2/build/player/lottie_light.min.js');
  }
})();
