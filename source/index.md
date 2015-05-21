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

You can bind functions to var just like other values.

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

# Thanks
http://d.hatena.ne.jp/Kazuhira/20120603/1338728578
