/***********************************
File:    sgForms.js
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
	  results = sgFun.map(sgForms._checkRule(fieldRef, fieldRef.value, lang), rulesToCheck);
	  return acc.concat(sgFun.filter(function(val) {return val!==true;}, results));
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
      return sgFun.foldl(sgForms._isValid(rules, lang), keys, []);
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
