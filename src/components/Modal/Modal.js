/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    backdropeRef = createRef();

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = e => {
        if (e.code !== 'Escape') return;
        this.props.onClose();
    };

    handleBackDropClick = e => {
        const { current } = this.backdropeRef;
        if (current && e.target !== current) return;
        this.props.onClose();
    };

    render() {
        const { children } = this.props;
        return (
            <div
                className="overlay"
                onClick={this.handleBackDropClick}
                ref={this.backdropeRef}
            >
                {children}
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;
