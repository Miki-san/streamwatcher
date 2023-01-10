import {useEffect, useState} from "react";
import fetcher from "../fetcher"

function Playlist(props) {
    let [videos, setVideos] = useState([])
    useEffect(() => {
        fetcher.get('http://127.0.0.1:4000/api/rooms/getFiles/' + props.roomId)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.status.toString());
            })
            .then(response => setVideos(response.file_names))
            .catch(error => {
                console.log('error: ' + error)
            })
    }, [])

    function onSelect(e) {
        fetcher.put(
            'http://127.0.0.1:4000/api/rooms/selectFile/' + props.roomId,
            JSON.stringify({filename: e.target.innerHTML})
        ).then(res => {
            if(res.ok){
                setTimeout(() => {
                    props.setVideo(e.target.innerHTML)
                }, 100);
            }
        })
    }

    return (
        <div>
            {videos.map((video) => {
                return <button key = {video} onClick={onSelect}>{video}</button>
            })}
        </div>
    )
}

export default Playlist;