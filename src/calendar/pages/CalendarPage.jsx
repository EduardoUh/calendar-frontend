import { useEffect, useMemo, useState } from 'react';

import { Calendar } from 'react-big-calendar';
import Swal from 'sweetalert2';

import { CalendarEvent, CalendarModal, FabAddNew, NavBar, FabRemove } from '../';

import { localizer } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

import 'react-big-calendar/lib/css/react-big-calendar.css';


export const CalendarPage = () => {
    const { user } = useAuthStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
    // using custom hook that manages ui store
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, message, startLoadingEvents } = useCalendarStore();

    useEffect(() => {
        startLoadingEvents();
    }, []);

    useEffect(() => {
        if (message.type) {
            Swal.fire({
                title: message.type.toUpperCase(),
                text: message.content,
                icon: message.type
            })
        }
    }, [message.type]);

    const eventstyleGetter = (event, start, end, isSelected) => {
        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)
        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const handleDoubleClick = (e) => {
        console.log({ doubleClick: e });
        openDateModal();
    }

    const handleSelect = (e) => {
        setActiveEvent(e);
    }

    const handleViewChanged = (e) => {
        localStorage.setItem('lastView', e);
    }

    return (
        <>
            <NavBar />
            <Calendar
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 85px)' }}
                eventPropGetter={eventstyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={handleDoubleClick}
                onSelectEvent={handleSelect}
                onView={handleViewChanged}
            />
            <CalendarModal />
            <FabAddNew />
            <FabRemove />
        </>
    )
}
