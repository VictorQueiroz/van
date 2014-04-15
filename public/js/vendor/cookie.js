(function(){
  Cookie = function () {
    'use strict';
  }

  Cookie.prototype.new = function (cName, cValue, expireDays) {
    if(cName && cValue) {
      var date = new Date();
      date.setTime(date.setTime()+(expireDays*24*60*60*1000));
      expireDays = date.toGMTString();

      document.cookie = cName + '=' + cValue + '; expires=' + expireDays;
    }
    else
      return getCookie (cName);
  }

  Cookie.prototype.get = function (cName) {
    var ckName = cName + '=';

    var cks = document.cookie.split(';');
    for(var i in cks) {
      var c = cks[i].trim();

      if(c.indexOf(ckName)==0) return c.substring(ckName.length, c.length);
    }

    return false;
  }

  ck = new Cookie();
})();