# Feed Reader Automatic Tests Project
## Overview

In this project I had to write tests in Jasmine to check if all application features works correctly.

## How to run
 
* Clone repo or enter this hosted site: https://wodawodawoda.github.io/udacity-feedReader/
* If you cloned the repo install dependencies by running ```npm i``` in your console
* Run index.html in your browser
* Tests results will be visible on the bottom of the page

## Test cases
* Are RSS Feeds:
** defined?
** contain not empty URL value?
** contain defined feed name?
* The menu:
** should be hidden by default?
** should be visible on menu icon click?
* Initial Entries:
** should load at least one feed element
* New Feed Selection:
** should change feed content

## Important files
 * index.html - main application html file
 * js/app.js - main application scripts
 * jasmine/specs/feedreader.js - all feedreader application tests
