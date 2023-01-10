import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import fetcher from "../fetcher"
import Playlist from "./Playlist";
import Player from "./Player";

function Room() {
    const {roomId} = useParams()
    const [roomData, setRoomData] = useState({})
    const [fileData, setFileData] = useState(null)
    const [playFile, setPlayFile] = useState(null)

    useEffect(() => {
        fetcher.get('http://127.0.0.1:4000/api/rooms/' + roomId)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.status.toString());
            })
            .then(response => {
                setRoomData(response)
                console.log(roomData)
            })
            .catch(error => {
                console.log('error: ' + error)
            })

    }, [])

    function onFileSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('video', fileData?.file)
        axios.post('http://127.0.0.1:4000/api/rooms/upload/' + roomId, formData, {}).then(res => {
            console.log(res)
        })
    }

    return (
        <div className="room">
            <h3>{roomData.room_id}</h3>
            <Playlist  roomId={roomId} setVideo={(video) => {
                setRoomData({...roomData, file_path: video})
            }}/>
            <form onSubmit={onFileSubmit}>
                <input
                    type="file"
                    accept=".mp4,.mkv,.avi,.mov,.mp3,.flac,.wav"
                    onChange={e => setFileData({...fileData, file: e.target.files[0]})}/>
                <input type="submit"/>
            </form>
            <Player room_id={roomId} videoname={roomData.file_path}/>
        </div>
    );
}

export default Room;