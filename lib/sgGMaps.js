/***********************************
File    : sgGMaps.js
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
2008-2010 S.G. Consulting srl. All Rights Reserved.

************************************/

var sgGMaps = function() {
  return {
    _zoom: 10,

    init: function(idCanvas, options) {
      if (options.zoom) {
	sgGMaps._zoom = options.zoom;
      }
      var startLat = options.lat || 43.302726;
      var startLong = options.long || 11.352578;
      if (GBrowserIsCompatible()) {
        var map = new GMap2(document.getElementById(idCanvas));
	map.setCenter(new GLatLng(startLat, startLong), sgGMaps._zoom);
        map.setUIToDefault();
	return map;
      }
    },

    addMark: function(map, address, ev, listener) {
      var geocoder = new GClientGeocoder();
      geocoder.getLatLng(
	address,
	function(point) {
	  if (!point) {
            alert(address + " not found");
	  } else {
            map.setCenter(point, sgGMaps._zoom);
            var marker = new GMarker(point);
            map.addOverlay(marker);
	    if (ev==='click') {
	      var cb = function() {marker.openInfoWindowHtml(listener());};
	      GEvent.addListener(marker, ev, cb);
	    } else {
	      GEvent.addListener(marker, ev, listener);
	    }
	  }
	}
      );
    },

    addMarks: function(map, itemList) {
      itemList.map(function(x) {sgGMaps.addMark(map,
						x.address,
						'click',
						function(){return x.toString(x);}
					       );
			       });
    }
  };
}();
