({
  /* calulates height of section element */
  reCalcHeight: function(cmp, evt, helper) {
    const posY = evt.getParam("posY");
    helper.calcHeight(cmp, posY);
  },
  handleToggleEvent: function(cmp, evt, helper) {
    const openStatus = evt.getParam("openStatus");
    cmp.set("v.widgetStatus", openStatus);
  }
});
