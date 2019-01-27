'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _charity = require('../../ethereum/charity');

var _charity2 = _interopRequireDefault(_charity);

var _web = require('../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _ContributeCharity = require('../../components/ContributeCharity');

var _ContributeCharity2 = _interopRequireDefault(_ContributeCharity);

var _routes = require('../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/niklask/Desktop/charity/pages/charities/view.js?entry';


var ViewCharity = function (_Component) {
  (0, _inherits3.default)(ViewCharity, _Component);

  function ViewCharity() {
    (0, _classCallCheck3.default)(this, ViewCharity);

    return (0, _possibleConstructorReturn3.default)(this, (ViewCharity.__proto__ || (0, _getPrototypeOf2.default)(ViewCharity)).apply(this, arguments));
  }

  (0, _createClass3.default)(ViewCharity, [{
    key: 'renderStats',
    value: function renderStats() {
      var _props = this.props,
          balance = _props.balance,
          manager = _props.manager,
          minimumContribution = _props.minimumContribution,
          requestsCount = _props.requestsCount,
          approversCount = _props.approversCount;

      var items = [{
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this charity & can create requests to spend funds collected',
        style: { overflowWrap: 'break-word' }
      }, {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to be able to support the charity'
      }, {
        header: requestsCount,
        meta: 'Number of requests',
        description: 'A request tries to send money to external address. Need to be approved by certain number of contributors'
      }, {
        header: approversCount,
        meta: 'Number of approved',
        description: 'Number of contributors to this campaign'
      }, {
        header: _web2.default.utils.fromWei(balance, 'ether'),
        meta: 'Charity Balance (ether)',
        description: 'Total amount of ether collected by Charity so far'
      }];

      return _react2.default.createElement(_semanticUiReact.Card.Group, { items: items, __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      }, 'View Charity'), _react2.default.createElement(_semanticUiReact.Grid, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, _react2.default.createElement(_semanticUiReact.Grid.Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 10, __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, this.renderStats()), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 5, __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, _react2.default.createElement(_ContributeCharity2.default, { address: this.props.address, __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }))), _react2.default.createElement(_semanticUiReact.Grid.Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, _react2.default.createElement(_semanticUiReact.Grid.Column, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }, _react2.default.createElement(_routes.Link, { route: '/charities/' + this.props.address + '/requests', __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, _react2.default.createElement(_semanticUiReact.Button, { primary: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, 'View Charity Payment Requests')))))));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
        var charity, summary;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                charity = (0, _charity2.default)(props.query.address);
                _context.next = 3;
                return charity.methods.getSummary().call();

              case 3:
                summary = _context.sent;
                return _context.abrupt('return', {
                  address: props.query.address,
                  minimumContribution: summary[0],
                  balance: summary[1],
                  requestsCount: summary[2],
                  approversCount: summary[3],
                  manager: summary[4]
                });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return ViewCharity;
}(_react.Component);

exports.default = ViewCharity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2NoYXJpdGllcy92aWV3LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FyZCIsIkdyaWQiLCJCdXR0b24iLCJMYXlvdXQiLCJDaGFyaXR5Iiwid2ViMyIsIkNvbnRyaWJ1dGVDaGFyaXR5IiwiTGluayIsIlZpZXdDaGFyaXR5IiwicHJvcHMiLCJiYWxhbmNlIiwibWFuYWdlciIsIm1pbmltdW1Db250cmlidXRpb24iLCJyZXF1ZXN0c0NvdW50IiwiYXBwcm92ZXJzQ291bnQiLCJpdGVtcyIsImhlYWRlciIsIm1ldGEiLCJkZXNjcmlwdGlvbiIsInN0eWxlIiwib3ZlcmZsb3dXcmFwIiwidXRpbHMiLCJmcm9tV2VpIiwicmVuZGVyU3RhdHMiLCJhZGRyZXNzIiwiY2hhcml0eSIsInF1ZXJ5IiwibWV0aG9kcyIsImdldFN1bW1hcnkiLCJjYWxsIiwic3VtbWFyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQU0sQUFBTTs7QUFDckIsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQU8sQUFBYTs7OztBQUNwQixBQUFPLEFBQVU7Ozs7QUFDakIsQUFBTyxBQUF1Qjs7OztBQUM5QixBQUFTLEFBQVk7Ozs7Ozs7SSxBQUVmOzs7Ozs7Ozs7OztrQ0FnQk87bUJBT1QsS0FQUyxBQU9KO1VBUEksQUFFWCxpQkFGVyxBQUVYO1VBRlcsQUFHWCxpQkFIVyxBQUdYO1VBSFcsQUFJWCw2QkFKVyxBQUlYO1VBSlcsQUFLWCx1QkFMVyxBQUtYO1VBTFcsQUFNWCx3QkFOVyxBQU1YLEFBR0E7O1VBQU07Z0JBQ0osQUFDVSxBQUNSO2NBRkYsQUFFUSxBQUNOO3FCQUhGLEFBR2UsQUFDYjtlQUFPLEVBQUUsY0FMQyxBQUNaLEFBSVMsQUFBZ0I7QUFKekIsQUFDRSxPQUZVO2dCQU9oQixBQUNVLEFBQ1I7Y0FGRixBQUVRLEFBQ047cUJBVmMsQUFPaEIsQUFHZTtBQUhmLEFBQ0U7Z0JBSUYsQUFDVSxBQUNSO2NBRkYsQUFFUSxBQUNOO3FCQWZjLEFBWWhCLEFBR2U7QUFIZixBQUNFO2dCQUlGLEFBQ1UsQUFDUjtjQUZGLEFBRVEsQUFDTjtxQkFwQmMsQUFpQmhCLEFBR2U7QUFIZixBQUNFO2dCQUtRLGNBQUEsQUFBSyxNQUFMLEFBQVcsUUFBWCxBQUFtQixTQUQ3QixBQUNVLEFBQTRCLEFBQ3BDO2NBRkYsQUFFUSxBQUNOO3FCQXpCQSxBQUFjLEFBc0JoQixBQUdlLEFBS2I7QUFSRixBQUNFOzsyQ0FPTyxBQUFDLHNCQUFELEFBQU0sU0FBTSxPQUFaLEFBQW1CO29CQUFuQjtzQkFBUCxBQUFPLEFBQ1I7QUFEUTtPQUFBOzs7OzZCQUdFLEFBQ1A7NkJBQ0osQUFBQzs7b0JBQUQ7c0JBQUEsQUFDTTtBQUROO0FBQUEsT0FBQSxrQkFDTSxjQUFBOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FETixBQUNNLEFBQ0EsaUNBQUEsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDQTtBQURBO0FBQUEseUJBQ0MsY0FBRCxzQkFBQSxBQUFNOztvQkFBTjtzQkFBQSxBQUNOO0FBRE07QUFBQSx5QkFDTCxjQUFELHNCQUFBLEFBQU0sVUFBTyxPQUFiLEFBQW9CO29CQUFwQjtzQkFBQSxBQUNLO0FBREw7Y0FETSxBQUNOLEFBQ0ssQUFBSyxBQUlWLGdDQUFDLGNBQUQsc0JBQUEsQUFBTSxVQUFPLE9BQWIsQUFBb0I7b0JBQXBCO3NCQUFBLEFBQ0k7QUFESjt5QkFDSSxBQUFDLDZDQUFrQixTQUFTLEtBQUEsQUFBSyxNQUFqQyxBQUF1QztvQkFBdkM7c0JBUkUsQUFDQSxBQU1OLEFBQ0ksQUFJSjtBQUpJOzRCQUlILGNBQUQsc0JBQUEsQUFBTTs7b0JBQU47c0JBQUEsQUFDQTtBQURBO0FBQUEseUJBQ0MsY0FBRCxzQkFBQSxBQUFNOztvQkFBTjtzQkFBQSxBQUNBO0FBREE7QUFBQSx5QkFDQSxBQUFDLDhCQUFLLHVCQUFxQixLQUFBLEFBQUssTUFBMUIsQUFBZ0MsVUFBdEM7b0JBQUE7c0JBQUEsQUFDQTtBQURBO3lCQUNBLGNBQUE7O29CQUFBO3NCQUFBLEFBQ0E7QUFEQTtBQUFBLHlCQUNBLEFBQUMseUNBQU8sU0FBUjtvQkFBQTtzQkFBQTtBQUFBO1NBbkJJLEFBQ0osQUFFTSxBQVlOLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFRRzs7Ozs7MkdBckYwQixBOzs7OzttQkFDdkI7QSwwQkFBVSx1QkFBUSxNQUFBLEFBQU0sTUFBZCxBQUFvQixBOzt1QkFFZCxRQUFBLEFBQVEsUUFBUixBQUFnQixhQUFoQixBLEFBQTZCOzttQkFBN0M7QTs7MkJBR0csTUFBQSxBQUFNLE1BRFIsQUFDYyxBQUNyQjt1Q0FBcUIsUUFGZCxBQUVjLEFBQVEsQUFDN0I7MkJBQVMsUUFIRixBQUdFLEFBQVEsQUFDakI7aUNBQWUsUUFKUixBQUlRLEFBQVEsQUFDdkI7a0NBQWdCLFFBTFQsQUFLUyxBQUFRLEFBQ3hCOzJCQUFTLFFBQUEsQSxBQU5GLEFBTVU7QUFOVixBQUNQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUDBCLEEsQUF5RjFCOztrQkFBQSxBQUFlIiwiZmlsZSI6InZpZXcuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL2hvbWUvbmlrbGFzay9EZXNrdG9wL2NoYXJpdHkifQ==