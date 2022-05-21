import datetime
import os
import json
import subprocess
import shutil

def main():
    """
    Main function
    """
    
    fps_of_gifs = 3
    # fps_of_gifs = int(input("Enter the fps of the gifs: "))

    # Get the path of the current working directory
    path = os.getcwd()
    print("The current working directory is: " + path)

    #get time
    print("Started : "+str(datetime.datetime.now()))

    #get the names of layers
    path = "./layers/"
    
    orderedLayers = json.load(open("./config/layers.json",'r'))
    layers = orderedLayers['layersOrder']

    #convert single images to spritesheets of fps_of_gifs length

    #get os path of the images
    for x in range(0,len(layers)):
        layer = layers[x]
        print("Processing layer: " + layer["name"])
        
        #get files in the path

        child_files = os.listdir("./unprocessedLayers/"+layer["name"])
        for y in range(0,len(child_files)):
            if (child_files[y][len(child_files[y])-3:len(child_files[y])+1]) != "gif":

                print('./unprocessedLayers/'+layer['name'] + "/" + child_files[y])

                #converting to sprites
                
                from_dir = os.path.join("unprocessedLayers",layer['name'],child_files[y])
                to_dir = os.path.join("work",child_files[y])

                

                try:
                    os.system('copy '+from_dir+' '+to_dir)
                except:
                    try:
                        os.system('cp '+from_dir+' '+to_dir)
                    except:
                        pass
                
                os.chdir('work')

                cmd_str = "magick convert "


                for z in range(fps_of_gifs):
                    cmd_str+=( str(  child_files[y]  + " "))
                cmd_str+=(" +append " + "final_" + child_files[y])
                
                print(cmd_str)

                os.system(cmd_str)

                
                
                os.chdir("..")
                from_dir = os.path.join("work","final_"+child_files[y])
                to_dir = os.path.join("layers",layer['name'],child_files[y])

                

                try:
                    print("\n\n\n")
                    print("Moving from: " + from_dir)
                    print("Moving to: " + to_dir)
                        
                    print("\n\n\n")
                    os.system('move '+from_dir+' '+to_dir)
                except:
                    try:
                        os.system('mv '+from_dir+' '+to_dir)
                    except:
                        pass
                shutil.rmtree('work')
                os.system('mkdir work')

            else:
                #convert gif to spritesheet
                """magick montage your_gif.gif -tile x1 -geometry +0+0 -alpha On -background "rgba(0, 0, 0, 0.0)" -quality 100 sprites.png"""
                from_dir = os.path.join("unprocessedLayers",layer['name'],child_files[y])
                to_dir = os.path.join("layers",layer["name"],child_files[y][:len(child_files[y])-3] + "png")
                print("\n\n\n")
                print("Moving from: " + from_dir)
                print("Moving to: " + to_dir)
                    
                print("\n\n\n")
                try:
                    os.system('magick montage -coalesce  "'+ from_dir + '" -tile x1 -geometry +0+0 -alpha On -background "rgba(0, 0, 0, 0.0)" -quality 100 "' + to_dir + '"')
                except:
                    print("Failed")
                    pass
        print("done")
if __name__ == "__main__":
    main()