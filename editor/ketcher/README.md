This directory contains a version of [EPAM's Ketcher](github.com/epam/ketcher), a JavaScript molecular sketcher, modified for use in [`askcos-site`](https://gitlab.com/mlpds_mit/ASKCOS/askcos-site). The original readme follows below.

**Important ASKCOS development notes:**

* If EPAM's Ketcher code is updated, it would be good to use the updated code, and adapt it to work with ASKCOS. Usually, applying EPAM Ketcher's new changes to this Ketcher repo works. However, if it's necessary to start from a fresh copy of EPAM's repo, you can find ASKCOS's modifications in this repo's histories. The most important changes are to local URLs, as seen in [this commit](gitlab.com/mlpds_mit/ASKCOS/ketcher/-/commit/e7f21657cb9e07a580354187eb6d2ad17099fd87):
    * **Note**: these replacements are variables, not strings. _Do not surround them with quotes!_
    * replace `'ketcher.svg'` (in `src/script/ui/state/toolbar/index.js`) with `ketcher_svg_url`,  
    * set `apiPath`'s value (in `buildInfo` in `src/script/index.js`) to `ketcher_api_path`,
    * replace the second argument of `initTmplLib` (in `src/script/ui/app/hidden.jsx`) with `ketcher_tmpllib_baseurl`,
    * replace `"doc/help.html"` (in `src/script/ui/dialog/mainmenu/help.jsx`) with `{ketcher_help_url}`,
    * replace `"logo/ketcher-logo.svg"` (in `src/script/ui/dialog/mainmenu/about.jsx`) with `{ketcher_logo_url}`. 

* Ketcher was originally built for use in iframes; ASKCOS has adapted it for use in a standard div. It may be better to revert back to using an iframe (for example, if Ketcher implements breaking changes). To do so, in `ketcher_modal.html` (of `askcos-site`), comment out the `<div role="application">` and its contents, and uncomment the `<iframe>`.

* `askcos-site` requires Ketcher code to be built from source with npm and loaded into a Docker image. This can be done using the Dockerfile in this repository.

    ```bash
    $ cd ketcher
    $ docker build -t <image name> .
    ```

    A Makefile is also provided to simplify the build command by providing a default image name and tag:

    ```bash
    $ cd ketcher
    $ make build
    ```

    Note that this will only build code in the image; to build into this directory, run `npm install` and `npm run build` outside of Docker.

* To use this version of Ketcher requires a bit of configuration. Before loading Ketcher code, the following five variables must be set: `ketcher_svg_url`, `ketcher_api_path`, `ketcher_tmpllib_baseurl`, `ketcher_help_url`, and `ketcher_logo_url`. In addition, an element with attribute `role="application"` must be present. 

    Then, load the CSS and Javascript after these variables and element, and Ketcher will be placed inside this element! (An example can be seen in `ketcher_modal.html` and `ketcher_scripts.html` of [`askcos-site`](https://gitlab.com/mlpds_mit/ASKCOS/askcos-site).)

# EPAM Ketcher projects
Copyright (c) 2018 EPAM Systems, Inc

Modifications 2020 ASKCOS

Ketcher is an open-source web-based chemical structure editor incorporating high performance, good portability, light weight, and ability to easily integrate into a custom web-application. Ketcher is designed for chemists, laboratory scientists and technicians who draw structures and reactions.

## KEY FEATURES
* Fast 2D structure representation that satisfies common chemical drawing standards
* 3D structure visualization
* Draw and edit structures using major tools: Atom Tool, Bond Tool, and Template Tool
* Template library (including custom and user's templates)
* Add atom and bond basic properties and query features, add aliases and Generic groups
* Select, modify, and erase connected and unconnected atoms and bonds using Selection Tool, or using Shift key
* Simple Structure Clean up Tool (checks bonds length, angles and spatial arrangement of atoms) and Advanced Structure Clean up Tool (+ stereochemistry checking and structure layout) 
* Aromatize/De-aromatize Tool
* Calculate CIP Descriptors Tool
* Structure Check Tool
* MW and Structure Parameters Calculate Tool 
* Stereochemistry support during editing, loading, and saving chemical structures
* Storing history of actions, with the ability to rollback to previous state
* Ability to load and save structures and reactions in MDL Molfile or RXN file format, InChI String, ChemAxon Extended SMILES, ChemAxon Extended CML file formats
* Easy to use R-Group and S-Group tools (Generic, Multiple group, SRU polymer, peratom, Data S-Group) 
* Reaction Tool (reaction generating, manual and automatic atom-to-atom mapping) 
* Flip/Rotate Tool
* Zoom in/out, hotkeys, cut/copy/paste
* OCR - ability to recognize structures at pictures (image files) and reproduce them
* Copy and paste between different chemical editors
* Settings support (Rendering, Displaying, Debugging)
* Use of SVG to achieve best quality in-browser chemical structure rendering
* Languages: JavaScript with third-party libraries

## Build instructions
Please read [DEVNOTES.md](DEVNOTES.md) for details.

## License
Please read [LICENSE](LICENSE) and [NOTICE](NOTICE) for details.
