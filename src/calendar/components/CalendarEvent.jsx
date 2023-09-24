export const CalendarEvent = ({ event }) => {
    const { title, user, notes } = event;

    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    )
}
