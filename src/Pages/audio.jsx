import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

function AudioInputComponent() {
  const [audioStream, setAudioStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startAudioCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      setIsRecording(true);

      // Stop recording after 1 minute (60,000 milliseconds)
      setTimeout(() => {
        stopAudioCapture();
      }, 60000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopAudioCapture = () => {
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
      setIsRecording(false);
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopAudioCapture : startAudioCapture}>
        {isRecording ? (
          <FontAwesomeIcon icon={faMicrophoneSlash} />
        ) : (
          <FontAwesomeIcon icon={faMicrophone} />
        )}
      </button>
      {audioStream && <audio controls srcObject={audioStream} />}
    </div>
  );
}

export default AudioInputComponent;
