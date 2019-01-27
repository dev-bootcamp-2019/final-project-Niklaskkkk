'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _Charity = require('./build/Charity.json');

var _Charity2 = _interopRequireDefault(_Charity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (address) {
  return new _web2.default.eth.Contract(JSON.parse(_Charity2.default.interface), address);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2NoYXJpdHkuanMiXSwibmFtZXMiOlsid2ViMyIsIkNoYXJpdHkiLCJhZGRyZXNzIiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU8sQUFBUCxBQUFpQixBQUFqQjs7OztBQUNBLEFBQU8sQUFBUCxBQUFvQixBQUFwQixBQUdBOzs7Ozs7a0JBQWUsVUFBQyxBQUFELFNBQWEsQUFDNUI7U0FBTyxJQUFJLGNBQUssQUFBTCxJQUFTLEFBQWIsU0FDTCxLQUFLLEFBQUwsTUFBVyxrQkFBUSxBQUFuQixBQURLLFlBRUwsQUFGSyxBQUFQLEFBSUM7QUFMRCIsImZpbGUiOiJjaGFyaXR5LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL25pa2xhc2svRGVza3RvcC9jaGFyaXR5In0=