#!/bin/bash
# Scene 1: Dystopian hook
ffmpeg -f lavfi -i "sine=frequency=50:duration=5" -c:a mp3 public/scene1.mp3 -y
# Scene 2: Urgent music
ffmpeg -f lavfi -i "sine=frequency=440:duration=5" -c:a mp3 public/scene2.mp3 -y
# Explosion
ffmpeg -f lavfi -i "anoisesrc=d=2:c=white:a=0.5" -c:a mp3 public/explosion.mp3 -y
# Scene 3: Inventive music
ffmpeg -f lavfi -i "sine=frequency=880:duration=5" -c:a mp3 public/scene3.mp3 -y
