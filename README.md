# Clojure by Example

[![Codeship Status](https://www.codeship.io/projects/2975f190-646d-0131-452c-7a6d2bba8338/status?branch=master)](https://codeship.com/projects/85514)

This repository hosts code for [Clojure by Example](http://kimh.github.io/clojure-by-example/)

## Development

Run the following commands to run locally.

```
bundle install
bundle exec middleman server
```

The command output from middleman tells you the url to access.

## Test

There are spell checking tests. To run the test, use run the following commands.

```
cp .aspell.en.pws ~/
bundle exec rake spellcheck
```

You can add words to ignore from the checking to `.aspell.en.pws`.
