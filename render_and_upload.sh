#!/bin/bash

# Generates the video
echo "Generating video..."
npx remotion render PromoVideo out/video.mp4 --scale 0.5

# Notify the user the video is saved locally
echo "Video successfully generated and saved to out/video.mp4"
