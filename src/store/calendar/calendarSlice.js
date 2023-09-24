import { createSlice } from '@reduxjs/toolkit';
/* import { addHours } from 'date-fns';


const temEvent = {
    _id: new Date().getTime(),
    title: 'Boss birthday',
    notes: 'Buy some cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        id: 'ABC123',
        name: 'Eduardo',
    }
} */

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [],
        activeEvent: null,
        message: {
            type: undefined,
            content: undefined
        }
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onSetEvents: (state, { payload }) => {
            state.events = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateActiveEvent: (state, { payload }) => {
            state.events = state.events.map(event => event._id === payload._id ? payload : event);
        },
        onRemoveEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        setMessage: (state, { payload }) => {
            state.message.type = payload.type;
            state.message.content = payload.content;
        },
        clearMessage: (state) => {
            state.message.type = undefined;
            state.message.content = undefined;
        },
        onLogoutCalendar: (state) => {
            state.events = [];
            state.activeEvent = null;
            state.message = {
                type: undefined,
                content: undefined
            }
        }
    }
});

export const { onSetActiveEvent, onSetEvents, onAddNewEvent, onUpdateActiveEvent, onRemoveEvent, setMessage, clearMessage, onLogoutCalendar } = calendarSlice.actions;