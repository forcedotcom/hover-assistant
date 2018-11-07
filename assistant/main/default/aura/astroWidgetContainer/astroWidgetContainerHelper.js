({
  /* calulates height of section element */
  calcHeight: function(cmp, posY) {
    // height of window
    const h = window.innerHeight;
    // margin above/below widget
    const widgetMargin = 15;
    // margin in window
    const windowMargin = 12;
    // widget circle height
    const circleHeight = 60;
    // widget section height
    let pixels;
    // calculate height
    if (posY >= h / 2) {
      // widget positioned in bottom half of sceen, section opens upwards
      pixels = posY - widgetMargin - windowMargin;
    } else {
      // widget positioned in top half of screen, section opens downwards
      pixels = h - posY - circleHeight - widgetMargin - windowMargin;
    }
    cmp.set("v.widgetHeight", pixels);
  }
});
