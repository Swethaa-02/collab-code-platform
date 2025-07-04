import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

const socket = io("https://collab-code-backend-4fb1.onrender.com");

function EditorPage() {
  const { roomId } = useParams();
  const { state } = useLocation();
  const editorRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // ✅ Join room + listen for code and chat
  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("receive-code", (newCode) => {
      const editor = editorRef.current;
      if (editor && editor.getValue() !== newCode) {
        editor.setValue(newCode);
      }
    });

    socket.on("receive-message", ({ username, message }) => {
      setMessages((prev) => [...prev, { username, message }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  // ✅ Handle typing code
  const handleEditorChange = (value) => {
    socket.emit("code-change", { roomId, code: value });
  };

  // ✅ Handle chat send
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chat-message", {
        roomId,
        username: state?.username || "Guest",
        message,
      });
      setMessages((prev) => [...prev, { username: "You", message }]);
      setMessage("");
    }
  };

  // ✅ Download code
  const handleDownload = () => {
    const content = editorRef.current?.getValue();
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `room-${roomId}.js`;
    link.click();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* === Code Editor === */}
      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        <div style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>Room: {roomId} | 👋 {state?.username || "Guest"}</div>
          <button onClick={handleDownload} style={{ padding: "6px 12px", cursor: "pointer" }}>💾 Save Code</button>
        </div>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          defaultValue="// Start coding here..."
          onChange={handleEditorChange}
          onMount={(editor) => (editorRef.current = editor)}
        />
      </div>

      {/* === Chat Panel === */}
      <div style={{
        flex: 1,
        borderLeft: "1px solid #ccc",
        padding: "10px",
        backgroundColor: "#f8f9fa"
      }}>
        <h4>💬 Chat</h4>
        <div style={{
          height: "80%",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "5px",
          backgroundColor: "#fff"
        }}>
          {messages.map((msg, idx) => (
            <div key={idx}><strong>{msg.username}:</strong> {msg.message}</div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          style={{ width: "100%", marginTop: "10px", padding: "8px" }}
        />
      </div>
    </div>
  );
}

export default EditorPage;
