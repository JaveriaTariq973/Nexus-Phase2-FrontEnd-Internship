import React, { useRef, useState } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Phone } from 'lucide-react';
import { Card, CardHeader, CardBody } from './ui/Card';
import { Button } from './ui/Button';

export const VideoCall: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [error, setError] = useState('');

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setInCall(true);
      setError('');
    } catch (err) {
      setError('Camera/Microphone permission denied. Please allow access to start the call.');
    }
  };

  const endCall = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    setInCall(false);
  };

  const toggleMic = () => {
    streamRef.current?.getAudioTracks().forEach(t => (t.enabled = !micOn));
    setMicOn(!micOn);
  };

  const toggleCam = () => {
    streamRef.current?.getVideoTracks().forEach(t => (t.enabled = !camOn));
    setCamOn(!camOn);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-medium text-gray-900">Video Call</h2>
      </CardHeader>
      <CardBody className="flex flex-col items-center gap-4">
        <div className="bg-gray-900 rounded-lg w-full max-w-2xl aspect-video flex items-center justify-center overflow-hidden">
          {inCall ? (
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          ) : (
            <p className="text-gray-400 text-sm">Call not started</p>
          )}
        </div>

        {error && <p className="text-error-600 text-sm">{error}</p>}

        <div className="flex gap-3">
          {!inCall ? (
            <Button leftIcon={<Phone size={18} />} onClick={startCall}>
              Start Call
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                leftIcon={micOn ? <Mic size={18} /> : <MicOff size={18} />}
                onClick={toggleMic}
              >
                {micOn ? 'Mute' : 'Unmute'}
              </Button>
              <Button
                variant="outline"
                leftIcon={camOn ? <Video size={18} /> : <VideoOff size={18} />}
                onClick={toggleCam}
              >
                {camOn ? 'Camera Off' : 'Camera On'}
              </Button>
              <Button
                variant="outline"
                className="text-error-600 border-error-300 hover:bg-error-50"
                leftIcon={<PhoneOff size={18} />}
                onClick={endCall}
              >
                End Call
              </Button>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};