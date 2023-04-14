import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';

const Video = ({ image }) => {
    console.log(image)
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        const onIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            setIsPlaying(true);
            video.play();
            } else {
            setIsPlaying(false);
            video.pause();
            }
        });
        };

        const observer = new IntersectionObserver(onIntersection);

        observer.observe(video);

        return () => {
        observer.disconnect();
        };
    }, [videoRef]);

    return (
        <Box>
        <video ref={videoRef} src={image} controls={isPlaying} />
        </Box>
    );
};

export default Video;