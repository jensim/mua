Dnd-Tool
===
Dungeons and Dragons 5, character building ang maintaining

Scaffolded from The lovely [Yeoman](https://yeoman.io/) generator [Angular fullstack](https://github.com/DaftMonk/generator-angular-fullstack)

[![Build Status](https://travis-ci.org/jensim/dd.png)](https://travis-ci.org/jensim/dd)

[![Dependency Status](https://david-dm.org/jensim/dd.png)](https://david-dm.org/jensim/dd)

[![devDependency Status](https://david-dm.org/jensim/dd/dev-status.png)](https://david-dm.org/jensim/dd#info=devDependencies)

[![GitHub version](https://badge.fury.io/gh/jensim%2Fdd.png)](https://badge.fury.io/gh/jensim%2Fdd)

[![bitHound Score](https://www.bithound.io/github/jensim/dd/badges/score.svg)](https://www.bithound.io/github/jensim/dd)

[![bitHound Dependencies](https://www.bithound.io/github/jensim/dd/badges/dependencies.svg)](https://www.bithound.io/github/jensim/dd/master/dependencies/npm)

# Content

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Developing](#developing)
* Pushing to Heroku
  * [First time](#first-time)
    * [Deploy first time, to old heroku repo](#deploy-first-time-to-old-heroku-repo)
  * [Again and again](#again-and-again)

# Prerequisites

```bash
$ npm install -g bower grunt grunt-cli
```

# Installation

```bash
$ bower install
$ grunt
```

# Developing

```bash
$ grunt serve
```

## Pushing to Heroku

### First time

```bash
$ grunt
$ cd dist
$ heroku login
$ # Username
$ # Password
$ heroku addons:create mongolab
$ yo angular-fullstack:heroku
```

### Deploy first time, to old heroku repo

```bash
$ rm -rf dist
$ heroku git:clone -a dnd-tool dist
$ grunt
$ cd dist
$ grunt buildcontrol:heroku
```


## Again and again

```bash
$ grunt
$ cd dist
$ grunt buildcontrol:heroku
```
