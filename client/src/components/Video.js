import React, { useRef, useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

const Video = ({ image }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        const onIntersection = (entries) => {
            entries.forEach((entry) => {
                // Check if the entry is fully in view
                if (entry.isIntersecting && entry.intersectionRatio === 1) {
                    // Pause all other videos
                    const videos = document.getElementsByTagName("video");
                    for (let i = 0; i < videos.length; i++) {
                        if (videos[i] !== video) {
                            videos[i].pause();
                        }
                    }
                    // Play the current video
                    setIsPlaying(true);
                    video.play();
                } else {
                    setIsPlaying(false);
                    video.pause();
                }
            });
        };

        const handleMuteChange = () => {
            const isMuted = video.muted;
            const videos = document.getElementsByTagName("video");
            for (let i = 0; i < videos.length; i++) {
                videos[i].muted = isMuted;
            }
        };

        // Ensure that the video is fully in view before playing
        const observer = new IntersectionObserver(onIntersection, { threshold: 1 });

        observer.observe(video);

        video.addEventListener('volumechange', handleMuteChange);

        return () => {
            observer.disconnect();
            video.removeEventListener('volumechange', handleMuteChange);
        };
    }, [videoRef]);

    return (
        <Box>
            <video ref={videoRef} src={image} controls={isPlaying} />
        </Box>
    );
};

export default Video;