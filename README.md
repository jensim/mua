# Dnd-Tool
Dungeons and Dragons 5, character building ang maintaining

Scaffolded from The lovely [Yeoman](https://yeoman.io/) generator [Angular fullstack](https://github.com/DaftMonk/generator-angular-fullstack)

[![Build Status](https://travis-ci.org/jensim/dd.png)](https://travis-ci.org/jensim/dd)

[![Dependency Status](https://david-dm.org/jensim/dd.png)](https://david-dm.org/jensim/dd)

[![devDependency Status](https://david-dm.org/jensim/dd/dev-status.png)](https://david-dm.org/jensim/dd#info=devDependencies)

[![GitHub version](https://badge.fury.io/gh/jensim%2Fdd.png)](https://badge.fury.io/gh/jensim%2Fdd)

## Prerequisites

```
$ npm install -g bower grunt grunt-cli
```

## Installation

```
$ bower install
$ grunt
```

## Developing

```
$ grunt serve
```
## Pushing to Heroku

### First time

```
$ grunt
$ cd dist
$ heroku login
$ # Username
$ # Password
$ heroku addons:create mongolab
$ yo angular-fullstack:heroku
```

### Again and again

```
$ grunt
$ cd dist
$ grunt buildcontrol:heroku
```
