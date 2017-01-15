# Clojure by Example

[ ![Codeship Status for kimh/clojure-by-example](https://app.codeship.com/projects/e22ef5b0-f40c-0132-2194-16cf317d1634/status?branch=master)](https://app.codeship.com/projects/85514)

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

## Todo

* test
* java interlop
* require/include
* clean up the confusion in sequence. probably I should use coll where sequence is mentioned because sequence is not data type.
