---
title: Clojure by Example

includes:

search: true

toc_footers:
 - Powered by <a href='https://github.com/tripit/slate'>Slate</a>
 - Hosted on <a href='https://github.com/kimh/clojure-by-example'>Github</a>
 - Made by <a href='http://kimh.github.io/about/'>Hirokuni Kim</a>
---

# About
I don't like reading thick O'Reilly books when I start learning new programming languages. Rather, I like starting by writing small and dirty codes. If you take this approach, having many simple codes examples are extremely helpful because I can find answers to these questions very easily.

*How can I define a function?*

*What's the syntax for if and else?*

*Does the language support string interpolation?*

*What scopes of variables are available?*

These are very basic questions, but enough to start hacking with the new languages.

<br>

Recently, I needed to learn this completely new language **Clojure** but couldn't find what I wanted. So, I decided to create one while learning Clojure.

Hopefully, this helps you to start learning and writing Clojure!

# Hello, world!

```clojure
user=> (println "Hello, world!")
Hello, world!
nil




user> "h"
"h"

user> 100
100

user> true
true
```

<br>

Our first Clojure code is, of course, printing "Hello, world!". Here, we invoke the **function** `println` with the **argument** `Hello, world!`. We call the invocation of function ***applying the function to data*** in Clojure or other functional programming language.

<br>
<br>

The entire line of the code `(....)` is called a **form** in Clojure. It's also called **expression** in a general sense, but there is no real problem to use them interchangeably.

You can think of form as something that returns a value. `"h"` `100` `true` are all forms as well.


# Bindings

Giving names to values is called **assignment** in many programming languages. However, we call the mapping between names and values  **binding** in Clojure.

## Symbol

Symbols are used to bind names to values. `a` `b` `my-cool-function` `nyncat`: they are all symbols in Clojure.

```clojure
user> (type 'a)
clojure.lang.Symbol

user> (type 'b)
clojure.lang.Symbol

user> (type 'my-cool-function)
clojure.lang.Symbol

user> (type 'nyncat)
clojure.lang.Symbol
```

<br>

`'` will prevent a form from being evaluated. We are doing this here because we want to treat symbols as data in order to pass them to `type` function.

```clojure
user> (def a "aaaaa")
#'user/a

user> (println a)
aaaaa
nil

user> (println b)
CompilerException java.lang.RuntimeException: Unable to resolve symbol: b in this context, compiling:(NO_SOURCE_PATH:1:1)
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


If you don't prepend a `'` single quote, you are telling Clojure to resolve the symbol. You can obtain bound values by resolving symbols.

<br>

When we try to resolve symbols that are not bound to anything, Clojure complains with the exception.

## Let

```clojure
user=> (let [l "light"] (println (str "God said let there be " l)))
God said let there be light
nil
```

<br>

To bind values to names, use `let`. Let takes a vector which takes a symbol in the first element and a value in the second element.

```clojure
user=> (println l)

CompilerException java.lang.RuntimeException: Unable to resolve symbol: l in this context, compiling:(NO_SOURCE_PATH:1:1)
```

<br>
<br>

You cannot resolve the symbol outside the let. This behavior is very similar to *private variable* in other programming languages.

```clojure
user=> (let [l "light"
             d "darkness"]
             (println (str "God said let there be " l))
             (println (str "God also said let there be " d)))
God said let there be light
God also said let there be darkness
nil
```

<br>
<br>
<br>

You can also provide multiple bindings.

```clojure
user> (let [l "light"
            l_d (str l " and" " darkness")]
            (println (str "God also said let there be " l_d)))
God also said let there be light and darkness
nil
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>

The binding will be immediately available, so each binding can see the prior bindings.

## Scope

When Clojure tries to resolve a symbol, the resolution will be done in the **scope** of the symbol.

```clojure
user> (let [a "aaa"]
        (println a))
aaa
nil
```

<br>

Clojure tries to evaluate `a` because it needs to pass the value to `println`. `a` is bound to `"aaa"`, so "aaa" is printed in your terminal. Very straight forward.

```clojure
user> (let [a "aaa"]
        (let [a "AAA"]
          (println a)))

AAA
nil
```

<br>
<br>
<br>

Now, `let` are nested. Like previous example, Clojure tries to resolve `a`. However, this time Clojure resolves `a` to `"AAA"`, instead of `aaa`. Each `let` will create a scope and symbol resolution is done inside the let where the symbol is resolved.



```clojure
user> (let [a "aaa"]
        (let [a "AAA"]
          (println a))
        (println a))
AAA
aaa
nil
```

<br>
<br>
<br>
<br>

Also notice that the inner `let` does not override the scope of outer `let`.


<br>
<br>
<br>
<br>
<br>

The kind of scope is called **lexical scope**. For those whom English is not your first language, lexical means *words in a sentence*. The scope is **lexical** because the compiler relies on the physical location of the symbol (word) in a program (sentence) to resolve them.

```clojure
user> (let [a "a"]
        (let []
          (println a)))
a
nil
```

<br>

The resolution look up bubbles up until it finds the binding. The inner `let` doesn't provide the binding for `a`, so it bubbles up to outer `let`. This happens because the scope of inner let is wrapped by the scope of outer `let`.

```clojure
user> (let [a "a"]
        (let []
          (println not-bound-symbol)))
CompilerException java.lang.RuntimeException: Unable to resolve symbol: not-bound-symbol in this context, compiling:(NO_SOURCE_PATH:3:11)
```

<br>
<br>
<br>

Clojure complains with **Unable to resolve symbol** exception when it cannot find the binding inside the given scope.

<br>
<br>
<br>

You probably find the idea of lexical scope very familiar. This is because most of modern programming languages use lexical scope. There is also something called *dynamic scope* but you probably don't have to know right now.

## Def

```clojure
user=> (def object "light")
#'user/object

user=> (println (str "God said let there be " object))
God said let there be light
nil
```

<br>

You can also bind symbols to values with `def`. While you can access the symbol only from within the `let` where it's declared , you can access the symbol declared with `def` from anywhere.

```clojure
user=> (def object "darkness")
#'user/object

user=> (println (str "God said let there be " object))
God said let there be darkness
nil
```


<br>
<br>
<br>
<br>
<br>

You can also override the one already declared later.

<br>
<br>
<br>
<br>

The rule of thumb in Clojure is avoiding the use of `def` as much as possible. `def` will introduce the state and the abusing of the state will make our code difficult to maintain.

# Functions

## Defn

```clojure


user=> (defn say-hello
         [name]
         (println (str "Hello, " name)))

user=> (say-hello "kim")
Hello, kim
nil
```

<br>

To define a function, use `defn`.

The first argument is the name of function `say-hello`, the second argument is the argument of the function `[name]`, and the third argument is the function body ` (println (str "Hello, " name))`.

```clojure
user=> (defn say-hello
         "Takes name argument and say hello to the name"
         [name]
         (println (str "Hello, " name)))
```

<br>
<br>
<br>
<br>
<br>

You can also add documentation.

```clojure
user=> (doc say-hello)
-------------------------
user/say-hello
([name])
  Takes name argument and say hello to the name
nil
```

<br>
<br>
<br>
<br>

Use `doc` to read the documentation.

```clojure
user=> (defn say-hello
         "Takes name argument and say hello to the name"
         {:added "1.0"
          :static true}
         [name]
         (println (str "Hello, " name)))
```

<br>
<br>
<br>
<br>
<br>
<br>

You can also add metadata of the function.

```clojure
user=> (meta (var say-hello))
{:added "1.0", :ns #<Namespace user>, :name say-hello, :file "NO_SOURCE_PATH", :static true, :column 1, :line 1, :arglists ([name]), :doc "Takes name argument and say hello to the name"}
```

<br>
<br>
<br>
<br>
<br>
<br>


You can expand the metadata with `meta`. Notice that `say-hello` is first passed to `var`. This is because `meta` expects it's argument to be var object, not value, and `var` will turn the passed symbol into var object.

```clojure
user> (meta #'say-hello)
{:added "1.0", :ns #<Namespace user>, :name say-hello, :file "NO_SOURCE_PATH", :static true, :column 1, :line 1, :arglists ([name]), :doc "Takes name argument and say hello to the name"}
```

<br>

`#'` is the reader macro for `var` and works the exactly same.

## Anonymous Function

Functions are first class object in Clojure. When you say something is *a first class object in programming language X*, it means that you can do the all basic operations with the object
such as passing to a function, returned from a function, and binding to variable, etc.


```clojure
user=> (fn [] (println "Hello world"))
#<user$eval3663$fn__3664 user$eval3663$fn__3664@5de5bfa4>
```

<br>

To create a function object, use `fn`.

```clojure
user=> (def hello-world-func (fn [] (println "Hello world")))
#'user/hello-world-func

user=> (hello-world-func)
Hello world
nil
```

<br>
<br>

You can bind functions to var just like other values. This works just like `defn`


```clojure
user=> #(+ 1 1)
#<user$eval2902$fn__2903 user$eval2902$fn__2903@1cc9a623>

user=> (fn [] (+ 1 1))
#<user$eval2920$fn__2921 user$eval2920$fn__2921@40bd9db>
```

<br>
<br>
<br>
<br>
<br>
<br>


`#()` is the shortcut for `fn`.

```clojure
user=> #(+ 1 %)
#<user$eval2930$fn__2931 user$eval2930$fn__2931@3e445ad7>

user=> (let [plus #(+ 1 %)]
         (plus 10))
11

user=> (let [plus-numbers #(+ 1 %1 %2 %3)]
         (plus-numbers 10 20 30))
61
```

<br>
<br>
<br>
<br>
<br>

`%` will be replaced with arguments passed to the function. When the function takes multiple arguments, `%1` is for the first argument, `%2` is for the second and so on.

```clojure
user=> (def say-hello (fn [name] (println (str "Hello, " name))))
#'user/say-hello

user=> (def say-bye (fn [name] (println (str "Good bye, " name))))
#'user/say-bye

user=> (def greeting (fn [greeting-func name] (greeting-func name)))
#'user/greeting-to-kim

user=> (greeting say-hello "Kim")
Hello, Kim
nil

user=> (greeting say-bye "Kim")
Good bye, Kim
nil
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


You can also pass a function to another function. We define two functions and bind to `say-hello` and `say-bye` vars. We also define a generic function and bind to `greeting`.

<br>
<br>
<br>
<br>
<br>

Then we pass `say-hello` and `say-bye` to `greeting`.

## Closure

When a function (let's call this *inner* function) is returned from another function (let's call this *outer* function), and the inner function does somethings with the arguments given from outer function, then the inner function is called **closure**.

```clojure
user=> (defn inner
         [from-outer]
         (fn [] (println from-outer)))
#'user/inner

user=> (def outer1 (inner "this is from outer"))
#'user/outer1

user=> (def outer2 (inner "this is yet another from outer"))
#'user/outer2

user=> (outer1)
this is from outer
nil

user=> (outer2)
this is yet another from outer
nil
```

<br>

We define a function called `inner`. `inner` function prints `from-outer` var which is supposed to be given by outer function.

<br>
<br>

We also define two functions, `outer1` and `outer2`. These functions both call `inner` but with different arguments.

<br>
<br>

As a result, even if `from-outer` var doesn't change, `inner` prints different things.


# Control Flow

## If

```clojure
user=> (if true
         (println "This is always printed")
         (println "This is never printed"))
This is always printed
nil
```

<br>

`if` takes a predicate (`true` or `false`) in the first argument. The second argument will be evaluated if the predicate is evaluated to `true`. The third argument is equivalent to **else** in many programming language which is evaluated when the predicate is evaluated to `false`.

```clojure
user=> (if true
         (do
         (println "one")
         (println "two")))
one
two
nil
```

<br>
<br>
<br>

In Clojure, you can pass only one expression to a branch of `if`. However, you often need to pass more than one expression in real programs. In this case, use `do`.

## If-Let

```clojure
user=> (defn positive-number-seq [numbers]
         (if-let [pos-nums (seq (filter pos? numbers))]
          pos-nums
          "no positive numbers"))

user=> (positive-number-seq [-1 -2 1 2])
(1 2)

user=> (positive-number-seq [-1 -2])
"no positive numbers"
```

<br>

After testing condition, you often want to reuse it later. `if-let` binds the evaluated condition to var when it's truthy. In this example, when `positive-number-seq` receives a collection which contains positive numbers, the result of `(seq (filter pos? numbers)` will be bound to `pos-nums`.

<br>

`pos-nums` is returned since the collection contains positive numbers `1 2`.
<br>
<br>
The second argument is for **else** branch. It will be evaluated when the first argument is evaluated to be false.

```
user=> (seq [1 2])
(1 2)

user=> (seq [])
nil
```

<br>

Note that `seq` will return `nil` when empty collection is passed.

## When

```clojure
user=> (when true
         (println "one")
         (println "two"))
one
two
nil
```

<br>

When you only care about the case when the condition is truthy, you can use `when`. `when` is similar to `if` but no **else** branch and already wrapped by `do`, so you can pass multiple expression.

```clojure
user=> (when false
         (println "one")
         (println "two"))
nil
```

<br>
<br>
<br>
<br>

Since there is no **else** branch, this doesn't do anything.

## When-Let

```clojure
user=> (when-let [pos-nums (filter pos? [ -1 -2 1 2])]
          pos-nums
          (println "one")
          (println "two"))
one
two
nil
```

<br>

There is also `when-let` which is similar to `if-let` but no **else** branch.

## Case

```clojure
user=> (defn case-test-1
         [n]
         (case n
            1 "n is 1"
            2 "n is 2"
            "n is other"))
#'user/case-test-1

user=> (println (case-test-1 1))
n is 1
nil

user=> (println (case-test-1 2))
n is 2
nil

user=> (println (case-test-1 3))
n is other
nil
```

<br>

There is also `case` which works pretty much the same as the one in other programming languages. `case` compares the value with each condition with `=`
and evaluates the expression in the matched branch.

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
The expression in the last branch will be evaluated if none of other branches are matched.

## Cond

```clojure
user=> (defn cond-test
         [n]
         (cond
           (= n 1) "n is 1"
           (and (> n 3) (< n 10)) "n is over 3 and under 10"
           :else "n is other"))

user=> (println (cond-test 1))
n is 1
nil

user=> (println (cond-test 5))
n is over 3 and under 10
nil

user=> (println (cond-test 15))
n is other
nil
```

<br>

When you want to do similar thing to `case` but want to write your own test case rather than `=`, you can use `cond`. You can write different test case in each branch with `cond`.

<br>
<br>
You use `:else` keyword for the default case.

## Condp

```clojure
user=> (defn condp-test-2
         [n]
         (condp contains? n
           [1 2 3] "n is either 1 or 2 or 3"
           "n is not 1 or 2 or 3"))
#'user/condp-test-2

user=> (println (condp-test-2 2))
n is either 1 or 2 or 3
nil

user=> (println (condp-test-2 5))
n is not 1 or 2 or 3
nil
```

<br>

You can use predicate with `condp` for condition. In this case `contains?` is the predicate.


<br>
<br>
<br>
<br>

`(contains? [1 2 3] 2)` will be evaluated in this case.

<br>
<br>

`(contains? [1 2 3] 5)` will be evaluated falsey, thus default branch will be evaluated.

# Boolean

```clojure
user=> true
true

user=> false
false
```

<br>

`true` and `false` are values of **Boolean** type just like in other programming languages.

```clojure
user> (boolean false)
false

user> (boolean nil)
false

user> (boolean 0)
true

user> (boolean 1)
true

user> (boolean "hi there")
true

user> (boolean :hi)
true
```

<br>
<br>
<br>
<br>
<br>

In Clojure, everything except `false` and `nil` are `true`.

# Strings

## Literal

```clojure
user=> "Hi, there!"
"Hi, there!"
```

</br>

You can create a string by double-quoting texts.

## Str

```clojure
user=> (str "Good " "morning")
"Good morning"
```

<br>

To concatenate strings, use `str`.

```clojure
user=> (+ "Good " "morning")

ClassCastException java.lang.String cannot be cast to java.lang.Number  clojure.lang.Numbers.add (Numbers.java:126)
```

<br>
<br>

`+` operator doesn't work to concat strings against your expectation.

```clojure
user> (let [first "Hirokuni"
            last "Kim"]
            (str "My name is " first " " last))
"My name is Hirokuni Kim"
```

<br>
<br>
<br>
<br>

Clojure doesn't have string interpolation. `str` works for you.

## Format

```clojure
user=> (format "My name is %s %s" "Hirokuni" "Kim")
"My name is Hirokuni Kim"
```

<br>

Like many other languages, Clojure supports string formatting with `format` function. The concat example above can also be archived by using `format` function.

<br>

The first argument tells `format` function the format you want to apply to your strings. `%s` is called format specifier and it specifies the type of data to be formatted. The rest of arguments will replace format specifiers.

```clojure
user=> (format "My favorite fruit is %s" "apple")
"My favorite fruit is apple"

```

<br>

`%s` is a format specifier for string.

```clojure
user=> (format "I ate %d apples" 2)
"I ate 2 apples"
```

<br>
<br>
<br>

`%d` is a format specifier for integer.

```clojure
user=> (format "Pi: %.3f" 3.14159265)
"Pi: 3.142"

user=> (format "Pi: %.5f" 3.14159265)
"Pi: 3.14159"
```

<br>
<br>

`%.Nf` is a format specifier for floating numbers where N specifies how floating points to print.

<br>

```clojure
user=> (format "Boolean representation of 1: %b" 1)
"Boolean representation of 1: true"

user=> (format "Boolean representation of nil: %b" nil)
"Boolean representation of nil: false"
```

<br>
<br>
<br>

`%b` is a format specifier for boolean.

# Integers

## Addition

```clojure
user=> (+ 2 3)
5
```

## Subtraction

```clojure
user=> (- 10 3)
7
```

## Multiplication

```clojure
user=> (* 10 2)
20
```

## Division

```clojure
user=> (/ 4 2)
2
```

```clojure
user=> (/ 4 3)
4/3
```

</br>
</br>
</br>
</br>
</br>

Interesting thing is that fraction is represented by ratio.

## Modulo

```clojure
user=> (mod 3 2)
1
```

<br>

Get modulus with `mod`

## Max

```clojure
user=> (max 1 2 3 4 5)
5
```

<br>

Get the greatest and smallest number with `max`.

## Min

```clojure
user=> (min 5 4 3 2 1)
1
```

<br>

Get the smallest number with `min`.

## Power

```clojure
user=> (defn power
  [x n]
  (reduce * (repeat n x))
)

user=> (power 2 3)
8
```

Clojure doesn't provide built-in function for exponential operation.

Define a function `power`. `reduce` takes a sequence generated by `repeat` and compute `*` against each element of the sequence and returns the sum. The sum is used to do `*` against the next element of the sequence.

## Bigint

```clojure
user=> (+ (bigint Long/MAX_VALUE) 10)
9223372036854775817N
```

<br>

You can use `bigint` to handle really big number.

# Lists

Lists are the most basic collection in Clojure which is a dialect of Lisp (List Processing language). However, you don't often use list as data collection because you have more useful collection data types in Clojure such as vectors or maps.

## Literal

```clojure
user=> '(1 2 3)
(1 2 3)
```

<br>

Lists are simple collection of values. You can create a list by grouping values with parentheses with a single quote `'` at the top.

```clojure
user> (1 2 3)
ClassCastException java.lang.Long cannot be cast to clojure.lang.IFn  user/eval2843 (NO_SOURCE_FILE:1)
```

<br>
<br>

We need `'` to prevent the list from being evaluated.

## Nth

```clojure
user=> (nth '(1 2 3) 1)
2
```

<br>

To get a value from the list, use `nth` with index number. Index starts from 0

## Count

```clojure
user=> (count '(1 2 3) )
3
```

<br>

To count how many values in the list, use `count`.

## Conj

```clojure
user=> (conj '(1 2 3) 4)
(4 1 2 3)
```

<br>

To add a value to the list, use `conj` (conj[oin]). Note that the new value is added to the top.

## Remove element

How to remove a value from a list? You can't really remove a value from list in Clojure. That's not what list is supposed to do.
If you are writing a program that needs to remove items from collection, you should use other type of collection such as vectors or sets.

# Vectors

You can think of vectors as efficient and useful version of lists. It's more practical data storage of multiple values than lists.

## Literal

```clojure
user=> [1 2 3]
[1 2 3]
```

<br>

You can create a vector by grouping values with square brackets. Unlike lists, you don't need `'` because vectors will not be evaluated.

## Nth

```clojure
user=> (nth [1 2 3] 1)
2
```
<br>
To get a value from the vector, you need to specify the index of the value.

```clojure
user=> (first [1 2 3])
1

user=> (last [1 2 3])
3
```

<br>
<br>
<br>

Vectors have convenient functions to access elements. To get the first and second elements, use `first` and `second`.

## Conj

```clojure
user=> (conj [1 2 3] 4)
[1 2 3 4]
```

<br>

To add a value, use `conj` (conj[oin]). Note that the new value is added to the bottom while it is added to the top in lists.

## .indexOf

```clojure
user=>  (.indexOf [1 2 3] 2)
1
```

<br>

You can get the index of a value with `.indexOf`. The dot before indexOf indicates Java interop to access methods in Java.

```clojure
user=>  (.indexOf [1 2 3] 4)
-1
```

<br>
<br>

Returns `-1` if the value doesn't exist.


# Sets

Sets are unordered collection of values, meaning that the order of values are not guaranteed.

## Literal

```clojure
user=> #{1 2 3}
#{1 3 2}
```

<br>

You can create a set by grouping values with `#{}`. I get the order of 1 -> 3 -> 2 on my computer but you may the get different order since the order is not guaranteed

## Sort

```clojure
user=> (sort (conj #{1 2 3} 4))
(1 2 3 4)
```

<br>

To get a sorted order, use `sort`.

## Conj

```clojure
user=> (conj #{1 2 3} 4)
#{1 4 3 2}
```

<br>

To add a value, use `conj` (conj[oin]).

```clojure
user=> (conj (conj #{1 2 3} 4) 4)
#{1 4 3 2}
```

<br>
<br>

One important trait of sets is that **it does not contain an element more than once.**

## Disj

```clojure
user=> (disj #{1 2 3} 1)
#{3 2}
```

<br>

To create a set where a value is removed (basically removing a value from set), use `disj` (disj[oin]).

```clojure
user=> (disj #{1 2 3} 4)
#{1 3 2}
```

<br>
<br>

If trying to `disj` a value that doesn't exist in the set, it returns the original set.

## Select

```clojure
user=> (clojure.set/select odd? #{1 2 3} )
#{1 3}
```

<br>

To select certain values from a set, use `select`. `odd?` returns boolean for each element. This example returns a new set which only contains odd numbers.

## Contains?

```clojure
user=> (contains? #{1 2 3} 1)
true

user=> (contains? #{1 2 3} 4)
false
```

<br>

To check if a value is contained in the set, use `contains?`.

## Subset?

```clojure
user=>  (clojure.set/subset? #{1 2} #{1 2 3 4})
true

user=>  (clojure.set/subset? #{1 5} #{1 2 3 4})
false
```

<br>

To check if a set is the part of another set, use `subset?`.

## Superset?

```clojure
user=>  (clojure.set/superset? #{1 2 3} #{1 2})
true
```

<br>

To check if a set includes another set, use `superset?`.

# Maps

Maps are key-value data structure to store multiple values.

## Literal

```clojure
user=> {"Apple" "Mac" "Microsoft" "Windows"}
{"Apple" "Mac" "Microsoft" "Windows"}
```

<br>

You can create a map by grouping values with `{}`.


## Get

```clojure
user=> (get {"Apple" "Mac" "Microsoft" "Windows"} "Apple")
"Mac"
```

<br>

To get value from key, use `get`.

```clojure
user=>  (get {"Apple" "Mac" "Microsoft" "Windows"} "Linux")
nil
```

<br>
<br>

You get `nil` when key doesn't exist.

```clojure
user> (:Apple {:Apple "Mac" :Microsoft "Windows"})
"Mac"
```

<br>
<br>

When the key of a map is symbol, you can use the symbol just like a function to get the value.

## Assoc

```clojure
user=> (assoc {"Apple", "Mac" "Microsoft" "Windows"} "Commodore" "Amiga")
{"Commodore" "Amiga", "Apple" "Mac", "Microsoft" "Windows"}
```

<br>

To add a key-value pair, use `assoc`.

```clojure
user=> (assoc {"Apple", "Mac" "Microsoft" "Windows"} "Apple" "iOS")
{"Apple" "iOS", "Microsoft" "Windows"}
```

<br>
<br>

If the key already exists, it replaces the value.

## Merge

```clojure
user=> (merge {"Apple", "Mac" "Microsoft" "Windows"} {1 2})
{1 2, "Apple" "Mac", "Microsoft" "Windows"}
```

<br>

To combine two maps, use `merge`.

## Keys

```clojure
user> (keys {"Apple", "Mac" "Microsoft" "Windows"})
("Apple" "Microsoft")
```

<br>

To get all keys from a map, use `keys`.

## Vals

```clojure
user> (vals {"Apple", "Mac" "Microsoft" "Windows"})
("Mac" "Windows")
```

<br>

To get all values from a map, use `vals`.

# Sequences

Sequences are logical lists that are not tied to a particular implementation. What does it mean? It means that you can apply the same functions to any types of collections without worrying about what types of collections that you are dealing with.

`Sequences` **are the most important data abstraction in Clojure.**


```clojure
user=> (map inc [ 1 2 3 ])
(2 3 4)

user=> (map inc `( 1 2 3 ))
(2 3 4)

user=> (map inc #{ 1 2 3 })
(2 4 3)



user=> (map println {:a 1 :b 2 :c 3} )
[:c 3]
[:b 2]
[:a 1]
(nil nil nil)
```

<br>

Applying `map` for the vector.

<br>

Applying `map` for the list.

<br>

Applying map for the set.

<br>

Applying `map` for the map. We are using `println` for the function that we apply since you cannot `inc` a map, but this doesn't hurt the idea that you can use `map` for any collections.

```clojure
user=> (type (map inc [ 1 2 3 ]))
clojure.lang.LazySeq

user=> (type (map inc `( 1 2 3 )))
clojure.lang.LazySeq

user=> (type (map inc #{ 1 2 3 }))
clojure.lang.LazySeq
```

<br>
<br>
<br>
<br>

As you can see, the type of all returned values is `LazySeq`.

## Map

```clojure
user=> (map inc [ 1 2 3 ])
(2 3 4)
```

<br>

To apply a function to each element of collection, use `map`.

```clojure
user=> (map (fn [x] (+ x 1)) '(1 2 3))
(2 3 4)
```

<br>
<br>

If you want to do something more complex with each element, you can pass an anonymous function where each value is bound to `x`.

## Reduce

```clojure
user=> (reduce + [1 2 3 4])
10
```

<br>

`reduce` boils down values in a collection into a single value by applying a function.

```clojure
user=> (reduce + -10 [1 2 3 4])
0
```

<br>
<br>

You can pass a default value in the second argument. When default value is given, `reduce` will use it as a starting point.

## Into

To convert from one type of collection to another, use `into`.

```clojure

user=> (into [] `(1 2 3))
[1 2 3]
```

<br>
<br>

Converting a list to a vector.


```clojure
user=> (into (list) [1 2 3])
(3 2 1)
```

<br>
<br>

Converting a vector to a list.

```clojure
user=> (into #{} [1 2 3])
#{1 3 2}
```

<br>
<br>

Converting a vector to a set.

```clojure
user=> (into [] #{1 2 3})
[1 3 2]
```

<br>
<br>

Converting a set to a vector.

```clojure
user=> (into {} [[:a 1] [:b 2] [:c 3]])
{:a 1, :b 2, :c 3}
```

<br>
<br>

Converting a nested vector into a map.

```clojure
user=> (into [] {:a 1 :b 2 :c 3})
[[:c 3] [:b 2] [:a 1]]
```

<br>
<br>

Converting a map to a nested vector.

```clojure
user=> (reduce conj #{} [1 2 3])
#{1 3 2}
```

<br>
<br>

`into` is just a thin wrapper around `reduce`. In fact, you can easily rewrite previous examples with `reduce`.

## Reverse

``````clojure
user=> (reverse [1 2 3])
(3 2 1)
```

<br>

To reverse a sequence, use `reverse`.

## Iterate

```clojure
user=> (iterate + 0)

```

<br>

You can get a sequence of infinite integers with `iterate`. Be careful, though. Running this example will freeze your terminal since the evaluation of this expression never returns.

## Range

```clojure
user=> (range 5 10)
(5 6 7 8 9)
```

<br>

To generates a sequence of numbers between two points, use `range`.

```clojure
user=> (range 0 100 5)
(0 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95)
```

<br>
<br>

You can get integers by every x within the range. In this case, we get a sequence of integers at every 5.

## Repeatedly

```clojure
user=> (repeatedly 5 (fn [] (println "hi!")) )
hi!
hi!
hi!
hi!
hi!
(nil nil nil nil nil)
```

<br>

To repeat something over and over again, use `repeatedly`. We are passing an anonymous function `(fn [] (println "hi!"))` because the second argument must be a function.

## Doseq

```clojure
user=> (doseq [animal ["cat" "dog" "horse"]] (println animal) )
cat
dog
horse
nil
```

<br>

Clojure doesn't have `for` or `for-each`. Do something to each element of a sequence, use `doseq`.

```clojure
user=> (doseq [n1 [1 2 ]
               n2 [4 5 ]]
         (println (+ n1 n2)))
5
6
6
7
nil
```

<br>
<br>
<br>
<br>
<br>

You can bind multiple values. In this case, each element in the first vector is added to each element of the second vector.


## Take

```clojure
user=> (take 5 (range 0 100))
(0 1 2 3 4)
```

<br>

To get the first `n` elements from a sequence, use `take`.

```clojure
user=>  (take 10 (range 0 5))
(0 1 2 3 4)
```

<br>
<br>

Take all elements from a sequence if the size of the sequence is smaller than `n`.

## Take-While

<br>

```clojure
user=> (take-while neg? [-3 -2 -1 0 1 2 3])
(-3 -2 -1)
```

To get the first `n` elements from a sequence as long as the condition is satisfied but stop taking when the condition is not met, use `take-while`. `neg?` returns true for negative number.

**Note:** Taking elements that only satisfies the condition is not what `take-while` does. That's the job of `select`.

## Drop

```clojure
user=> (drop 5 (range 0 10))
(5 6 7 8 9)
```

<br>

To remove the first `n` elements from a sequence, use `drop`.

## Drop-While

```clojure
user=> (drop-while neg? [-3 -2 -1 0 1 2 3])
(0 1 2 3)
```

<br>


To get the first `n` elements from a sequence as long as the condition is satisfied but stop dropping when the condition is not met, use `drop-while`.

## Concat

```clojure
user=> (concat '(1 2 3) '(4 5 6))
(1 2 3 4 5 6)
```

<br>

To combine sequences, use `concat`.

```clojure
user=> (concat '(1 2) '(4 5) '(7 8) '(9 10))
(1 2 4 5 7 8 9 10)
```

<br>
<br>

You can also pass more than two sequences to `concat`.

## Cons

```clojure
user=> (cons 0 '(1 2))
(0 1 2)
```

<br>

To insert an element to the head of sequence, use `cons`.

```clojure
user=> (def old-seq '(1 2))
#'user/old-seq

user=> (def new-seq (cons 0 old-seq))
#'user/new-seq

user=> old-seq
(1 2)

user=> new-seq
(0 1 2)
```

<br>
<br>

Although the term "insert" is used, `cons` doesn't actually insert an element to the existing sequence. Instead, `cons` creates a new sequence that contains the element based on the existing sequence.

## Partition-by

```clojure
user=> (partition-by #(< 3 %) [1 2 3 4 5 6])
((1 2 3) (4 5 6))
```

<br>

To split a collection and group together in a certain way, or in other word partition, "use `partition`. In this example, we partition the vector into two groups: one smaller than or equal 3 and another bigger than 3.

```clojure
user=> (partition-by #(< 3 %) [1 2 3 4 5 6 1 2 3])
((1 2 3) (4 5 6) (1 2 3))
```

<br>

Notice that `(1 2 3)` at the end of the sequence is grouped together as a separate sequence from the first one. `partition-by` doesn't merge values.

## Group-by

```clojure
user=> (group-by #(< 3 %) [1 2 3 4 5 6 1 2 3])
{false [1 2 3 1 2 3], true [4 5 6]}
```

`group-by` splits a collection and does merge them together unlike `partition-by`. `group-by` returns a map where key is the result of the grouping condition.

## Lazy Sequence

Most of Clojure’s sequences are **lazy**. All familiar functions such as `map` `range` `reduce` etc returns lazy sequences.

```clojure
;; You need hit Ctrl+c very quickly to stop!!
user=> (println (iterate inc 0))
(0 1 2 3 ......
```

<br>

`(iterate inc 0)` generates a sequence of infinite numbers which, of course, takes infinitely. But, you see `println` starts printing the numbers `(0 1 2 3 ......`. If the generation of the sequence never ends, how `println` can even start printing these numbers?

<br>

This is possible because `iterate` generates lazy sequence and `println` is able to handle lazy sequence correctly. `println` asks a number to print from `iterate` one by one, rather than asking the entire sequence. `iterate` only computes numbers as it is requested and pass the numbers to `println`.

```clojure


user=> (println (take 5 (iterate inc 0)))
(0 1 2 3 4)
nil
```

<br>
<br>

`take` only asks the first `n` values from lazy sequence. `iterate` also only computes the first five numbers because that's what asked by `take`.

<br>

## For

If you are looking for how to write for loop in Clojure, I'm sorry, but this is not what you are looking for. Clojure doesn't have for loop because there is no mutable variable that you need inside for loop in Clojure. But more importantly, you can archive the same thing that for loop can archive with more elegant way.

In Clojure, `for` is **list comprehension**. What is list comprehension? First of all, let's look at an example.

```clojure
user=> (for [x '(1 2 3)]
         (+ 10 x))
(11 12 13)

```

<br>

`for` takes a vector of one or more collections and iterate over collections while binding each value to symbols.

<br>

In short, **list comprehension** is a way to create a list from existing lists. The idea of list comprehension comes from math world. It's used in order to write sets in simpler and easier way.

For example, `{x | x >0}` means the set of all `x` that is bigger than than 0. So if `x` is the set of -1, 1, and 2, then the notation refers to the set of 1 and 2 but not -1.

```clojure
user=> (for [x '(-1 1 2) :when (< 0 x)]
         x)
(1 2)
```

<br>

This is a list comprehension that means the same thing as `{x | x >0}` in math.

`:when` modifier evaluates the body only for values where the predicate is true.

```clojure
user=> (for [x [0 1 2 3 4 5]
             :let [y (* x 3)]
             :when (even? y)]
         y)
(0 6 12)
```

<br>

`let` modifier can be used to bind intermediate values.

```clojure
user=> (for [x (range 10) :while (not= x 5)]
         x)
(0 1 2 3 4)
````

<br>
<br>
<br>
<br>
<br>

`while` modifier stops the evaluation of the body when the predicate is false.

```clojure
user=> (for [x ['a 'b 'c]
             y [1 2 3]]
        [x y])
([a 1] [a 2] [a 3] [b 1] [b 2] [b 3] [c 1] [c 2] [c 3])
```

<br>
<br>
<br>

`for` iterates collections in a nested fashion. It's useful to create the combination of all elements in the given collections.

# Macros

Clojure's Macros gives you the power to restructure your Clojure code as you like. For example, you can create your own code syntax, invent new control flow, new types of values, etc.

## Defmacro

```clojure
user=> (defmacro unless [test then]
           "Evaluates then when test evaluates to be falsey"
           (list 'if (list 'not test)
            then))

user=> (unless false (println "false!!"))
false!!
nil

;; Error
user=> (defmacro unless [test then]
           "Evaluates then when test evaluates to be falsey"
           (list if (list not test)
            then))

CompilerException java.lang.RuntimeException: Unable to resolve symbol: if in this context, compiling:(NO_SOURCE_PATH:3:12)
```

<br>

To define a macro, use `defmacro`. Like function, you can give it a name, docs, and arguments. Note that you are using quotes `'` followed by `if` and `not`.
This is because you don't want them to be evaluated when you define the macro.

<br>
<br>
<br>
<br>

Without quotes, you will see an exception.

## Macroexpand

```clojure
user=> (macroexpand '(unless false (println "hi")))
(if (not false) (println "hi"))
```

<br>

Macros are replaced with Clojure code before it's evaluated. To see how it will be replaced without actually evaluating the macro, use `macroexpand`.
Note that you have to use `'` because you want it to be unevaluated list.

## Quotes

```clojure
user=> (+ 1 2)
3


user=> (quote (+ 1 2))
(+ 1 2)


user=> '(+ 1 2)
(+ 1 2)
```

<br>

Without a quote, this expression will be just evaluated and returns the value.

<br>

However, when an expression is surrounded by `quote`, it does not evaluate the expression but returns the expression itself.

<br>

`'` is another form of `quote`. It does the exactly same thing with `quote`. `'` is used more often than `quote` since it's concise.

```clojure
user=> (defmacro unless [test then]
           "Evaluates then when test evaluates to be falsey"
           (list 'if (list 'not test)
            then))
```

<br>

You can see quoting at work in macros. In this `unless` macro, you need to use `'` followed by `if` and `not` because you don't want them to be evaluated inside the macro definition.

## Syntax-Quotes

```clojure
user=> `(+ 1 2)
(clojure.core/+ 1 2)
```

<br>

Syntax quoting ``` ` ```works very similarly to quoting `'`: it returns an unevaluated expression.

```clojure
user=> '(dec (inc 1))
(dec (inc 1))

user=> `(dec (inc 1))
(clojure.core/dec (clojure.core/inc 1))
```

<br>
<br>

However, you see the difference from quoting when the expression contains symbols. Unlike quoting, syntax-quoting returns the fully qualified namespace.
Using fully qualified namespace is very important in order to avoid name conflicts when defining macro.

## Unquotes

```clojure
user=> '(+ 1 ~(inc 1))
(+ 1 (clojure.core/unquote (inc 1)))

user=> `(+ 1 ~(inc 1))
(clojure.core/+ 1 2)
```

<br>

You will see another difference between syntax quoting and quoting when syntax quoting is used with unquoting `~`. Syntax quoting allows unquoting to evaluate the expression followed by `~`.

```clojure
user=> '(+ 1 ~(inc 1))
(+ 1 (clojure.core/unquote (inc 1)))
```

<br>
<br>
<br>
<br>

Quoting doesn't allow unquoting to evaluate an expression.

## Unquote-Splice

```clojure
user=> `(+ ~(list 1 2 3))
(clojure.core/+ (1 2 3))

user=> `(+ ~@(list 1 2 3))
(clojure.core/+ 1 2 3)
```

<br>

The `~@` unquote splice works just like `~` unquote, except it expands a sequence and splice the contents of the sequence into the enclosing syntax-quoted data structure.

# Threading Macros

Threading Macros are macros that helps you to write nested forms in a cleaner and more readable way. Despite it's name, threading macros are nothing to do with threads in the parallel computing.

## ->

`->` is called thread-first macro. It's *first* because it's passing down the evaluation of former forms to the first argument of preceding forms.

```clojure
user> (conj (conj (conj [] 1) 2) 3)
[1 2 3]
```

Suppose if you want to start from an empty vector and adding numbers to the vector one by one. Here is nested version of the code.

<br>

As you add more numbers, the nesting gets deeper and makes your code harder to read. The thread-first macro solves this nesting problem.


```clojure
user> (-> []
          (conj 1)
          (conj 2)
          (conj 3))
[1 2 3]
```

Here is the same code with thread-first macro.

The first argument is the initial value that you want to start from. After the first argument is evaluated, it is then passed to the first argument of `(conj 1)`. This is equivalent to `(conj [] 1)`. The evaluated value is then passed to to the first argument of `(conj 2)`. This is equivalent to `(conj [1] 2)`. Finally, we are evaluating `(conj [1 2] 3)` which returns `[1 2 3]`.

## ->>

`->>` is called thread-last macro. It's *last* because it's passing down the evaluation of former forms to the last argument of preceding forms.

`map` is an example of such function that takes a collection in the last argument and apply the function in the first argument.

```clojure
user> (->> ["Japan" "China" "Korea"]
           (map clojure.string/upper-case)
           (map #(str "Hello " %)))
("Hello JAPAN!" "Hello CHINA!" "Hello KOREA!")
```

This code converts country names to upper case and say hello to the countries. The vector of country names are passed to the last argument of the first map which is equivalent to `(map clojure.string/upper-case ["japan" "china" "korea"])`. Then it's passed to the second map which is equivalent to `(map #(str "Hello " %) ["JAPAN" "CHINA" "KOREA"])`.

Remember that `#()` is another way to write a anonymous function.

# Delays

## Delay

When you want to defer the evaluation of an expression, use `delay`.

```clojure
user> (def later (do [] (prn "Adding") (+ 1 2)))
"Adding"
#'user/later


user> (def later (delay (do [] (prn "Adding") (+ 1 2))))
#'user/later
```

<br>


This is the example of immediately evaluating an expression. Nothing special is involved  here. `(do ...)` is executed immediately and it's return value is bound to `later` var.

<br>

When you use `delay`, the expression is not evaluated immediately, so "Adding" is not printed.

## Force

```clojure
user> (def later (delay (do [] (prn "Adding") (+ 1 2))))
#'user/later

user> (force later)
"Adding"
3
```

<br>
<br>
<br>
<br>


To evaluate and obtain the result of a delayed expression, use `force`.

```clojure
user> (def later (fn [] (prn "Adding") (+ 1 2) ))

user> (later)
"Adding"
3
```

<br>
<br>
<br>


You can achieve the same thing by using an anonymous function and `def`. Then, why do we get bothered with delay?

```clojure
user> (def later (delay (do [] (prn "Adding") (+ 1 2))))
#'user/later

user> (force later)
"Adding"
3

user> (force later)
3
```
<br>
<br>
<br>
<br>


The difference from a plain function is that delay is only evaluated once and caches the result. "Adding" is only printed once because delay returns cached result from the second time.


# Futures

## Future

```clojure
user=> (do
         (Thread/sleep 3000)
         (println "hello"))

;; Wait for 3 sec and then "hello" is printed
hello
nil
```

<br>
"hello" is printed after sleeping 3 seconds. This is very obvious because these lines of the code are executed synchronously.

```clojure
user=> (do
          (future
          (Thread/sleep 3000)
          (println "after sleep"))
          (println "hello"))
hello
nil
after sleep
```

<br>
<br>
<br>
<br>
<br>
<br>

If you use `future`, `(println "hello")` is evaluated immediately, and after three seconds, `(println "after sleep")` will be evaluated.
This is because Clojure puts the expression grouped by `future` into another thread and moves the current thread forward.

<br>
<br>

Calls inside future still blocks. So, in this case, "after sleep" is printed after 3 secs.

## Deref

```clojure
user> (let [future-val (future (inc 1))]
         (println future-val))
#<core$future_call$reify__6320@142cbba: 2>
nil


user> (let [future-val (future (inc 1))]
         (println (deref future-val)))
2
nil
```

<br>

`future` can return values.

See the returned value `#<core$future_call$reify__6320@142cbba: 2>` which is not what you want. This returned value is the current state of the future, not the returned value of `(inc 1)`

<br>

To obtain the returned value of `(inc 1)`, you need to dereference the future with `deref`.

```clojure
user>  (let [future-val (future (inc 1))]
         (println @future-val))
2
nil
```

<br>
<br>
<br>
<br>

You can also use `@` to dereference a future.

```clojure
user> @(future (Thread/sleep 3000) "returned!")
;; Waiting three seconds...
"returned!"
```

<br>
<br>
<br>
<br>

When you dereference a future, you will block until the result is returned.

```clojure
user>  (deref (future (Thread/sleep 1000) "I made it!") 2000 "Can't wait anymore!")
"I made it!"

user>  (deref (future (Thread/sleep 3000) "I made it!") 2000 "Can't wait anymore!")
"Can't wait anymore!"
```

<br>
<br>
<br>

You can tell `deref` how long you want to wait along with a value to return if it does time out.


```clojure
user> (let [sleep-and-wait
         (map (fn [time]
           (future
             (Thread/sleep time)
             (println (str "slept " time " sec" ))))
               [1000 2000])]
     (doall (map deref sleep-and-wait))
     (println "done"))
slept 1000 sec
slept 2000 sec
done
```

<br>
<br>
<br>
<br>
<br>
<br>

Finally, you can do a useful thing by combining `future` and `deref`. You can run multiple time consuming tasks in different threads and block until they finish.

## Realized?

```clojure
user> (def my-future (future (Thread/sleep 5000) ))

user> (repeatedly 6
        (fn []
        (println (realized? my-future))
        (Thread/sleep 1000)))

#'user/my-futurefalse
false
false
false
false
true
```

<br>
<br>
<br>


To know if a future is already done, use `realized?`.

<br>
<br>
<br>

`realized` returns true after 5 seconds.

# Promises
## Promise

When you want to defer the evaluation of expressions until you obtain values to pass to them, use `promise`. The easiest example why you want to use promise is implementing a callback.


```clojure
user> (def my-promise (promise))
#'user/my-promise

user> (def listen-and-callback (fn []
  (println "Start listening...")
  (future (println "Callback fired: " @my-promise))))
#'user/listen-and-callback

user> (defn do-time-consuming-job []
  (Thread/sleep 5000)
  (deliver my-promise "delivered value"))
#'user/do-time-consuming-job

user> (listen-and-callback) (do-time-consuming-job)
Start listening...
Callback fired:  delivered value
```

<br>

First, you make a promise with `promise`.

<br>
Creating a listener that listens to the promise and fire the callback when a value is delivered to the promise. Just like future, promise will block when you dereference it.

<br>
<br>
Defining a job that takes 5 seconds to finish.

<br>
<br>
<br>
Now let's start the listener and wait for the time consuming job. After being blocked by the dereference of `@my-promise` for 5 seconds, you will see the callback is fired.

# Atoms
## Atom

You've might hear this statement before: *there is no state in Clojure. Thus, the language is impractical and cannot be used to build real applications.* However, this is not true. Clojure has built-in mechanisms to manage application state. `Atom` is one of the mechanisms.

```clojure
user> (def atom-str (atom "hello"))
#'user/atom-str
user> (def atom-vector (atom [1 2 3]))
#'user/atom-vector
user> (def atom-map (atom {:a "aaa" :b "bbb"}))
#'user/atom-map
user> (def atom-int (atom 53))
#'user/atom-int
```

<br>

Use `atom` to create an atom that points to a value. You can create an atom of any values.

```clojure
user> (deref atom-int)
53

user> @atom-int
53
```
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

To obtain the value of an atom, use `deref` or `@`.

## Reset!

```clojure
user> (def atom-int (atom 53))
#'user/atom-int

user> (reset! atom-int 35)
35

user> @atom-int
35
```

<br>

You can set the value of an atom with `reset!`. It is used when you are setting the value without regard for the
current value, normally the first time you create the atom.

```clojure
user> (reset! atom-int 100)
100

user> @atom-int
100

user> (reset! atom-int 200)
200

user> @atom-int
200
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

Atoms are mutable, so you can update as many times as you want.

## Swap!

`swap!` allows you to use a function to update the value of an atom.

```clojure
user> (def atom-int (atom 0))
#'user/atom-int

user> (swap! atom-int
        (fn [current-atom]
            (inc current-atom)))
1

user> (swap! atom-int
        (fn [_]
            "not int"))
"not int"

user> @atom-int
"not int"
```

<br>
<br>
<br>


The function that you pass to `swap!` will take an argument which is the current atom.

<br>
<br>
<br>


The atom is updated by the return value of the function.

```clojure
user> (def atom-int (atom 100))
#'user/atom-int

user> (defn multiple-by
        [current-atom num]
        (* current-atom num))

user> (swap! atom-int multiple-by 10)
1000
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>

You can pass a function that takes multiple arguments. The first argument of the function is the current atom.

## Thread Safety

Atoms are very similar to mutable variables in other programming languages. You can assign value to an atom and update anytime you want. However, Clojure's atom has one big advantage over them: it's `thread safe`.

```clojure
user> (def x 0)
#'user/x

user> (repeatedly 10
        (fn [] (def x (inc x))))
(#'user/x...

user> x
10
```

<br>

This will update `x` ten times and increment `x` by 1 every time. The final value of `x` will be 10.

```clojure
user> (def x 0)
#'user/x

user> (repeatedly 10
        (fn [] (future (def x (inc x)))))
(#<core$future_call$reify__6320@410e4786: :pending> #<core$futur...

user> x
5
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


Similarly, this will update `x` ten times and increment `x` every time like the previous example. However, with this code, `(def x (inc x))` will be executed in parallel on different threads because we are using `future`. When you do this, the final value of `x` will not be deterministic anymore. Sometimes it is 5, and sometimes 9 because each thread access and update the same `x` in its own timing.

```clojure
user> (def x (atom 0))
#'user/x

user> (repeatedly 10
        (fn [] (future (swap! x inc))))
(#<core$future_call$reify__6320@632796c6: :pending>...

user> @x
10
```

<br>
<br>
<br>
<br>
<br>


Now atom comes to rescue. `x` is atom and we use `swap!` to update the value. Unlike vars, atom is thread safe, so `x` will be updated by one thread at one time. Thus, the final value of `x` is guaranteed to be 10. This is archived thanks to the Clojure's use of [compare-and-swap](http://en.wikipedia.org/wiki/Compare-and-swap) in atom.

# Refs
## Ref

While `Atom` is handy to manage a state in a consistent way, `Ref` allows you to manage multiple states while ensuring they are consistent.

```clojure
user> (def my-ref (ref 0))
#'user/my-ref
```

<br>

To create a ref, use `ref`.

```clojure
user> (deref my-ref)
0

user> @my-ref
0
```

<br>
<br>

To obtain the value of a ref, use `deref` or `@`.

## Do-sync

```clojure
user> (deref my-ref)
0

user> @my-ref
0

user> (dosync
       (ref-set my-ref 1)
       (ref-set my-ref 2))
2

user> @my-ref
2
```

<br>
<br>
<br>
<br>
<br>
<br>



The update of refs must be done inside `dosync` block. `dosync` is telling Clojure where the transaction update starts from. To set a ref to a new value, use `ref-set`.

```clojure
user> (ref-set my-ref 3)
IllegalStateException No transaction running  clojure.lang.LockingTransaction.getEx (LockingTransaction.java:208)
```

<br>
<br>
<br>
<br>
<br>
<br>

Any updates to refs **always** has to be done inside `dosync` in order to make transactional updates. Otherwise, Clojure complains with `No transaction running` exception.

## Alter

`alter` allows you to use a function to update the value of a ref.

```clojure
user> (def my-ref (ref 0))
#'user/my-ref

user> (dosync
        (alter my-ref
        (fn [current_ref]
            (inc current_ref))))
1

user> @my-ref
1

user> (dosync
        (alter my-ref
          (fn [_] "not int")))
"not int"

user> @my-ref
"not int"
```

<br>
<br>
<br>


The function that you pass to `alter` will take an argument which is the current ref.

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

The ref is updated by the return value of the function.

```clojure
user> (def my-ref (ref 100))
#'user/atom-int

user> (defn multiple-by
        [current-ref num]
        (* current-ref num))

user> (dosync
        (alter my-ref multiple-by 10))
1000
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>

You can pass a function that takes multiple arguments. The first argument of the function is the current atom.


## Transaction

This piece of code demonstrates how transaction works.

```clojure
user> (def user (ref {}))
#'user/user

user> (dosync
 (alter user merge {:name "Kim"})
 (throw (Exception. "something wrong happens!"))
 (alter user merge {:age 32}))
Exception something wrong happens!  user/eval2997/fn--2998 (NO_SOURCE_FILE:2)

user> @user
{}
```

<br>

Suppose we are trying to create an user record in database. Each `alter` tries to update user-record ref with user info and you want the ref to be updated only when both `alter` succeed.

<br>

But, let's assume something wrong occurs between the first and the second alter.

<br>
<br>

As you see, the user-record ref is still empty. This is because `alter` inside `dosync` doesn't update the ref until getting out of `dosync` block successfully.


```clojure
user> (def user-record (atom {}))
#'user/user-record

user> (do
 (swap! user-record merge {:name "Kim"})
 (throw (Exception. "something wrong happens!"))
 (swap! user-record merge {:age 32}))
Exception something wrong happens!  user/eval3024 (NO_SOURCE_FILE:3)

user> @user-record
{:name "Kim"}
```

<br>

This is the atom version that doesn't work. As you see, user-record atom is half updated when there is the exception.

```clojure




user> (def my-ref (ref 0))
#'user/my-ref

user> (future
        (dosync
          (alter my-ref inc)
          (Thread/sleep 5000)))
 #<core$future_call$reify__6320@6ef7be6a: :pending>

user> (println @my-ref)
0

;; Wait 5 seconds
user> (println @my-ref)
1
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


The other way to see how transaction works is trying to observe the value of ref outside dosync block.

<br>
<br>
<br>

We use future to run the whole transaction in the separate thread and wait two seconds before exiting the dosync block.

<br>
<br>
<br>

The value of the ref is still 0 at this moment because the update to the ref is still not committed.

# Many Thanks
[Clojure from the ground up](https://aphyr.com/tags/Clojure-from-the-ground-up)

[CLOJURE for the BRAVE and TRUE](http://www.braveclojure.com/)

[Clojure Cheatsheet](http://clojure.org/cheatsheet)


And many other great articles and pages made by the Clojure community.
