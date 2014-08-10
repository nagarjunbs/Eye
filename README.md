[![Build Status](https://travis-ci.org/FlyinPanda/Eye.svg?branch=master)](https://travis-ci.org/FlyinPanda/Eye)
[![Code Climate](https://codeclimate.com/github/FlyinPanda/Eye/badges/gpa.svg)](https://codeclimate.com/github/FlyinPanda/Eye)
Eye
===

A chrome extension for web developers with an editor, and the most common web development utilities. This project was created because I found the existing chrome editors to be sub-par.

Planned features
================
1. Will be built on top of ace
2. Console integration
3. Project management and integration with bower & grunt
4. Find and replace in file and project
5. JSBeautifier, JSLint/JSHint integration

Toolchain
==========
1. NodeJS
2. Bower
3. Grunt

Libraries
=========
1. jQuery
2. Angular
3. Bootstrap
4. Font-awesome
5. Angular-Bootstrap
6. Ace editor
7. qunit

Building Eye:
============
1. Checkout the code via any git client
2. Install NodeJS
2. Run "npm install bower" to get bower (add -g to install globally)
3. Run "npm install grunt" to get grunt (add -g to install globally)
4. To get all dependencies of this project, run "bower install" via command line
5. To run the grunt tasks, run "grunt" via command line
6. The sources are kept in the "src" directory while the deployable version is kept under the "dist" directory
7. Load an upacked extension in chrome and point the path to Eye/src
8. You are now ready to start hacking away

Config files:
===========
1. menu.json      : Contains a complete listing of the items in the menu bar
2. shortcuts.json : Contains shortcut keys and the events they emit 

Events and their roles:
============
1. load-opened-file-content : Fired after a file selection window is spawned and a file is chosen. Handler is expected to take up the opened file ref and populate the editor window with a new ace editor.
2. spawn-new-tab            : Fired after a file is open / a new file needs to be created. Handler is expected to create a bootstrap tab and init an ace editor on it.
3. update-line-column-count : Fired whenever the status bars row and column # is to be updated. Expects an ace editor cursor object to complete this operation.
4. menu-{event name}        : Menu events have the menu-{event name} pattern and are specified in the menu.json config file.

File & folder organization:
============
1. /config        : All configuration JSON's are stored under the "config" folder
2. /templates     : HTML templates for different sections of the page are segregated into this folder 
3. Services.js    : Only reusable code is placed under the angular services layer, any function that requires angular scope doesnt belong in this file
4. Controllers.js : Event handlers, general logic is placed here, services are invoked from this file