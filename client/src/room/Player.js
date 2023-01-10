import {useEffect, useRef} from "react";
function Player(props){
    let video = `http://localhost:4000/api/rooms/${props.room_id}/video`
    const videoRef = useRef()

    useEffect(()=> {
            videoRef.current?.load()
            videoRef.current?.play()

        console.log(props.videoname)
    }, [props.videoname])
    return (
        <div>
            <video width="100%" key={props.videoname} src={video} ref={videoRef} controls muted/>
        </div>
    )
}

export default Player;