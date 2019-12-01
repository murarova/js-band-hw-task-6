/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../DropDown/Dropdown';

class NoteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdawnOpen: false,
            timeout: null,
        };
    }

    onClick = () => {
        this.setState(state => ({
            isDropdawnOpen: !state.isDropdawnOpen,
        }));
    };

    close = () => {
        const timeout = setTimeout(() => {
            this.setState({
                isDropdawnOpen: false,
            });
        }, 100);
        this.setState({ timeout });
    };

    componentWillUnmount = () => {
        clearTimeout(this.state.timeout);
    };

    render() {
        const {
            title,
            text,
            priority,
            id,
            done,
            onDelete,
            onEdit,
            onDone,
        } = this.props;
        const { isDropdawnOpen } = this.state;

        const items = [
            {
                name: 'Done',
                className: 'btn btn-success dropdawn-btn',
                onClick: onDone,
            },
            {
                name: 'Edit',
                className: 'btn btn-info dropdawn-btn',
                onClick: onEdit,
            },
            {
                name: 'Delete',
                className: 'btn btn-danger dropdawn-btn',
                onClick: onDelete,
            },
        ];

        return (
            <li className={done ? 'done note' : 'note'} key={id}>
                <h3 className="title">{title}</h3>
                <p className="text">{text}</p>
                <div className="actions">
                    <button
                        type="button"
                        className={
                            priority === 'high'
                                ? 'btn btn-danger'
                                : priority === 'low'
                                ? 'btn btn-info'
                                : 'btn btn-primary'
                        }
                    >
                        {priority}
                    </button>
                    <div className="dropdawn-wrapper" onBlur={this.close}>
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={this.onClick}
                        >
                            ...
                        </button>

                        {isDropdawnOpen && (
                            <div className="dropdown">
                                <Dropdown
                                    onClose={this.onClose}
                                    items={items}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </li>
        );
    }
}

NoteItem.defaultProps = {
    title: '',
    text: '',
    priority: 'high',
    id: '',
    done: false,
};

NoteItem.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
    priority: PropTypes.string,
    id: PropTypes.string,
    done: PropTypes.bool,
};

export default NoteItem;
