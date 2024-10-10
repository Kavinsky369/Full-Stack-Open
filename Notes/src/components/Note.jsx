const Note = ({ note, toogleImportance }) => {

    const label = note.important
        ? 'make not important'
        : 'make important'

    return (
        <>
            <div className="note-container">
                <li>{note.content}</li>
                <button onClick={toogleImportance}>{label}</button>
            </div>
        </>
    )
}

export default Note