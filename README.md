Dnd-Tool
===
Dungeons and Dragons 5, character building ang maintaining

Scaffolded from The lovely [Yeoman](https://yeoman.io/) generator [Angular fullstack](https://github.com/DaftMonk/generator-angular-fullstack)

[![Build Status](https://travis-ci.org/jensim/dd.png)](https://travis-ci.org/jensim/dd)

[![Dependency Status](https://david-dm.org/jensim/dd.png)](https://david-dm.org/jensim/dd)

[![devDependency Status](https://david-dm.org/jensim/dd/dev-status.png)](https://david-dm.org/jensim/dd#info=devDependencies)

[![GitHub version](https://badge.fury.io/gh/jensim%2Fdd.png)](https://badge.fury.io/gh/jensim%2Fdd)

# Content

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Developing](#developing)
* Pushing to Heroku
  * [First time](#first-time)
  * [Again and again](#again-and-again)
  * [Deploy first time, to old heroku repo](#deploy-first-time-to-old-heroku-repo)

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

## Again and again

```bash
$ grunt
$ cd dist
$ grunt buildcontrol:heroku
```

## Deploy first time, to old heroku repo

```bash
$ rm -rf dist
$ heroku git:clone -a dnd-tool dist
$ grunt
$ cd dist
$ grunt buildcontrol:heroku
```
