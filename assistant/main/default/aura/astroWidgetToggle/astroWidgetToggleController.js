({
  handleClick: function(cmp, evt, helper) {
    // Toggle OPEN/CLOSED State

    let currStatus = "OPEN";
    if (cmp.get("v.isOpenStatus") === "OPEN") {
      currStatus = "CLOSED";
    }

    const toggleEvent = $A.get("e.c:astroWidgetToggleEvent");
    toggleEvent.setParams({
      openStatus: currStatus
    });
    toggleEvent.fire();
    cmp.set("v.isOpenStatus", currStatus);
  }, 
  handleToggleEvent : function(cmp, evt, helper) {
    var openStatus = evt.getParam("openStatus");
    cmp.set("v.isOpenStatus", openStatus);
  }
});
