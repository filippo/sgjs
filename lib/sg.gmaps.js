/***********************************
File    : sg.gmaps.js
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

sg.gmaps = Object.create(sg);
// default zoom factor
sg.gmaps.extend('_zoom', 10);
sg.gmaps.extend('init', 
		function(idCanvas, options) {
		    if (options.zoom) {
			sg.gmaps._zoom = options.zoom;
		    }
		    var startLat = options.lat;
		    var startLong = options.long;
		    if (GBrowserIsCompatible()) {
			var map = new GMap2(document.getElementById(idCanvas));
			if (startLat && startLong) {
			    map.setCenter(new GLatLng(startLat, startLong), sg.gmaps._zoom);			    
			}
			map.setUIToDefault();
			return map;
		    }
		    return undefined;
		});
sg.gmaps.extend('addMark', 
		function(map, address, ev, listener) {
		    var geocoder = new GClientGeocoder();
		    geocoder.getLatLng(
			address,
			function(point) {
			    if (!point) {
				alert(address + " not found");
			    } else {
				map.setCenter(point, sg.gmaps._zoom);
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
		});
sg.gmaps.extend('addMarks', 
		function(map, itemList) {
		    itemList = itemList.map(function(x) {
						if (x.infoHtml) {return x;}
						x.infoHtml = function(el){return el.address;};
						return x;
					    });
		    itemList.map(function(x) {
				     sg.gmaps.addMark(map,
						      x.address,
						      'click',
						      function(){return x.infoHtml(x);}
						     );
				 });
		});
