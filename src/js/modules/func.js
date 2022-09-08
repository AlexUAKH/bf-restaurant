export function isWebp() {
  function testWebP(cb) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      cb(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    let className = support ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}