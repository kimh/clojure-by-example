# Clojure by Example

[![CircleCI](https://circleci.com/gh/kimh/clojure-by-example.svg?style=svg)](https://circleci.com/gh/kimh/clojure-by-example)

This repository hosts code for [Clojure by Example](http://kimh.github.io/clojure-by-example/)

## Development

Run the following commands to run locally.

```
bundle install
bundle exec middleman server
```

The command output from middleman tells you the url to access.

## Test

There are spell checking tests.

```
cp .aspell.en.pws ~/
bundle exec rake spellcheck
```

You can add words to ignore from the checking to `.aspell.en.pws`.

## Todo

* test
* clean up the confusion in sequence. probably I should use coll where sequence is mentioned because sequence is not data type.
* defrecord
* destructuring
* default value of get
