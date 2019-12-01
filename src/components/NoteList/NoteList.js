import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from '../NoteItem/NoteItem';

const NoteList = ({ notes, onDelete, onEdit, onDone }) => (
    <div className="row">
        <div className="col-xs-12">
            <ul className="note-list">
                {notes.map(note => {
                    const { title, text, priority, id, done } = note;
                    return (
                        <NoteItem
                            key={id}
                            title={title}
                            text={text}
                            id={id}
                            priority={priority}
                            done={done}
                            onDelete={() => onDelete(id)}
                            onEdit={() => onEdit(id)}
                            onDone={() => onDone(id)}
                        />
                    );
                })}
            </ul>
        </div>
    </div>
);

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
};

export default NoteList;
