/***********************************
File:    sgWidgets.js
Author  : filippo pacini <filippo.pacini@gmail.com>
License :
The contents of this file are subject to the Mozilla Public
License Version 1.1 (the "License"); you may not use this file
except in compliance with the License. You may obtain a copy of
the License at http://www.mozilla.org/MPL/

Software distributed under the License is distributed on an "AS IS"
basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
the License for the specific language governing rights and
limitations under the License.
The Initial Developer of the Original Code is S.G. Consulting
srl. Portions created by S.G. Consulting s.r.l. are Copyright (C)
2008 S.G. Consulting srl. All Rights Reserved.

************************************/
var sgWidgets = function() {
  return {
    _startSlide: function(objToScroll, speed, height) {
      if (objToScroll.scroll) {
	var newTop;
	var objHeight = objToScroll.offsetHeight;
	var top = objToScroll.offsetTop;
	if(objToScroll.direction === 'down') {
	  if ((objHeight+top) > height) {
	    newTop = parseInt(objToScroll.style.top.replace("px", ""));
	    newTop = newTop-speed;
	    objToScroll.style.top = newTop + "px";
	  }
	}
	if(objToScroll.direction === 'up') {
	  if (top < 0) {
	    newTop = top+speed;
	    objToScroll.style.top = newTop + "px";
	  }
	}
	return;
      }
    },

    slider: function(conf) {
      var id = conf['id'];
      var objToScroll = document.getElementById(id);
      var speed = conf['speed'] || 5;
      var height = conf['height'] || 200;
      var upBtn = document.getElementById(conf['up']);
      var downBtn = document.getElementById(conf['down']);
      /* dom manipulation */
      var container = document.createElement("div");
      var parent = objToScroll.parentNode;
      container.id="sgW_sliderContainer";
      parent.insertBefore(container,objToScroll);
      parent.removeChild(objToScroll);
      /* style container */
      container.style.position = "relative";
      container.style.height = height + "px";
      container.style.overflow = "hidden";
      objToScroll.style.position = "absolute";
      objToScroll.style.top = "0px";
      objToScroll.style.left = "0px";
      container.appendChild(objToScroll);
      /* attach event listener to buttons */
      upBtn.onclick = function() {
	objToScroll.scroll=true;
	objToScroll.direction = 'up';
	sgWidgets._startSlide(objToScroll, speed, height);
      };
      downBtn.onclick = function() {
	objToScroll.scroll=true;
	objToScroll.direction = 'down';
	sgWidgets._startSlide(objToScroll, speed, height);
      };
      objToScroll.scroll = false;
    }
  };
}();