import React, { useRef, useState } from 'react';
import './styles/WebRTC.css'

const constraints = {
  audio: false,
  video: true,
};

const WebRTC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(false);

  const handleSuccess = (stream: MediaStream) => {
    const video = videoRef.current;
    if (video) {
      video.srcObject = stream;
    }
    console.log('Got stream with constraints:', constraints);
    console.log(`Using video device: ${stream.getVideoTracks()[0].label}`);
  };

  const handleError = (error: Error) => {
    if (error.name === 'OverconstrainedError') {
      setErrorMessage(`OverconstrainedError: The constraints could not be satisfied by the available devices. Constraints: ${JSON.stringify(constraints)}`);
    } else if (error.name === 'NotAllowedError') {
      setErrorMessage('NotAllowedError: Permissions have not been granted to use your camera and microphone.');
    } else {
      setErrorMessage(`getUserMedia error: ${error.name}`);
    }
    console.error(error);
  };

  const init = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
      setIsVideoEnabled(true);
    } catch (e) {
      handleError(e as Error);
    }
  };

  const onClose = () => {
    const video = videoRef.current;
    if (video?.srcObject) {
      video.srcObject = null;
    }
    setIsVideoEnabled(false);
  }

  return (
      <div className="webRtc">
        <h2>WebRTC</h2>
        <h3>user media 가져오기</h3>
        <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '480px' }}></video>
        {!isVideoEnabled ? (<button onClick={init}>Open camera</button>) :
            (<button onClick={onClose}>Close camera</button>)
        };

        {errorMessage && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {errorMessage}
            </div>
        )}
      </div>
  );
};

export default WebRTC;
