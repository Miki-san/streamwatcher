import "./CreateRoom.css"
import React, { useState } from 'react';
function CreateRoom() {
    const [roomData, setRoomData] = useState({
        created_by: null,
        max_guests: 5,
        password: null,
    });

    const handleChange = (e) => {
        setRoomData({...roomData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(roomData)
        };
        fetch('http://127.0.0.1:4000/api/rooms/create', requestOptions)
            .then(response => response.json())

    }
    return (
        <div className="CreateRoom">
            <form className="roomForm" onSubmit={onSubmit}>
                <label>
                    Name:
                    <input type="text" name="created_by" onChange={handleChange}/>
                </label>
                <label>
                    Maximum guests:
                    <input type="text" name="max_guest" onChange={handleChange}/>
                </label>
                <label>
                    Password:
                    <input type="text" name="password" onChange={handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CreateRoom;