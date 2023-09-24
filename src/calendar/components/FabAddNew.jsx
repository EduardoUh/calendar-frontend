// fab stands for floating action button

import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';


export const FabAddNew = () => {
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleOpenEventModal = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Iván'
            }
        });
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleOpenEventModal}
        >
            <i className="fa fa-plus" />
        </button>
    )
}
