import ffmpy
import os

duration = 5

try:
    os.rmdir('build/mp4')
except:
    pass
try:
    os.mkdir('build/mp4s')
except:
    pass
for file in os.listdir('build/gifs'):
    if file.endswith(".gif"):
        ff = ffmpy.FFmpeg(
            inputs={'build/gifs/'+file: None},
            outputs={'build/mp4s/'+file[:-4] + ".mp4": None}
        )
        ff.run()
        # clip = mp.ImageClip('build/gifs/' + file)
        # clip = clip.set_duration(duration)
        # clip.write_videofile('build/mp4s/' + file[:-4] + '.mp4', fps=30)