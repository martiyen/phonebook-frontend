const PersonForm = ({ nameValue, onNameChange, numberValue, onNumberChange, addNewPerson}) => {
    return (
        <form>
            <div>
                name: <input value={nameValue} onChange={onNameChange} />
            </div>
            <div>
                number: <input value={numberValue} onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={addNewPerson}>add</button>
            </div>
        </form>
    )
}

export default PersonForm