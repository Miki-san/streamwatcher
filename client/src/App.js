import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
import CreateRoom from "./createRoom/CreateRoom";
import Room from "./room/Room";
import JoinRoom from "./joinRoom/JoinRoom";

function App() {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/createRoom" element={<CreateRoom/>}/>
                    <Route path="/room/:roomId" element={<Room/>}/>
                    <Route path="/join" element={<JoinRoom/>}/>
                </Routes>
            </main>
        </Router>
    );
}

export default App;
