import React, { useState, useEffect } from "react";

function RecordButton() {
    const [recording, setRecording] = useState(false);
    const [chunks, setChunks] = useState([]);

    const startRecording = () => {
        setRecording(true);
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            mediaRecorder.addEventListener("dataavailable", event => {
            setChunks(chunks => [...chunks, event.data]);
            });
        });
    };

    const stopRecording = () => {
        setRecording(false);
        mediaRecorder.stop();
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        processRecording(blob);
    };

    const processRecording = (blob) => {
        const formData = new FormData();
        formData.append("audio", blob, "recording.ogg");
        fetch("/recording", { // check this and the rest of this const
            method: "POST",
            body: formData
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        };

    return (
        <div>
        <button onClick={recording ? stopRecording : startRecording}>
            {recording ? "Stop recording" : "Start recording"}
        </button>
        </div>
    );
    }

export default RecordButton;