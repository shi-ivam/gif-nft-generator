"use strict";

const path = require("path");
const lConfig = require('../config/layers.json');
const lformat = require('../internalconfig/format.json');
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

// see src/blendMode.js for available blend modes
// documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const buildDir = path.join(basePath, "/build");
const layersDir = path.join(basePath, "/layers");

/*********************
 * General Generator Options
 ***********************/

const description =
  "This is the description of your NFT project, remember to replace this";
const baseUri = "ipfs://NewUriToReplace";

const outputJPEG = false; // if false, the generator outputs png's

/**
 * Set your tokenID index start number.
 * ⚠️ Be sure it matches your smart contract!
 */
const startIndex = 1;

const format = {
  smoothing: true, // set to false when up-scaling pixel art.
  ...lformat,
};

const background = {
  generate: true,
  brightness: "80%",
};

const layerConfigurations = [
  lConfig
  // {
  //   growEditionSizeTo: 10,
  //   namePrefix: "Series 2", // Use to add a name to Metadata `name:`
  //   layersOrder: [
  //     { name: "Background" },
  //     {
  //       name: "Back Accessory",
  //       // options: {
  //       //   bypassDNA: true,
  //       // },
  //     },
  //     { name: "Head" },
  //     { name: "Clothes" },
  //     { name: "Eyes" },
  //     { name: "Hair" },
  //     { name: "Head Accessory" },
  //     { name: "Shirt Accessories" },
  //   ],
  // },
  // {
  //   growEditionSizeTo: 10,
  //   namePrefix: "Lion",
  //   resetNameIndex: true, // this will start the Lion count at #1 instead of #6
  //   layersOrder: [
  //     { name: "Background" },
  //     { name: "Hats" },
  //     { name: "Male Hair" },
  //   ],
  // },
];

/**
 * Set to true for when using multiple layersOrder configuration
 * and you would like to shuffle all the artwork together
 */
const shuffleLayerConfigurations = false;

const debugLogs = true;

/*********************
 * Advanced Generator Options
 ***********************/

// if you use an empty/transparent file, set the name here.
const emptyLayerName = "NONE";

/**
 * Incompatible items can be added to this object by a files cleanName
 * This works in layer order, meaning, you need to define the layer that comes
 * first as the Key, and the incompatible items that _may_ come after.
 * The current version requires all layers to have unique names, or you may
 * accidentally set incompatibilities for the _wrong_ item.
 */


// You can setup Incompatible Layers like this
// The names include the file name except the '#' operator and rarity identifier.
// Careful : These are the names of the layers generated in 'layers' folder after the "python3 main.py" command and not the ones in unprocessedLayers folder.
// Mention the names of the layer in a list that should not be paired with the key layer.
// Note : The key layer should always come before the incompatible layers as per defined in the layersOrder array in config/layers.json.
let incompatible;
incompatible = {
  // "yo_body_01":["hand motion-3 Animated","hand motion-1 Animated","hand motion-4 Animated"],
  // "yo_body_02":["hand motion-1 Animated","hand motion-2","hand motion-4 Animated"],
  // "yo_body_03":["hand motion-3 Animated","hand motion-2","hand motion-4 Animated"],
  // "yo_body_04":["hand motion-3 Animated","hand motion-1 Animated","hand motion-2"]
}

/**
 * Require combinations of files when constructing DNA, this bypasses the
 * randomization and weights.
 *
 * The layer order matters here, the key (left side) is an item within
 * the layer that comes first in the stack.
 * the items in the array are "required" items that should be pulled from folders
 * further in the stack
 */

// You can Setup Forced Combinations like this : 
// The names include the file name except the '#' operator and rarity identifier.
// Careful : These are the names of the layers generated in 'layers' folder after the "python3 main.py" command and not the ones in unprocessedLayers folder.

// This forces the combination of one layer with another (no room for randomization)

// Note : The key layer should always come before the incompatible layers as per defined in the layersOrder array in config/layers.json.
let forcedCombinations;
forcedCombinations = {
  "yo_body_01":["hand motion-2"], //"yo_body_01" will always be matched with "hand motion-2"
  "yo_body_02":["hand motion-3 Animated"], //"yo_body_02" will always be matched with "hand motion-3 Animated"
  "yo_body_03":["hand motion-1 Animated"], //"yo_body_03" will always be matched with "hand motion-1 Animated"
  "yo_body_04":["hand motion-4 Animated"], //"yo_body_04" will always be matched with "hand motion-4 Animated"
};

/**
 * In the event that a filename cannot be the trait value name, for example when
 * multiple items should have the same value, specify
 * clean-filename: trait-value override pairs. Wrap filenames with spaces in quotes.
 */
const traitValueOverrides = {
  // Helmet: "Space Helmet",
  // "gold chain": "GOLDEN NECKLACE",
};

const extraMetadata = {};

const extraAttributes = () => [
  // Optionally, if you need to overwrite one of your layers attributes.
  // You can include the same name as the layer, here, and it will overwrite
  //
  // {
  // trait_type: "Bottom lid",
  //   value: ` Bottom lid # ${Math.random() * 100}`,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Aqua Power",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Health",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Mana",
  //   value: Math.floor(Math.random() * 100),
  // },
];

// Outputs an Keccack256 hash for the image. Required for provenance hash
const hashImages = true;

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

/**
 * Set to true to always use the root folder as trait_type
 * Set to false to use weighted parent folders as trait_type
 * Default is true.
 */
const useRootTraitType = true;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  background,
  baseUri,
  buildDir,
  debugLogs,
  description,
  emptyLayerName,
  extraAttributes,
  extraMetadata,
  forcedCombinations,
  format,
  hashImages,
  incompatible,
  layerConfigurations,
  layersDir,
  outputJPEG,
  preview,
  preview_gif,
  rarityDelimiter,
  shuffleLayerConfigurations,
  startIndex,
  traitValueOverrides,
  uniqueDnaTorrance,
  useRootTraitType,
};
