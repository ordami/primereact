'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTableHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableHeader = exports.TreeTableHeader = function (_Component) {
    _inherits(TreeTableHeader, _Component);

    function TreeTableHeader() {
        _classCallCheck(this, TreeTableHeader);

        return _possibleConstructorReturn(this, (TreeTableHeader.__proto__ || Object.getPrototypeOf(TreeTableHeader)).apply(this, arguments));
    }

    _createClass(TreeTableHeader, [{
        key: 'onHeaderClick',
        value: function onHeaderClick(event, column) {
            if (column.props.sortable) {
                var targetNode = event.target;
                if (_DomHandler2.default.hasClass(targetNode, 'p-sortable-column') || _DomHandler2.default.hasClass(targetNode, 'p-column-title') || _DomHandler2.default.hasClass(targetNode, 'p-sortable-column-icon') || _DomHandler2.default.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {

                    this.props.onSort({
                        originalEvent: event,
                        sortField: column.props.field,
                        sortFunction: column.props.sortFunction,
                        sortable: column.props.sortable
                    });

                    _DomHandler2.default.clearSelection();
                }
            }
        }
    }, {
        key: 'getMultiSortMetaData',
        value: function getMultiSortMetaData(column) {
            if (this.props.multiSortMeta) {
                for (var i = 0; i < this.props.multiSortMeta.length; i++) {
                    if (this.props.multiSortMeta[i].field === column.props.field) {
                        return this.props.multiSortMeta[i];
                    }
                }
            }

            return null;
        }
    }, {
        key: 'renderSortIcon',
        value: function renderSortIcon(column, sorted, sortOrder) {
            if (column.props.sortable) {
                var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-down' : 'pi-sort-up' : 'pi-sort';
                var sortIconClassName = (0, _classnames2.default)('pi pi-fw', sortIcon);

                return _react2.default.createElement(
                    'a',
                    { className: 'p-sortable-column-icon' },
                    _react2.default.createElement('span', { className: sortIconClassName })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderHeaderCell',
        value: function renderHeaderCell(column, index) {
            var _this2 = this;

            var multiSortMetaData = this.getMultiSortMetaData(column);
            var singleSorted = column.props.field === this.props.sortField;
            var multipleSorted = multiSortMetaData !== null;
            var sorted = column.props.sortable && (singleSorted || multipleSorted);
            var sortOrder = 0;

            if (singleSorted) sortOrder = this.props.sortOrder;else if (multipleSorted) sortOrder = multiSortMetaData.order;

            var sortIconElement = this.renderSortIcon(column, sorted, sortOrder);

            var className = (0, _classnames2.default)(column.props.headerClassName || column.props.className, {
                'p-sortable-column': column.props.sortable,
                'p-highlight': sorted,
                'p-resizable-column': column.props.resizableColumns
            });

            return _react2.default.createElement(
                'th',
                { key: column.field || index, className: className, style: column.props.headerStyle || column.props.style,
                    onClick: function onClick(e) {
                        return _this2.onHeaderClick(e, column);
                    }, rowSpan: column.props.rowSpan, colSpan: column.props.colSpan },
                _react2.default.createElement(
                    'span',
                    { className: 'p-column-title' },
                    column.props.header
                ),
                sortIconElement
            );
        }
    }, {
        key: 'renderHeaderRow',
        value: function renderHeaderRow(row, index) {
            var _this3 = this;

            var rowColumns = _react2.default.Children.toArray(row.props.children);
            var rowHeaderCells = rowColumns.map(function (col, index) {
                return _this3.renderHeaderCell(col, index);
            });

            return _react2.default.createElement(
                'tr',
                { key: index },
                rowHeaderCells
            );
        }
    }, {
        key: 'renderColumnGroup',
        value: function renderColumnGroup() {
            var _this4 = this;

            var rows = _react2.default.Children.toArray(this.props.columnGroup.props.children);

            return rows.map(function (row, i) {
                return _this4.renderHeaderRow(row, i);
            });
        }
    }, {
        key: 'renderColumns',
        value: function renderColumns(columns) {
            var _this5 = this;

            if (columns) {
                var headerCells = columns.map(function (col, index) {
                    return _this5.renderHeaderCell(col, index);
                });
                return _react2.default.createElement(
                    'tr',
                    null,
                    headerCells
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var content = this.props.columnGroup ? this.renderColumnGroup() : this.renderColumns(this.props.columns);

            return _react2.default.createElement(
                'thead',
                { className: 'p-treetable-thead' },
                content
            );
        }
    }]);

    return TreeTableHeader;
}(_react.Component);

TreeTableHeader.defaultProps = {
    columns: null,
    columnGroup: null,
    sortField: null,
    sortOrder: null,
    multiSortMeta: null,
    onSort: null
};
TreeTableHeader.propsTypes = {
    columns: _propTypes2.default.array,
    columnGroup: _propTypes2.default.element,
    sortField: _propTypes2.default.string,
    sortOrder: _propTypes2.default.number,
    multiSortMeta: _propTypes2.default.array,
    onSort: _propTypes2.default.func
};