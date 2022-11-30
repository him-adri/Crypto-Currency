import React from "react";
import "./alert.css"

const AlertBox = () => {

    function functionAlert(msg, myYes) {
        var confirmBox = document.getElementById("confirm");
        confirmBox.find(".message").text(msg);
        confirmBox.find(".yes").unbind().click(function() {
           confirmBox.hide();
        });
        confirmBox.find(".yes").click(myYes);
        confirmBox.show();
     }

  return (
    <div>
      <div id="confirm">
        <div class="message">This is a warning message.</div>
        <button class="yes">OK</button>
      </div>
      <input type="button" value="Click Me" onclick="functionAlert();" />
    </div>
  );
};

export default AlertBox;
