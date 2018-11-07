({
  doInit: function(cmp, evt, helper) {
    const name = "askAstroPosition";
    helper.loadWidgetLocationPoints(cmp, evt, name);

    helper.setIsConsoleNavigationAttribute(cmp);

    // function to close widget on resize event
    const handleResize = $A.getCallback(function() {
      // close if widget is in open state and save status
      if (!cmp.get("v.isResizing")) helper.saveOpenClosedStatus(cmp);
      cmp.set("v.isResizing", true);
    });

    // function to handle end of resize window event
    const handleEndResize = $A.getCallback(function() {
      // get widget position
      const widgetSize = 60;
      const widgetMargin = 12;
      let posX = window.innerWidth - widgetSize - widgetMargin;
      let posY = window.innerHeight - widgetSize - widgetMargin;
      if (cmp.get("v.isPositioned")) {
        posX = cmp.get("v.posX");
        posY = cmp.get("v.posY");
        // keepAstroInWindow, saveWidgetLocationPoints, setPositionQuarter, calculateWidgetHeight
        helper.behavioralPerformanceCheck(cmp, posX, posY);
        // re-open widget if status was open before dragging
        helper.checkToReOpenWidget(cmp);
      }
      cmp.set("v.isResizing", false);
    });

    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleEndResize);
  },
  /* this function is to determine a click or click and hold (drag) event.
   * A mouseUp event is added to the window which sets the isMouseDown variable to false.
   * If the isMouseDown event is true before the setTimeout reaches 180ms, a mouseMove event is added
   * to the window and the widget can be dragged across the page.
   * The mouseUp event removes the listeners from the window. */
  handleMouseDown: function(cmp, evt, helper) {
    // use dataset values to determine widget circle was clicked and not open section components
    if (evt.target.dataset) {
      if (evt.target.dataset.authClick === "canClick") {
        let isMouseDown = true;
        let isMouseDownPressed = false;
        let mouseMoveAdded = false;

        const [offsetX, offsetY] = helper.calculateOffsetXY(cmp, evt);

        const widget = cmp.find("widget").getElement();

        setTimeout(
          $A.getCallback(function() {
            if (isMouseDown) {
              isMouseDownPressed = true;
              mouseMoveAdded = true;
              // check if widget is in open state
              helper.saveOpenClosedStatus(cmp);
              // update css visibility and effects
              cmp.set("v.isDragging", true);
              // set ghost image to current widget coords
              cmp.set("v.posXGhost", cmp.get("v.posX"));
              cmp.set("v.posYGhost", cmp.get("v.posY"));
              // add mousemove listener
              window.addEventListener("mousemove", mouseMoveHandler);
            }
          }),
          180
        );

        const mouseMoveHandler = $A.getCallback(function(evt) {
          // set widget to follow mouse coords
          widget.style.left = evt.clientX - offsetX + "px";
          widget.style.top = evt.clientY - offsetY + "px";
        });

        const mouseUpHandler = $A.getCallback(function(evt) {
          // remove mousemove listener if it has been added
          if (mouseMoveAdded) {
            window.removeEventListener("mousemove", mouseMoveHandler);
          }
          // remove this mouseup listener
          window.removeEventListener("mouseup", mouseUpHandler);
          // if mousedown and mousemove, simulates drag ending
          if (isMouseDown && isMouseDownPressed) {
            isMouseDown = false;
            // keepAstroInWindow, saveWidgetLocationPoints, setPositionQuarter, calculateWidgetHeight
            helper.behavioralPerformanceCheck(cmp, evt.clientX - offsetX, evt.clientY - offsetY);
            // re-open widget if status was open before dragging
            helper.checkToReOpenWidget(cmp);
            cmp.set("v.isDragging", false);
            cmp.set("v.isPositioned", true);
          }
          // if mousedown but no mousemove then prevent mousemove, simulates onclick
          if (isMouseDown && !isMouseDownPressed) {
            isMouseDown = false;
            if(cmp.get("v.isOpen")) cmp.set("v.isOpen", false);
            else cmp.set("v.isOpen", true);
          }
        });
        window.addEventListener("mouseup", mouseUpHandler);
      }
    }
  },
  handleDragStart: function(cmp, evt, helper) {
    evt.preventDefault();
    //return false;
  }
});
