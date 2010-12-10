/***********************************
File:    sg.forms.js
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

sg.forms = Object.create(sg);
sg.forms.extend('init',
		function(rules) {
		    console.log("Init called");
		    sg.forms.rules = rules;
		    var idElements = [];
		    for (var field in rules) {
			if (rules.hasOwnProperty(field)) {
			    idElements[idElements.length] = field;
			}
		    }
		    idElements.map(function(idElement) {return sg.forms.prepare(idElement, rules[idElement]);});
		    return sg.forms;
		});

/* prepare a form element for validation setting styles, required attributes when available, etc... */
sg.forms.extend('prepare',
		function(idEl, rules) {
		    var el = document.getElementById(idEl);
		    if (el) {
			var className = el.getAttribute('class');
			if (rules.indexOf('notEmpty') != -1) {
			    if (sg.forms.inputHasAttribute('required')) {
				el.setAttribute('required', 'required');
			    }
			    if (className) {
				el.setAttribute('class', className+' required');
			    } else {
				el.setAttribute('class', 'required');
			    }
			}
		    }
		    return ;
		});

sg.forms.extend('inputHasAttribute',
		function(testAttr) {
		    return (testAttr in document.createElement('input'));
		});
sg.forms.extend('inputHasType',
		function(testType) {
		    var i = document.createElement('input');
		    i.setAttribute('type', testType);
		    return (i.type == testType);
		});
// check validity of a rule
sg.forms.extend('checkRule', 
		function(idElement, rule, lang) {
		    //console.log(idElement + ": "+ rule);
		    return idElement + ": "+ rule;
		});

// check all rules on a field
sg.forms.extend('isValid', 
		function(idElement, rules, lang) {
		    return rules.map(function(idElement, rule) {return sg.forms.checkRule(idElement, rule, lang);});
		});
// run the validate function on each rule
sg.forms.extend('validate',
		function(rules, lang) {
		    var idElements = [];
		    for (var field in rules) {
			if (rules.hasOwnProperty(field)) {
			    idElements[idElements.length] = field;
			}
		    }
		    return idElements.map(function(idElement) {return sg.forms.isValid(idElement, rules[idElement], lang);});
		});

/*  TODO: html5 
 *  add support and checks for:
 *  - placeholder ?
 *  - type=email
 *  - type=url
 *  - type=number (see diveintohtml5.org fo details)
 *  - type=date (try to use a date control and fallback to jquery if not found)
 *  - type=search
 *  use form validation if available
 */

var sgForms = function() {
  return {
    // form labels
    _formLabels: {},

    // get error messages
    _getErrMsg: function(baseMsg, frmElem) {
      if (sgForms._formLabels[frmElem.id]) {
	return baseMsg.replace('##name##', sgForms._formLabels[frmElem.id]);
      } else if (frmElem.title) {
	return baseMsg.replace('##name##', frmElem.title);
      } else if (frmElem.name) {
	return baseMsg.replace('##name##', frmElem.name);
      } else { //should never get here
	return baseMsg;
      }
    },

    // notEmpty Validator
    _notEmpty: function(field, fieldValue, lang) {
      var errMsg;
      if (lang == 'it') {
	errMsg = sgForms._getErrMsg("Inserire un valore nel campo ##name##", field);
      } else { //default english message
	errMsg = sgForms._getErrMsg("Fill in form field ##name##", field);
      }
      if (fieldValue.is_empty()) {
	return errMsg;
      }
      return true;
    },

    // Email Validator
    _isEmail: function(field, fieldValue, lang) {
      var strMailFilter   = /^.+@.+\..{2,3}$/;
      var strIllegalChars = /[\(\)<>\,\;\:\\\/\*\-\+\=\"\[\]]/;
      var email = fieldValue;
      var errMsg;
      if (lang == 'it') {
	errMsg = sgForms._getErrMsg("##name## non valida", field);
      } else {//default english message
	errMsg = sgForms._getErrMsg("Invalid ##name##", field);
      }
      if (email && !email.match(strIllegalChars) && !strMailFilter.test(email)) {
	return errMsg;
      }
      return true;
    },

    // Phone Validator
    _isPhone: function(field, fieldValue, lang) {
      var phoneNumber = fieldValue.replace(/[\ \(\)<>\,\;\:\\\/\*\-\+\=\"\[\]]/g, '');
      var errMsg;
      if (lang == 'it') {
	errMsg = sgForms._getErrMsg("##name## non valida", field);
      } else { //default english message
	errMsg = sgForms._getErrMsg("Invalid ##name##", field);
      }
      if (phoneNumber && isNaN(phoneNumber)) {
	return errMsg;
      }
      return true;
    },

    // Number Validator
    _isNumber: function(field, fieldValue, lang) {
      var valueConv = fieldValue.replace(',', '.');
      var errMsg;
      if (lang == 'it') {
	errMsg = sgForms._getErrMsg("Formato non valido per il campo ##name##", field);
      } else { //default english message
	errMsg = sgForms._getErrMsg("Invalid format in field ##name##", field);
      }
      if (valueConv && isNaN(valueConv)) {
	return errMsg;
      }
      return true;
    },

    // Integer Validator
    _isInt: function(field, fieldValue, lang) {
      var valueConv = fieldValue.replace(',', 'a').replace('.', 'a'); //force error in presence of , or .
      var errMsg;
      if (lang == 'it') {
	errMsg = sgForms._getErrMsg("Formato non valido per il campo ##name##", field);
      } else { //default english message
	errMsg = sgForms._getErrMsg("Invalid format in field ##name##", field);
      }
      if (valueConv && isNaN(valueConv)) {
	return errMsg;
      }
      return true;
    },

    // Float Validator
    _isFloat: function(field, fieldValue, lang) {
      var valueConv = fieldValue.replace(',', '.');
      var errMsg;
      if (lang == 'it') {
	errMsg = sgForms._getErrMsg("Formato non valido per il campo ##name##", field);
      } else { //default english message
	errMsg = sgForms._getErrMsg("Invalid format in field ##name##", field);
      }
      if (valueConv && isNaN(parseFloat(valueConv))) {
	return errMsg;
      }
      return true;
    },

    // isChecked Validator: check if a checkbox is checked
    _isChecked: function(field, fieldValue, lang) {
      var errMsg;
      if (lang == 'it') {
	errMsg = sgForms._getErrMsg("Selezionare il campo ##name##", field);
      } else { //default english message
	errMsg = sgForms._getErrMsg("Check the field ##name##", field);
      }
      if (!field.checked) {
	return errMsg;
      }
      return true;
    },

    _checkRule: function(field, fieldValue, lang) {
      inner = function(rule) {
	// check rule
	if (rule == 'notEmpty') {
	  return sgForms._notEmpty(field, fieldValue, lang);
	}
	if (rule == 'email') {
	  return sgForms._isEmail(field, fieldValue, lang);
	}
	if (rule == 'number') {
	  return sgForms._isNumber(field, fieldValue, lang);
	}
	if (rule == 'integer') {
	  return sgForms._isInt(field, fieldValue, lang);
	}
	if (rule == 'float') {
	  return sgForms._isFloat(field, fieldValue, lang);
	}
	if (rule == 'isChecked') {
	  return sgForms._isChecked(field, fieldValue, lang);
	}
	if (rule == 'phone') {
	  return sgForms._isPhone(field, fieldValue, lang);
	}
	// try if rule is an executable and fallback to a catchall rule
	try {
	  return rule(field, fieldValue, lang);
	} catch (e) {
	  return e;
	}
      };
      return inner;
    },

    _isValid: function(rules, lang) {
      inner = function(field, acc) {
	try {
	  var fieldRef = document.getElementById(field);
	  var rulesToCheck = rules[field];
	  results = sg.fun.map(sgForms._checkRule(fieldRef, fieldRef.value, lang), rulesToCheck);
	  return acc.concat(sg.fun.filter(function(val) {return val!==true;}, results));
	} catch (e) {
	  return acc.concat("Error in rule "+field+": "+e.toString());
	}
      };
      return inner;
    },

    validate: function(rules, lang) {
      //search labels
      sgForms._formLabels = {};
      var lbls=document.getElementsByTagName("label");
      for(var i=0; i<lbls.length; i++) {
	sgForms._formLabels[lbls[i].htmlFor] = lbls[i].innerHTML;
      }
      var keys = [];
      for (var field in rules) {
	if (rules.hasOwnProperty(field)) {
	  keys[keys.length] = field;
	}
      }
      return sg.fun.foldl(sgForms._isValid(rules, lang), keys, []);
    },

    validateAlert: function(rules) {
      var lang = 'en';
      if (arguments.length > 1) {
	lang = arguments[1];
      }
      result = sgForms.validate(rules, lang);
      if (result.length>0) {
	alert(result.join('\n'));
	return false;
      }
      return true;
    },

    validateBrString: function(rules) {
      var lang = 'en';
      if (arguments.length > 1) {
	lang = arguments[1];
      }
      result = sgForms.validate(rules, lang);
      if (result) {
	return result.join('<br>');
      }
      return "";
    },

    validateString: function(rules) {
      var lang = 'en';
      if (arguments.length > 1) {
	lang = arguments[1];
      }
      result = sgForms.validate(rules, lang);
      if (result) {
	return result.join('\n');
      }
      return "";
    }
  };
}();
