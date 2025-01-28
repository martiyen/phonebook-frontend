const Notification = ({ message, successful }) => {
    const notificationStyle = {
        color: successful ? 'green':'red',
        background: 'lightgrey',
        fontSize: 20,
        padding: 10,
        borderStyle: 'solid',
        borderRadius: 5
    }

    if (message !== null) {
        return (
            <div style={notificationStyle}>
                {message}
            </div>
        )
    }
}

export default Notification