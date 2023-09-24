// fab stands for floating action button
import { useCalendarStore, useUiStore } from '../../hooks';


export const FabRemove = () => {
    const { startRemovingEvent, hasEventSelected } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const handleRemoveEvent = async () => {
        await startRemovingEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleRemoveEvent}
            style={{ display: hasEventSelected && !isDateModalOpen ? "" : "none" }}
        >
            <i className="fa fa-trash-alt" />
        </button>
    )
}
