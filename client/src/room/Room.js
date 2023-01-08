import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Room() {
    const {roomId} = useParams()
    const [roomLoaded, setRoomLoaded] = useState(false)
    const [roomData, setRoomData] = useState({})

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('http://127.0.0.1:4000/api/rooms/' + roomId, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.status.toString());
            })
            .then(response => setRoomData(response))
            .catch(error => {
                console.log('error: ' + error)
                setRoomLoaded(false)
            })
    }, [])
    return (
        <div className="room">
            <h3>{roomData.room_id}</h3>
            <input type="file" />
        </div>
    );
}

export default Room;