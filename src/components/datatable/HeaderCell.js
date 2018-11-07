import React, { Component } from 'react';
import {InputText} from '../inputtext/InputText';
import classNames from 'classnames';
import {RowCheckbox} from './RowCheckbox';
import DomHandler from '../utils/DomHandler';

export class HeaderCell extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onFilterInput = this.onFilterInput.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onResizerMouseDown = this.onResizerMouseDown.bind(this);
    }

    onClick(e) {
        if(this.props.sortable) {
            let targetNode = e.target;
            if(DomHandler.hasClass(targetNode, 'p-sortable-column') || DomHandler.hasClass(targetNode, 'p-column-title') 
                || DomHandler.hasClass(targetNode, 'p-sortable-column-icon') || DomHandler.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {
                this.props.onSort({
                    originalEvent: e,
                    sortField: this.props.sortField ? this.props.sortField : this.props.field,
                    sortFunction: this.props.sortFunction,
                    sortable: this.props.sortable
                });

                DomHandler.clearSelection();
            }
        }
    }

    onFilterInput(e) {
        if(this.props.filter && this.props.onFilter) {
            if(this.filterTimeout) {
                clearTimeout(this.filterTimeout);
            }

            let filterValue = e.target.value;
            this.filterTimeout = setTimeout(() => {
                this.props.onFilter({
                    value: filterValue,
                    field: this.props.field,
                    matchMode: this.props.filterMatchMode
                });
                this.filterTimeout = null;            
            }, this.filterDelay);
        }
    }

    onResizerMouseDown(event) {
        if(this.props.resizableColumns && this.props.onColumnResizeStart) {
            this.props.onColumnResizeStart({
                originalEvent: event,
                columnEl: event.target.parentElement,
                columnProps: this.props
            });
        }
    }

    onMouseDown(event) {
        if (this.props.reorderableColumns) {
            if (event.target.nodeName !== 'INPUT')
                this.el.draggable = true;
            else if (event.target.nodeName === 'INPUT')
                this.el.draggable = false;
        }
    }

    getMultiSortMetaData() {
        if(this.props.multiSortMeta) {
            for(let i = 0; i < this.props.multiSortMeta.length; i++) {
                if(this.props.multiSortMeta[i].field === (this.props.sortField ? this.props.sortField : this.props.field)) {
                    return this.props.multiSortMeta[i];
                }
            }
        }

        return null;
    }

    renderSortIcon(sorted, sortOrder) {
        if (this.props.sortable) {
            let sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-down' : 'pi-sort-up': 'pi-sort';
            let sortIconClassName = classNames('pi pi-fw', sortIcon);

            return (
                <a className="p-sortable-column-icon">
                    <span className={sortIconClassName}></span>
                </a>
            );
        }
        else {
            return null;
        }
    }

    render() {
        let multiSortMetaData = this.getMultiSortMetaData();
        let singleSorted = (this.props.field === this.props.sortField);
        let multipleSorted = multiSortMetaData !== null;
        let sortOrder = 0;
        let resizer = this.props.resizableColumns && <span className="p-column-resizer p-clickable" onMouseDown={this.onResizerMouseDown}></span>;
        let filterElement, headerCheckbox;

        if(singleSorted) 
            sortOrder = this.props.sortOrder;
        else if(multipleSorted) 
            sortOrder = multiSortMetaData.order;

        let sorted = this.props.sortable && (singleSorted || multipleSorted);
        let className = classNames({'p-sortable-column': this.props.sortable, 
                        'p-highlight': sorted, 
                        'p-resizable-column': this.props.resizableColumns,
                        'p-selection-column': this.props.selectionMode}, this.props.headerClassName||this.props.className);

        let sortIconElement = this.renderSortIcon(sorted, sortOrder);

        if(this.props.filter) {
            filterElement = this.props.filterElement||<InputText onInput={this.onFilterInput} type={this.props.filterType} defaultValue={this.props.filters && this.props.filters[this.props.field] ? this.props.filters[this.props.field].value : null}
                        className="p-column-filter" placeholder={this.props.filterPlaceholder} maxLength={this.props.filterMaxLength} />;
        }

        if(this.props.selectionMode === 'multiple') {
            headerCheckbox = <RowCheckbox onClick={this.props.onHeaderCheckboxClick} selected={this.props.headerCheckboxSelected}/>;
        }

        return (
            <th ref={(el) => this.el = el} 
                className={className} style={this.props.headerStyle||this.props.style} onClick={this.onClick} onMouseDown={this.onMouseDown}
                colSpan={this.props.colSpan} rowSpan={this.props.rowSpan}
                onDragStart={this.props.onDragStart} onDragOver={this.props.onDragOver} onDragLeave={this.props.onDragLeave} onDrop={this.props.onDrop}>
                {resizer}
                <span className="p-column-title">{this.props.header}</span>
                {sortIconElement}
                {filterElement}
                {headerCheckbox}
            </th>
        );
    }
}