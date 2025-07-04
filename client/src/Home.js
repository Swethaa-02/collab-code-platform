import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createRoom = () => {
    const id = uuidv4();
    setRoomId(id);
  };

  const joinRoom = () => {
    if (!roomId || !username) return alert("Both Room ID and Username are required");
    navigate(`/editor/${roomId}`, { state: { username } });
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Join a Collaborative Coding Room</h2>
      <input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      /><br /><br />
      <input
        placeholder="Enter Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={createRoom} style={{ marginLeft: "10px" }}>Create Room</button>
    </div>
  );
}

export default Home;
