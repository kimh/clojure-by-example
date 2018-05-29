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

## Updating Slate

This site is created based on [Slate](https://github.com/lord/slate). The only way I know to update Slate is copying all files from the new version of Slate repository
and update only what you need for Clojure By Example site.

Namely they are

- `source/index.html.md` for the main content
- `source/stylesheets/_variables.scss` for font size
- `source/layouts/layout.erb` for "Clojure By Example" logo

See [this commit](https://github.com/kimh/clojure-by-example/commit/a2872b5660b89af5137a02be7169ae6c788b31b7) as an example.

## Todo

* test
* clean up the confusion in sequence. probably I should use coll where sequence is mentioned because sequence is not data type.
* defrecord
* destructuring
* dissoc in Map
