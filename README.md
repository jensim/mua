# Mutant: Undergångens Arvtagare,
Character building tool in the web. This is a tool for the old school pen and paper role players that never remember to bring their character sheets or rule books. It is also a tool to simplify all the rules for calculations of BEG on skills and such. This is a Swedish game, and therefor the gui is written in swedish.

Scaffolded from The lovely [Yeoman](https://yeoman.io/) generator [Angular fullstack](https://github.com/DaftMonk/generator-angular-fullstack)

# Project status
[![Build Status](https://travis-ci.org/jensim/mua.png)](https://travis-ci.org/jensim/mua)

[![Dependency Status](https://david-dm.org/jensim/mua.png)](https://david-dm.org/jensim/mua)

[![devDependency Status](https://david-dm.org/jensim/mua/dev-status.png)](https://david-dm.org/jensim/mua#info=devDependencies)

[![GitHub version](https://badge.fury.io/gh/jensim%2Fmua.png)](https://badge.fury.io/gh/jensim%2Fmua)

[![bitHound Score](https://www.bithound.io/github/jensim/mua/badges/score.svg)](https://www.bithound.io/github/jensim/mua)

[![bitHound Dependencies](https://www.bithound.io/github/jensim/mua/badges/dependencies.svg)](https://www.bithound.io/github/jensim/mua/master/dependencies/npm)

[![bitHound Dev Dependencies](https://www.bithound.io/github/jensim/mua/badges/devDependencies.svg)](https://www.bithound.io/github/jensim/mua/master/dependencies/npm)

[![Coverage Status](https://coveralls.io/repos/jensim/mua/badge.svg?branch=master&service=github)](https://coveralls.io/github/jensim/mua?branch=master)

[![LICENCE](https://img.shields.io/badge/LICENCE-GPLv3-blue.svg)](LICENSE.txt)

[![Creative Commons](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

# Content
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Developing](#developing)
- Pushing to Heroku
  - [First time](#first-time)
    - [Deploy first time, to old heroku repo](#deploy-first-time-to-old-heroku-repo)
  - [Again and again](#again-and-again)

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
$ heroku git:clone -a mua dist
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
