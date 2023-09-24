import { useSelector, useDispatch } from 'react-redux';
import { onSetActiveEvent, onSetEvents, onAddNewEvent, onUpdateActiveEvent, onRemoveEvent, setMessage, clearMessage } from '../store';
import { calendarApi } from '../api';
import { convertToDate } from '../helpers';



export const useCalendarStore = () => {
    const { events, activeEvent, message } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const setMessages = ({ type, content }) => {
        dispatch(setMessage({ type, content }));
        setTimeout(() => {
            dispatch(clearMessage());
        }, 10);
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            if (data?.ok) {
                const eventsToLoad = data.events.map(event => {
                    event.start = convertToDate(event.start);
                    event.end = convertToDate(event.end);
                    return event;
                });
                dispatch(onSetEvents(eventsToLoad));
            }
        } catch (error) {
            setMessages({ type: 'error', content: error.response.data.message });
        }
    }

    const startSavingEvent = async (calendarEvent) => {
        if (calendarEvent.id) {
            try {
                const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                console.log(data);
                if (data?.ok) {
                    dispatch(onUpdateActiveEvent({ ...calendarEvent }));
                    setMessages({ type: 'success', content: data.message });
                }
            } catch (error) {
                setMessages({ type: 'error', content: error.response.data.message });
            }
        }
        else {
            try {
                const { data } = await calendarApi.post('/events', calendarEvent);
                if (data?.ok) {
                    dispatch(onAddNewEvent({ ...data.event, start: convertToDate(data.event.start), end: convertToDate(data.event.end), user }));
                    setMessages({ type: 'success', content: data.message });
                }
            } catch (error) {
                setMessages({ type: 'error', content: error.response.data.message });
            }
        }
    }

    const startRemovingEvent = async () => {
        try {
            const { data } = await calendarApi.delete(`/events/${activeEvent.id}`);
            if (data?.ok) {
                dispatch(onRemoveEvent());
                setMessages({ type: 'success', content: data.message });
            }
        } catch (error) {
            setMessages({ type: 'error', content: error.response.data.message });
        }
    }

    return {
        // properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        message,
        // functions
        startLoadingEvents,
        setActiveEvent,
        startSavingEvent,
        startRemovingEvent,
    }
}