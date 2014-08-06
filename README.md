Eye
===
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Coverage Status](https://img.shields.io/coveralls/FlyinPanda/Eye.svg)]
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


Installation:
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
