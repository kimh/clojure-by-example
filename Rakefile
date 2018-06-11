# coding: utf-8
require 'middleman-gh-pages'

task :default => [:build]

task "spellcheck" do
  result = `cat source/index.html.md | aspell list --lang=en`

  if result.empty?
    exit 0
  else
    puts "======== Spell errors ========"
    puts result
    exit 1
  end
end
