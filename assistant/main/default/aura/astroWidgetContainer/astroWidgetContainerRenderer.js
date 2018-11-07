({
  afterRender: function(cmp, helper) {
    this.superAfterRender();
    if (!cmp.isRendered()) {
      return;
    }

    // calculate height get widgetPosY.  This attribute has been passed to the cmp from the parent when rendered.
    const container = cmp.find("container");
    if (container) {
      helper.calcHeight(cmp, cmp.get("v.widgetPosY"));
    }
  }
});
