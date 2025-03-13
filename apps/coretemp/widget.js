(() => {
  var settings = {};
  var CORESensorStatus = false;
  var CORESensor_ConnectCheck;
  // draw your widget
  function draw() {
    if (!settings.widget)
      return;
    g.reset();
    g.setFont("6x8", 1).setFontAlign(0, 0);
    g.setFontAlign(0, 0);
    g.clearRect(this.x, this.y, this.x + 23, this.y + 23);

    if (CORESensorStatus) {
      g.setColor("#0f0"); // green
    } else {
      g.setColor(g.theme.dark ? "#333" : "#CCC"); // off = grey
    }

    g.drawImage(
      atob("DAyBAAHh0js3EuDMA8A8AWBnDj9A8A=="),
      this.x + (24 - 12) / 2, this.y + 1);
    g.setColor(-1);
  }
  // Called by sensor app to update status
  function reload() {
    settings = require("Storage").readJSON("coretemp.json", 1) || {};
    if (!settings.widget) {
      delete WIDGETS["coretemp"];
      return;
    }
    if (settings.enabled) {
      WIDGETS["coretemp"].width = 24;
    } else {
      WIDGETS["CORESensor"].width = 0;
    }
  }

  if (Bangle.hasOwnProperty("isCORESensorConnected")) {
    CORESensor_ConnectCheck = setInterval(function () {
      if (Bangle.isCORESensorConnected() != CORESensorStatus) {
        CORESensorStatus = Bangle.isCORESensorConnected();
        WIDGETS["coretemp"].draw();
      }
    }, 10000); //runs every 10 seconds
  }
  // add the widget
  WIDGETS["coretemp"] = {
    area: "tl",
    width: 24,
    draw: draw,
    reload: function () {
      reload();
      Bangle.drawWidgets(); // relayout all widgets
    }
  };
  // load settings, set correct widget width
  reload();
})()
