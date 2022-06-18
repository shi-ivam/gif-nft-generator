
Note : Dependency for macOS : brew install pkg-config cairo pango libpng jpeg giflib librsvg
       Dependency for Linux (Ubuntu) : sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

Note : NFT Generator Code is from - [nftchef](https://github.com/nftchef/art-engine)

Steps:

- 1 : Edit config/layers.json and Update layersOrder value with the Layers Name in Correct order.
    1.1 Add The Layer Files in "unprocessedLayer" folder
    1.2 Add # with number 1-100 to define rarity in the file names of the various traits. example -> "RedShoes#10"(10 -> Only 10% of nfts will have that trait) ,"BlueShoes#50" ( 50 -> 50% of nfts will have that trait)
- 2 : Edit config/format.json: Update the height & width
- 3 : Add the incompatible layers by following the instructions in config/incompatible-example.txt
    3.1 Change Description in "/project_folder/src/config.js" line 20
    3.2 Change baseUri in "/project_folder/src/config.js" line 22
    3.3 Change startIndex in "/project_folder/src/config.js" line 30
- 4 : Important :  Use Node v14 and Python v3.8 or similar
    4.1 Install the node packages by going in the project folder and running : "npm i" in the console
    4.2 Install the python dependencies by running : "pip install -r requirements.txt"
    4.3 Install imagemagick For You Operating System (https://imagemagick.org/index.php) <- from here.
    4.4 Install ffmpeg -  https://ffmpeg.org/
    4.5 Update the imagemagick config to work with large files - https://askubuntu.com/a/1362017
- 5 : Generate :
    5.1 : Run "python3 main.py"
    5.2 : Run "npm run generate"
    5.3 : Run "python3 setupRender.py"
    5.4 : Run "python3 generate-gifs.py"
    5.5 : (Optional) To generate mp4s run "python3 mp4gen.py"
- 6 : Rarity:
    Run "node utils/rarityData.js" to get rarity stats for nfts

Note : the layer config/layers.json file is defining the layerConfiguration Object which is object here - https://github.com/nftchef/art-engine#example. So the properties used in https://github.com/nftchef/art-engine#example can also be provided to the config object at path config/layers.json.

Note: Only the Generate and Rarity Info Code works with the added GIF Module