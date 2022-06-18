import os
import json


try:
    os.mkdir('build/gifs')
except:
    pass

def main():
    # main function
    
    #get delay
    delay = 0
    while not delay:
        delay = int(input("Enter delay between each frame for the gifs, in hundredths of a sec (1 = very fast,100 = very slow): "))
        # Logic to check if within range
        
        # if delay < 1 or delay > 100:
        #     print("Invalid delay, please try again")
        #     delay = 0

    # get total files
    

    files = os.listdir('build/images')
    
    #convert images to gifs

    for file in files:
        if file.endswith('png'):
            height = 0
            width = 0
            with open('config/format.json', 'r') as f:
                data = json.load(f)
            height = data["height"]
            width = data["width"]
            # convert -delay 20 11.png -crop 500x500 +adjoin +repage -adjoin -loop 0 -delay 1 output.gif
            cmd_str = 'convert -delay ' + str(delay) + ' "build/images/' + file+'" ' + '-crop ' + str(width) + 'x' + str(height) + ' +adjoin +repage -adjoin -loop 0 "build/gifs/' + file[:-4] + '.gif"'
            os.system(cmd_str)
            print('Converted ' + file + ' to gif'," delay: " + str(delay), " width: " + str(width), " height: " + str(height))

if __name__ == '__main__':
    main()