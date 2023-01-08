import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
function JoinRoom(props) {
    const [roomId, setRoomId] = useState("")
    let history = useNavigate()
    function join(e) {
        e.preventDefault()
        history("/room/"+roomId)
    }


    return (
        <div className="joinRoom">
            <form className="joinRoomForm" onSubmit={join}>
                <label>
                    Room ID:
                    <input type="text" name="room_id" onChange={e=>setRoomId(e.target.value)}/>
                </label>
                <input type="submit" value="join"/>
            </form>
        </div>
    );
}

export default JoinRoom;