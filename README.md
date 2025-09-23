![p5js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&style=flat) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?logo=node.js&logoColor=white&style=flat) [![CC BY 4.0][cc-by-shield]][cc-by]

# Processing - FrozenBush ambisonic energy visualizer via p5 osc

This script visualizes ambisonic energy as the so-called "Frozen Bush", processed with the IEM EnergyVisualizer onto p5.js canvas via OSC messages.

## Description

This script is based off on Jason Labbe's "[Frozen Bush](https://openprocessing.org/sketch/413567)" P5.js OpenProcessing sketch. In this version, the animation is not excited by the mouse pointer, but by the ambisonic soundfield energy sampled on the 426 points on the IEM [EnergyVisualizer's grid](https://plugins.iem.at/docs/energyvisualizergrid/). These values are fed to the script via the [P5.js OSC node](https://github.com/genekogan/p5js-osc/).

## Installation

1. Install the [Processing IDE](https://processing.org/)
    
2. Install P5.js mode in the Processing IDE: 
    
    <img src="https://i.ibb.co/42KnsTT/2024-02-19-01-10-56-Using-OSC-messages-in-Processing-in-p5-js-mode-p5-js-Libraries-Processing.png" width="500" />
    
3. Install [Node.js](https://nodejs.org/)
    
4. Install [git](https://git-scm.com/)
    
5. Add the Large File Support (LFS) and longpaths to the git environment: 
    
    ```
    git lfs install
    git config --system core.longpaths true
    git config --global core.protectNTFS false
    ```
    
6. Clone the [p5js-osc repository](https://github.com/genekogan/p5js-osc) and install it:
    
    ```
    git clone https://github.com/genekogan/p5js-osc
    cd p5js-osc/
    npm install
    ```
    
7. Download the `FrozenBush_p5osc.js` script and the accompanying packages from this repository
    
8. Install the VST host of your choice
    
9. Install the [IEM Plug-in Suite](https://plugins.iem.at/)
    
## Getting started

1. Open the OSC node from the p5js-osc installation directory:
    
    ```
    node .\bridge.js
    ```
    This will ensure the OSC connectivity between the P5.js script and the other system apps. Whenever an app connects to the OSC port, the console window will write the "connection" message.
    
    <img src="https://i.ibb.co/jv77ZkJ/2024-04-14-10-51-17-Power-Shell.png" width="500" />
    
2. Open the `FrozenBush_p5osc.js` script via the Processing IDE and run it -- it should open a browser window
    
3. Open the VST host, set up an ambisonic track and add EnergyVisualizer VST plugin. Set up EnergyVisualizer OSC to send messages to the listening port in the Processing script (the default port number for this script is `12001`)
    
    <img src="https://i.ibb.co/x7L9vTW/2024-04-10-14-46-43-unsaved-project-REAPER-v7-14-Registered-to-Bart-omiej-Mr-z-Licensed-for-p.png" width="500" />
    
4. Play the audio and observe the animation! :slightly_smiling_face:
    
    ![](frozenbush_animation_example.mp4)


## Support

All questions, comments and insights please address to me via e-mail: bartlomiej.mroz@pg.edu.pl

## License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: https://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg

## Additional info

For the detailed usage of the p5js-osc script, I recommend checking out my other tutorial on this: https://discourse.processing.org/t/using-osc-messages-in-processing-in-p5-js-mode/43871/2

I recommend checking out Daniel Rudrich's script for real-time visualizations of EnergyVisualizer's data via OSC in Processing: https://github.com/DanielRudrich/EnergyVisualizerOscDemo

Another interesting example of using EnergyVisualizer with OSC to trigger visual effects is this TouchDesigner demo: https://spatialmedialab.org/touchdesigner-x-iem-template/


