/* eslint-disable no-alert */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
    title: '',
    text: '',
    priority: 'high',
    id: '',
    done: false,
};

class NoteEditor extends Component {
    constructor(props) {
        super(props);
        this.state = props.note || INITIAL_STATE;
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { title, text, priority, done, id } = this.state;
        e.preventDefault();
        if (text && title) {
            this.props.onSubmit(title, text, priority, id, done);
            this.setState({ ...INITIAL_STATE });
        } else {
            alert('Please, fill all form fields');
        }
    };

    render() {
        const { text, title } = this.state;
        const { onCancel } = this.props;

        return (
            <div className="col-xs-10 col-sm-8 col-md-4">
                <div className="row">
                    <div className="col-xs-12">
                        <form className="form" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <p>Title:</p>
                                <input
                                    className="form-control"
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <p>Description:</p>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    placeholder="Description"
                                    name="text"
                                    value={text}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <p className="modal-title">Priority:</p>
                                <select
                                    className="form-control"
                                    name="priority"
                                    onBlur={this.onChange}
                                >
                                    <option value="high">high</option>
                                    <option value="normal">normal</option>
                                    <option value="low">low</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="actions">
                                    <button
                                        className="btn btn-success"
                                        type="submit"
                                    >
                                        Create
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        type="submit"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

NoteEditor.defaultProps = {
    note: {},
};

NoteEditor.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    note: PropTypes.PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        priority: PropTypes.string,
        id: PropTypes.string,
        done: PropTypes.bool,
    }),
};

export default NoteEditor;
