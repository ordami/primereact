'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeTable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _Paginator = require('../paginator/Paginator');

var _TreeTableHeader = require('./TreeTableHeader');

var _TreeTableBody = require('./TreeTableBody');

var _TreeTableFooter = require('./TreeTableFooter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTable = exports.TreeTable = function (_Component) {
    _inherits(TreeTable, _Component);

    function TreeTable(props) {
        _classCallCheck(this, TreeTable);

        var _this = _possibleConstructorReturn(this, (TreeTable.__proto__ || Object.getPrototypeOf(TreeTable)).call(this, props));

        var state = {};

        if (!_this.props.onPage) {
            state.first = props.first;
            state.rows = props.rows;
        }

        if (!_this.props.onSort) {
            state.sortField = props.sortField;
            state.sortOrder = props.sortOrder;
            state.multiSortMeta = props.multiSortMeta;
        }

        if (Object.keys(state).length) {
            _this.state = state;
        }

        _this.onPageChange = _this.onPageChange.bind(_this);
        _this.onSort = _this.onSort.bind(_this);
        return _this;
    }

    _createClass(TreeTable, [{
        key: 'onPageChange',
        value: function onPageChange(event) {
            if (this.props.onPage) this.props.onPage(event);else this.setState({ first: event.first, rows: event.rows });
        }
    }, {
        key: 'onSort',
        value: function onSort(event) {
            var sortField = event.sortField;
            var sortOrder = this.getSortField() === event.sortField ? this.getSortOrder() * -1 : this.props.defaultSortOrder;
            var multiSortMeta = void 0;

            this.columnSortable = event.sortable;
            this.columnSortFunction = event.sortFunction;

            if (this.props.sortMode === 'multiple') {
                var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                multiSortMeta = this.getMultiSortMeta();
                if (!multiSortMeta || !metaKey) {
                    multiSortMeta = [];
                }

                multiSortMeta = this.addSortMeta({ field: sortField, order: sortOrder }, multiSortMeta);
            }

            if (this.props.onSort) {
                this.props.onSort({
                    sortField: sortField,
                    sortOrder: sortOrder,
                    multiSortMeta: multiSortMeta
                });
            } else {
                this.setState({
                    sortField: sortField,
                    sortOrder: sortOrder,
                    first: 0,
                    multiSortMeta: multiSortMeta
                });
            }
        }
    }, {
        key: 'addSortMeta',
        value: function addSortMeta(meta, multiSortMeta) {
            var index = -1;
            for (var i = 0; i < multiSortMeta.length; i++) {
                if (multiSortMeta[i].field === meta.field) {
                    index = i;
                    break;
                }
            }

            var value = [].concat(_toConsumableArray(multiSortMeta));
            if (index >= 0) value[index] = meta;else value.push(meta);

            return value;
        }
    }, {
        key: 'sortSingle',
        value: function sortSingle(data) {
            return this.sortNodes(data);
        }
    }, {
        key: 'sortNodes',
        value: function sortNodes(data) {
            var _this2 = this;

            var value = [].concat(_toConsumableArray(data));

            if (this.columnSortable && this.columnSortable === 'custom' && this.columnSortFunction) {
                value = this.columnSortFunction({
                    field: this.getSortField(),
                    order: this.getSortOrder()
                });
            } else {
                value.sort(function (node1, node2) {
                    var sortField = _this2.getSortField();
                    var value1 = _ObjectUtils2.default.resolveFieldData(node1.data, sortField);
                    var value2 = _ObjectUtils2.default.resolveFieldData(node2.data, sortField);
                    var result = null;

                    if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, { numeric: true });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

                    return _this2.getSortOrder() * result;
                });

                for (var i = 0; i < value.length; i++) {
                    if (value[i].children && value[i].children.length) {
                        value[i].children = this.sortNodes(value[i].children);
                    }
                }
            }

            return value;
        }
    }, {
        key: 'sortMultiple',
        value: function sortMultiple(data) {
            var multiSortMeta = this.getMultiSortMeta();

            if (multiSortMeta) {
                if (this.props.sortFunction) {
                    this.props.sortFunction({
                        data: data,
                        mode: this.props.sortMode,
                        multiSortMeta: multiSortMeta
                    });
                } else {
                    return this.sortMultipleNodes(data, multiSortMeta);
                }
            } else {
                return data;
            }
        }
    }, {
        key: 'sortMultipleNodes',
        value: function sortMultipleNodes(data, multiSortMeta) {
            var _this3 = this;

            var value = [].concat(_toConsumableArray(data));
            value.sort(function (node1, node2) {
                return _this3.multisortField(node1, node2, multiSortMeta, 0);
            });

            for (var i = 0; i < value.length; i++) {
                if (value[i].children && value[i].children.length) {
                    value[i].children = this.sortMultipleNodes(value[i].children, multiSortMeta);
                }
            }

            return value;
        }
    }, {
        key: 'multisortField',
        value: function multisortField(node1, node2, multiSortMeta, index) {
            var value1 = _ObjectUtils2.default.resolveFieldData(node1.data, multiSortMeta[index].field);
            var value2 = _ObjectUtils2.default.resolveFieldData(node2.data, multiSortMeta[index].field);
            var result = null;

            if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else {
                if (value1 === value2) {
                    return multiSortMeta.length - 1 > index ? this.multisortField(node1, node2, multiSortMeta, index + 1) : 0;
                } else {
                    if ((typeof value1 === 'string' || value1 instanceof String) && (typeof value2 === 'string' || value2 instanceof String)) return multiSortMeta[index].order * value1.localeCompare(value2, undefined, { numeric: true });else result = value1 < value2 ? -1 : 1;
                }
            }

            return multiSortMeta[index].order * result;
        }
    }, {
        key: 'getFirst',
        value: function getFirst() {
            return this.props.onPage ? this.props.first : this.state.first;
        }
    }, {
        key: 'getRows',
        value: function getRows() {
            return this.props.onPage ? this.props.rows : this.state.rows;
        }
    }, {
        key: 'getSortField',
        value: function getSortField() {
            return this.props.onSort ? this.props.sortField : this.state.sortField;
        }
    }, {
        key: 'getSortOrder',
        value: function getSortOrder() {
            return this.props.onSort ? this.props.sortOrder : this.state.sortOrder;
        }
    }, {
        key: 'getMultiSortMeta',
        value: function getMultiSortMeta() {
            return this.props.onSort ? this.props.multiSortMeta : this.state.multiSortMeta;
        }
    }, {
        key: 'getColumns',
        value: function getColumns() {
            var columns = _react2.default.Children.toArray(this.props.children);

            if (this.props.reorderableColumns && this.state.columnOrder) {
                var orderedColumns = [];
                for (var i = 0; i < this.state.columnOrder.length; i++) {
                    orderedColumns.push(this.findColumnByKey(columns, this.state.columnOrder[i]));
                }

                return orderedColumns;
            } else {
                return columns;
            }
        }
    }, {
        key: 'getTotalRecords',
        value: function getTotalRecords(data) {
            return this.props.lazy ? this.props.totalRecords : data ? data.length : 0;
        }
    }, {
        key: 'isSingleSelectionMode',
        value: function isSingleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'single';
        }
    }, {
        key: 'isMultipleSelectionMode',
        value: function isMultipleSelectionMode() {
            return this.props.selectionMode && this.props.selectionMode === 'multiple';
        }
    }, {
        key: 'isRowSelectionMode',
        value: function isRowSelectionMode() {
            return this.isSingleSelectionMode() || this.isMultipleSelectionMode();
        }
    }, {
        key: 'processValue',
        value: function processValue() {
            var data = this.props.value;

            if (!this.props.lazy) {
                if (data && data.length) {
                    if (this.getSortField() || this.getMultiSortMeta()) {
                        if (this.props.sortMode === 'single') data = this.sortSingle(data);else if (this.props.sortMode === 'multiple') data = this.sortMultiple(data);
                    }
                }
            }

            return data;
        }
    }, {
        key: 'createPaginator',
        value: function createPaginator(position, totalRecords) {
            var className = 'p-paginator-' + position;

            return _react2.default.createElement(_Paginator.Paginator, { first: this.getFirst(), rows: this.getRows(), pageLinkSize: this.props.pageLinkSize, className: className,
                onPageChange: this.onPageChange, template: this.props.paginatorTemplate,
                totalRecords: totalRecords, rowsPerPageOptions: this.props.rowsPerPageOptions,
                leftContent: this.props.paginatorLeft, rightContent: this.props.paginatorRight });
        }
    }, {
        key: 'renderScrollableTable',
        value: function renderScrollableTable(value) {}
    }, {
        key: 'renderRegularTable',
        value: function renderRegularTable(value) {
            var columns = this.getColumns();

            return _react2.default.createElement(
                'div',
                { className: 'p-treetable-tablewrapper' },
                _react2.default.createElement(
                    'table',
                    { style: this.props.tableStyle, className: this.props.tableClassName },
                    _react2.default.createElement(_TreeTableHeader.TreeTableHeader, { columns: columns, columnGroup: this.props.headerColumnGroup,
                        onSort: this.onSort, sortField: this.getSortField(), sortOrder: this.getSortOrder(), multiSortMeta: this.getMultiSortMeta() }),
                    _react2.default.createElement(_TreeTableFooter.TreeTableFooter, { columns: columns, columnGroup: this.props.footerColumnGroup }),
                    _react2.default.createElement(_TreeTableBody.TreeTableBody, { value: value, columns: columns, expandedKeys: this.props.expandedKeys,
                        onToggle: this.props.onToggle, onExpand: this.props.onExpand, onCollapse: this.props.onCollapse,
                        paginator: this.props.paginator, first: this.getFirst(), rows: this.getRows(),
                        selectionMode: this.props.selectionMode, selectionKeys: this.props.selectionKeys, onSelectionChange: this.props.onSelectionChange,
                        metaKeySelection: this.props.metaKeySelection, onRowClick: this.props.onRowClick, onSelect: this.props.onSelect, onUnselect: this.props.onUnselect,
                        propagateSelectionUp: this.props.propagateSelectionDown, propagateSelectionDown: this.props.propagateSelectionDown,
                        lazy: this.props.lazy, virtualScroll: this.props.virtualScroll })
                )
            );
        }
    }, {
        key: 'renderTable',
        value: function renderTable(value) {
            if (this.props.scrollable) return this.renderScrollableTable(value);else return this.renderRegularTable(value);
        }
    }, {
        key: 'renderLoader',
        value: function renderLoader() {
            if (this.props.loading) {
                var iconClassName = (0, _classnames2.default)('p-treetable-loading-icon pi-spin', this.props.loadingIcon);

                return _react2.default.createElement(
                    'div',
                    { className: 'p-treetable-loading' },
                    _react2.default.createElement('div', { className: 'p-treetable-loading-overlay p-component-overlay' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'p-treetable-loading-content' },
                        _react2.default.createElement('i', { className: iconClassName })
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.processValue();
            var className = (0, _classnames2.default)('p-treetable p-component', { 'p-treetable-hoverable-rows': this.isRowSelectionMode() });
            var table = this.renderTable(value);
            var totalRecords = this.getTotalRecords(value);
            var headerFacet = this.props.header && _react2.default.createElement(
                'div',
                { className: 'p-treetable-header' },
                this.props.header
            );
            var footerFacet = this.props.footer && _react2.default.createElement(
                'div',
                { className: 'p-treetable-footer' },
                this.props.footer
            );
            var paginatorTop = this.props.paginator && this.props.paginatorPosition !== 'bottom' && this.createPaginator('top', totalRecords);
            var paginatorBottom = this.props.paginator && this.props.paginatorPosition !== 'top' && this.createPaginator('bottom', totalRecords);
            var loader = this.renderLoader();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                loader,
                headerFacet,
                paginatorTop,
                table,
                paginatorBottom,
                footerFacet
            );
        }
    }]);

    return TreeTable;
}(_react.Component);

TreeTable.defaultProps = {
    id: null,
    value: null,
    style: null,
    className: null,
    tableStyle: null,
    tableClassName: null,
    expandedKeys: null,
    paginator: false,
    paginatorPosition: 'bottom',
    alwaysShowPaginator: true,
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    paginatorLeft: null,
    paginatorRight: null,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    first: null,
    rows: null,
    totalRecords: null,
    lazy: false,
    sortField: null,
    sortOrder: null,
    multiSortMeta: null,
    sortMode: 'single',
    sortFunction: null,
    defaultSortOrder: 1,
    selectionMode: null,
    selectionKeys: null,
    metaKeySelection: true,
    propagateSelectionUp: true,
    propagateSelectionDown: true,
    loading: false,
    loadingIcon: 'pi pi-spinner',
    scrollable: false,
    virtualScroll: false,
    reorderableColumns: false,
    headerColumnGroup: null,
    footerColumnGroup: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onPage: null,
    onSort: null,
    onSelect: null,
    onUnselect: null,
    onRowClick: null,
    onSelectionChange: null
};
TreeTable.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any.isRequired,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    tableStyle: _propTypes2.default.any,
    tableClassName: _propTypes2.default.string,
    expandedKeys: _propTypes2.default.object,
    paginator: _propTypes2.default.bool,
    paginatorPosition: _propTypes2.default.string,
    alwaysShowPaginator: _propTypes2.default.bool,
    paginatorTemplate: _propTypes2.default.string,
    paginatorLeft: _propTypes2.default.any,
    paginatorRight: _propTypes2.default.any,
    pageLinkSize: _propTypes2.default.number,
    rowsPerPageOptions: _propTypes2.default.array,
    first: _propTypes2.default.number,
    rows: _propTypes2.default.number,
    totalRecords: _propTypes2.default.number,
    lazy: _propTypes2.default.bool,
    sortField: _propTypes2.default.string,
    sortOrder: _propTypes2.default.number,
    multiSortMeta: _propTypes2.default.array,
    sortMode: _propTypes2.default.string,
    sortFunction: _propTypes2.default.func,
    defaultSortOrder: _propTypes2.default.number,
    selectionMode: _propTypes2.default.string,
    selectionKeys: _propTypes2.default.array,
    metaKeySelection: _propTypes2.default.bool,
    propagateSelectionUp: _propTypes2.default.bool,
    propagateSelectionDown: _propTypes2.default.bool,
    loading: _propTypes2.default.bool,
    loadingIcon: _propTypes2.default.string,
    scrollable: _propTypes2.default.bool,
    virtualScroll: _propTypes2.default.bool,
    reorderableColumns: _propTypes2.default.bool,
    headerColumnGroup: _propTypes2.default.element,
    footerColumnGroup: _propTypes2.default.element,
    onExpand: _propTypes2.default.func,
    onCollapse: _propTypes2.default.func,
    onToggle: _propTypes2.default.func,
    onPage: _propTypes2.default.func,
    onSort: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onUnselect: _propTypes2.default.func,
    onRowClick: _propTypes2.default.func,
    onSelectionChange: _propTypes2.default.func
};