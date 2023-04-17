import os
from moviepy.editor import VideoFileClip

video_dir = './videos'
video_files = [os.path.join(video_dir, f) for f in os.listdir(video_dir) if os.path.isfile(os.path.join(video_dir, f))]
for video_path in video_files:
    print('Processing video:', video_path)
    
    # Read the video file and extract the audio
    clip = VideoFileClip(video_path)
    audio_clip = clip.audio
    
    # Do something with the audio, e.g. save it as a WAV file
    audio_path = os.path.splitext(video_path)[0] + '.wav'
    audio_clip.write_audiofile(audio_path)