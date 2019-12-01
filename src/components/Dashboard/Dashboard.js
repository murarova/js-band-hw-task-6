import React, { Component } from 'react';
import shortid from 'shortid';
import NoteEditor from '../NoteEditor/NoteEditor';
import NoteList from '../NoteList/NoteList';
import Filter from '../Filter/Filter';
import Modal from '../Modal/Modal';
import '../../index.css';

const INITIAL_FILTER_STATE = {
    title: '',
    priority: '',
    done: '',
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            filteredNotes: [],
            note: null,
            isModalOpen: false,
            filterState: INITIAL_FILTER_STATE,
        };
    }

    // =====================
    // for save notes in LOCALSTORAGE, please, uncomment 2 methods below and
    // import LOCALSTORAGE from '../../services/localStorage';

    // componentDidMount() {
    //     const fromLS = LOCALSTORAGE.get('notes') || [];
    //     this.setState({ notes: fromLS, filteredNotes: fromLS });
    // }

    // componentDidUpdate() {
    //     const { notes } = this.state;
    //     LOCALSTORAGE.set(notes);
    // }
    // =====================

    onSubmit = (title, text, priority, id, done) => {
        const { notes } = this.state;
        if (id === '') {
            const noteToAdd = {
                done,
                title,
                text,
                priority,
                id: shortid.generate(),
            };
            this.setState(state => ({
                notes: [noteToAdd, ...state.notes],
                filteredNotes: [noteToAdd, ...state.filteredNotes],
            }));
        } else {
            const noteToAdd = {
                done,
                title,
                text,
                priority,
                id,
            };
            const newNotes = notes.map(note =>
                note.id === id ? noteToAdd : note,
            );
            this.setState({
                notes: newNotes,
                filteredNotes: newNotes,
            });
        }

        this.onClose();
    };

    onEdit = id => {
        const currentNote = this.findNote(id)[0];
        this.setState({ isModalOpen: true, note: currentNote });
    };

    onCreate = () => {
        this.setState({ isModalOpen: true });
    };

    onClose = () => {
        this.setState({ note: null, isModalOpen: false });
    };

    onDelete = id => {
        const { notes } = this.state;
        const currentNotes = notes.filter(note => note.id !== id);
        this.setState({ notes: currentNotes, filteredNotes: currentNotes });
    };

    onDone = id => {
        const { notes } = this.state;
        const currentNote = this.findNote(id)[0];
        const newNote = { ...currentNote, done: !currentNote.done };

        const newNotes = notes.map(note => (note.id === id ? newNote : note));
        this.setState({ notes: newNotes, filteredNotes: newNotes });
    };

    findNote = id => {
        const { notes } = this.state;
        return notes.filter(el => el.id === id);
    };

    onFilterChange = e => {
        const { filterState } = this.state;
        if (e.target.value === 'all') {
            const newFilterValue = { [e.target.name]: '' };

            this.setState(
                { filterState: { ...filterState, ...newFilterValue } },
                () => this.filterItems(),
            );
            return;
        }
        if (e.target.value === 'open') {
            const newFilterValue = { [e.target.name]: false };

            this.setState(
                { filterState: { ...filterState, ...newFilterValue } },
                () => this.filterItems(),
            );
            return;
        }
        if (e.target.value === 'done') {
            const newFilterValue = { [e.target.name]: true };

            this.setState(
                { filterState: { ...filterState, ...newFilterValue } },
                () => this.filterItems(),
            );
            return;
        }
        const newFilterValue = { [e.target.name]: e.target.value };

        this.setState(
            { filterState: { ...filterState, ...newFilterValue } },
            () => this.filterItems(),
        );
    };

    updateFilterNotes = (previousFilteredNotes, curentFilteredNotes) => {
        if (previousFilteredNotes.length > 0) {
            const arr = [];
            previousFilteredNotes.filter(note =>
                curentFilteredNotes.forEach(item => {
                    if (item.id === note.id) {
                        arr.push(item);
                    }
                }),
            );
            return arr;
        }
        return curentFilteredNotes;
    };

    filterItems = () => {
        const { filterState, notes, filteredNotes } = this.state;

        const isFomaStateEmpty = Object.values(filterState).every(
            el => el === '',
        );
        if (isFomaStateEmpty) {
            this.setState({ filteredNotes: notes });
        }

        let newFilterNotes = [];

        if (filteredNotes.title !== '') {
            const selectedNotes = notes.filter(item =>
                item.title
                    .toLowerCase()
                    .includes(filterState.title.toLowerCase()),
            );
            newFilterNotes = this.updateFilterNotes(
                newFilterNotes,
                selectedNotes,
            );
        }

        if (filterState.done !== '' && filterState.done !== 'all') {
            const selectedNotes = notes.filter(
                item => item.done === filterState.done,
            );
            newFilterNotes = this.updateFilterNotes(
                newFilterNotes,
                selectedNotes,
            );
        }

        if (filterState.priority !== '' && filterState.priority !== 'all') {
            const selectedNotes = notes.filter(
                item => item.priority === filterState.priority,
            );
            newFilterNotes = this.updateFilterNotes(
                newFilterNotes,
                selectedNotes,
            );
        }
        this.setState({ filteredNotes: newFilterNotes });
    };

    render() {
        const { filteredNotes, isModalOpen, note } = this.state;
        return (
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="text-center">JS-BAND-HW-TASK-6</h2>
                    <div>
                        {isModalOpen && (
                            <Modal onClose={this.onClose}>
                                <NoteEditor
                                    note={note}
                                    onCancel={this.onClose}
                                    onSubmit={this.onSubmit}
                                />
                            </Modal>
                        )}
                        <Filter
                            onChange={this.onFilterChange}
                            onClick={this.onCreate}
                        />
                        {filteredNotes.length > 0 && (
                            <NoteList
                                notes={filteredNotes}
                                onEdit={this.onEdit}
                                onDelete={this.onDelete}
                                onDone={this.onDone}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
