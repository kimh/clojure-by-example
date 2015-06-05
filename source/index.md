---
title: Clojure by Example

includes:

search: true
---

# Hello, world!!

```clojure
user=> (println "hello, world")
hello, world
nil
```

<br>

Our first Clojure code is, of course, printing "Hello, world!".

# Variables

## Let

```clojure
user=> (let [object "light"] (println (str "God said let there be " object)))
God said let there be light
nil
```

<br>

To bind (assign) value to variable, use `let`. Let takes a vector which takes a variable in the first element and a value in the second element.

```clojure
user=> (println object)

CompilerException java.lang.RuntimeException: Unable to resolve symbol: object in this context, compiling:(NO_SOURCE_PATH:1:1)
```

<br>
<br>

You cannot access the variable defined from outside of the let. You can think of this as equivalent to *private variable* in non-functional language.

```clojure
user=> (let [object1 "light"
             object2 "darkness"]

             (println (str "God said let there be " object1))
             (println (str "God also said let there be " object2)))
God said let there be light
God also said let there be darkness
nil
```

<br>
<br>
<br>

You can also provide multiple bindings.

```clojure
user=>  (let [object "light"]
             (let [object "darkness"])
             (println (str "God said let there be " object)))
God said let there be light
nil
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>

The most notable trait of `let` is that its ***immutable***: once you define, you never be able to change. Here, we tried to override object `light` with `darkness`, but we fail to do so.

## Def (Var)

```clojure
user=> (def object "light")
#'user/object

user=> (println (str "God said let there be " object))
God said let there be light
nil
```

<br>

You can also bind values to variable with `def`. In Clojure, we say `def` binds "light" to "object" which is something called `Var`.

```clojure
user=> (def object "darkness")
#'user/object

user=> (println (str "God said let there be " object))
God said let there be darkness
nil
```

Unlike `let`, you can access var outside `def`.

<br>
<br>
<br>

`Var` is ***mutable***, so we can redefine later. You should avoid doing this whenever possible, but sometimes useful in real programming.

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

The first argument is the name of function `say-hello`, the second argument is the argument of the function `[name]`, and the third arugment is the function body ` (println (str "Hello, " name)))`.

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
user=> (meta #'say-hello)
{:added "1.0", :ns #<Namespace user>, :name say-hello, :file "NO_SOURCE_PATH", :static true, :column 1, :line 1, :arglists ([name]), :doc "Takes name argument and say hello to the name"}
```

<br>
<br>
<br>
<br>
<br>
<br>


You can expand the metadata with `meta`. `#'` is reader macro. **TODO: add link to reader macro**

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

user=> (fn [] (+ 1 + 1))
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

`%` will be replaced with arumgnets passed to the function. When the function takes multiple arugments, `%1` is for the first argument, `%2` is for the second and so on.

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


You can also pass a function to another function. We define two functions and bind to `say-hello` and `say-bye` vars. We also define a generic function and bind to `geeting`.

<br>
<br>
<br>
<br>
<br>

Then we pass `say-hello` and `say-bye` to `greeting`.

## Closure

When a function (let's call this *inner* function) is returned from another function (let's call this *outer* function), and the inner function does somethings with the arguments given from outer function, then the inner function is called `closure`.

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
user=> (if-let [pos-nums (filter pos? [ -1 -2 1 2])]
  pos-nums
  "no positive numbers")
(1 2)
```

<br>

After testing condition, you often want to reuse it later. `if-let` binds the evaluated condition to var when it's truthy. The result of `filter` will be binded to `pos-nums`.

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

There is also `case` which works pretty much similar to that of other programming languages. `case` compares the value with each condition with `=`
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
The expression in the last branch will be evaluated if none of other branch is matched.

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
You use `:else` symbol for default case.

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

You can use predicate with `condp` for condition, in this case `contains?`.


<br>
<br>
<br>
<br>

`(contains? [1 2 3] 2)` will be evaluated in this case.

<br>
<br>

`(contains? [1 2 3] 5)` will be evaluated falsey, thus default branch will be evaluated.

# Booleans

```clojure
user=> true
true

user=> false
false
```

<br>

`true` and `false` are values of *Boolean* type just like in other programming languages.

# Strings

## Literals

```clojure
user=> "Hi, there!"
"Hi, there!"G
```

</br>

You can create a string by double-quoting text.

## Concatenation

```clojure
user=> (str "Good " "morning")
"Good morning"
```

<br>

One way to concatenate strings is using `str`.

```
user=> (use '[clojure.string :only [join]])
nil

user=> (join "" ["Good " "morning"])
"Good morning"
```

</br>
</br>

You can also use `clojure.string/join`.

```clojure
user=> (+ "Good " "morning")

ClassCastException java.lang.String cannot be cast to java.lang.Number  clojure.lang.Numbers.add (Numbers.java:126)
```

</br>
</br>
</br>
</br>
</br>

`+` operator *doesn't* work to concat strings against your expectation.

## Interpolation

Clojure doesn't have string interpolation. So, you need to use [concatenation functions](#concatenation).

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

## Literal

```clojure
user=> `(1 2 3)
(1 2 3)
```

<br>

Lists are simple collection of values. You can create a list by grouping values with paren with **`** at the top. We need ``` ` ``` because list will be evaluated without it.

## Get element

```clojure
user=> (nth `(1 2 3) 1)
2
```

<br>

To get a value from list, use `nth` with index number. Index starts from 0

## Count

```clojure
user=> (count `(1 2 3) )
3
```

<br>

To count how many values in the list, use `count`.

## Add element

```clojure
user=> (conj `(1 2 3) 4)
(4 1 2 3)
```

<br>

To add a value to the list, use `conj` (conj[oin]). Note that the new value is added to the top.

## Remove element

How to remove a value from a list? You can't really remove a value from list in Clojure. That's not what list is supposed to do.
If you are writing a program that needs to remove from collection, you should use other type of collection such as `Set`.

# Vectors

You can think of `Vector` as efficient version of `List`. It's more practical data storage of multiple values than `List`.

## Literal

```clojure
user=> [1 2 3]
[1 2 3]
```

<br>

You can create a vector by grouping values with square brackets. Unlike list, you don't need ``` ` ``` because vector will not be evaluated unlike list.

## Get element

```clojure
user=> (nth [1 2 3] 1)
2
```
<br>
To get a value from vector, you need to specify the index of the value.

```clojure
user=> (first [1 2 3])
1

user=> (last [1 2 3])
3
```

<br>
<br>

`Vetor` has convenient functions to access elements. To get first and second element, use `first` and `second`.

## Add element

```clojure
user=> (conj [1 2 3] 4)
[1 2 3 4]
```

<br>

To add a value, use `conj` (conj[oin]). **Note that the new value is added to the bottom.**

## Get index

```clojure
user=>  (.indexOf [1 2 3] 2)
1
```

<br>

You can get the index of a value in vector with `.indexOf`.

```clojure
user=>  (.indexOf [1 2 3] 4)
-1
```

<br>
<br>

Returns `-1` if the value doesn't exist.


# Sets

`Sets` are unordered collection of values, meaning that the order of values are not guaranteed.

## Literal

```clojure
user=> #{1 2 3}
#{1 3 2}
```

<br>

You can create a set by grouping values with `#{}`. I get the order of 1 -> 3 -> 2 on my computer but you may get different order since the order is not guaranteed

## Get element

```clojure
user=> (sort (conj #{1 2 3} 4))
(1 2 3 4)
```

<br>

To get sorted order, use `sort`.

## Add element

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

One important trait of set is that **it does not contain an element more than once.**

## Remove element

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

If `disj` value that the set doesn't contain, it returns the original set.

## Select elements

```clojure
user=> (clojure.set/select odd? #{1 2 3} )
#{1 3}
```

<br>

To select certain values from a set, use `select`. `odd?` returns boolean for each element. This example returns a new set which only contains odd numbers.

## Check if element exists

```clojure
user=> (contains? #{1 2 3} 1)
true

user=> (contains? #{1 2 3} 4)
false
```

<br>

To check if a value is contained in a set, use `contains?`.

## Check if a set is part of other set

```clojure
user=>  (clojure.set/subset? #{1 2} #{1 2 3 4})
true

user=>  (clojure.set/subset? #{1 5} #{1 2 3 4})
false
```

<br>

To check if a set is part of another set, use `subset?`.

## Check if a set includes other set

```clojure
user=>  (clojure.set/superset? #{1 2 3} #{1 2})
true
```

<br>

To check if a set includes another set, use `superset?`.

# Maps

`Maps` are key-value data structure to store multiple values.

## Literal

```clojure
user=> {"Apple" "Mac" "Microsoft" "Windows"}
{"Apple" "Mac" "Microsoft" "Windows"}
```

<br>

You can create a map by grouping values with `{}`.


## Get element

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
## Add element

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

If key already exists, it replace the value.

## Combine maps

```clojure
user=> (merge {"Apple", "Mac" "Microsoft" "Windows"} {1 2})
{1 2, "Apple" "Mac", "Microsoft" "Windows"}
```

<br>

To combine two maps, use `merge`.

## Keys

```clojure
(keys {"Apple", "Mac" "Microsoft" "Windows"})
```

<br>

To get all keys from a map, use `keys`.

## Vals

```clojure
(keys {"Apple", "Mac" "Microsoft" "Windows"})
```

<br>

To get all values from a map, use `vals`.

# Sequences

`Secuqnces` are logical lists that are not tied to a particular implementation. What does it mean? It means that you can apply the same functions to any types of collections without worrying about what types of collections that you are dealing with.

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

Using map for `Vectors`.

<br>

Using map for `Lists`.

<br>

Using map for `Sets`.

<br>

Using map for `Maps`. We are using `println` for the function that we apply since `inc` doesn't work here, but this doesn't hurt the idea that you can use `map` for any collections.

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

<br>
<br>
<br>
<br>
<br>
<br>

`Sequences` **are the most important data abstraction in Clojure.**

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

You can get a sequence of infinite integers with `iterate`. Be careful, though. Running this example will freeze your terminal since the computation continues forever.

## Range

```clojure
user=> (range 5 10)
(5 6 7 8 9)
```

<br>

To generates a sequence of numbers between two points, you can use `range`.

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


**Note:** In Clojure 1.1+, lazy sequences returns chunked values rather than one by one as mentioned above, but that's not you have to worry about reading this guide.

# Macros

Clojure's Macros gives you the power to restructure your Clojure code as you like. For example, you can create your own code syntax, invent new control flow, new types of values, etc.
So, it's not even impossible to create a programming language that looks like Ruby by using Clojure Macros!

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

# Delays

## Delay

When you want to defer the evaluation of an expression, you can use `delay`.

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


You may think that you can archive the same thing by using an anonymous function and `def`. Then, why do we get bothered with delay?

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
user> (def listener (fn []
  (println "Start listening...")
  (future (println "Callback fired: " @my-promise))))
  ;; Start listening
  (listener)
  ;; Suppose doing things that takes time
  (Thread/sleep 2000)
  
  (deliver my-promise "delivered value")


Start listening...
;; Waiting two seconds here...
Callback fired:  delivered value
```

<br>

First, you make a promise with `promise`.

<br>
Creating a listener that listens to the promise and fire the callback when a value is delivered to the promise.

<br>
Just like future, promise will block when you dereference it. Calling `(listener)` will block at the dereference of `@my-promise`.

<br>
You can signal the promise to return delivered values with `deliver`.

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

You can update the value of an atom with `reset!`.

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


The function that you pass to `alter` will take an argument which is the current atom.

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

Suppose we are trying to create an user record in database. Each `alter` tries to update user-recrod ref with user info and you want the ref to be updated only when both `alter` succeed.

<br>

But, let's assume something wrong occurs between the first and the second alter.

<br>
<br>

As you see, the user-record ref is still empty. This is because `alter` inside `dosync` doesn't update the ref until getting out of `dosycn` block successfully.


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

# Thanks
http://d.hatena.ne.jp/Kazuhira/20120603/1338728578
http://www.braveclojure.com/writing-macros/

