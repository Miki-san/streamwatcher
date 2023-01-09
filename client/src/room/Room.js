import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Room() {
    const {roomId} = useParams()
    const [roomLoaded, setRoomLoaded] = useState(false)
    const [roomData, setRoomData] = useState({})
    const [fileData, setFileData] = useState(null)

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

    function onFileSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('video', fileData.file)
        axios.post('http://127.0.0.1:4000/api/rooms/upload/' + roomId, formData, {
        }).then(res => {
            console.log(res)
        })
    }

    return (
        <div className="room">
            <h3>{roomData.room_id}</h3>
            <form onSubmit={onFileSubmit}>
                <input type="file" onChange={e => setFileData({...fileData, file: e.target.files[0]})}/>
                <input type="submit"/>
            </form>
        </div>
    );
}

export default Room;