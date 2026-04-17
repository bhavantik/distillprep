# Python Interview MCQs - Easy Level (Tricky Basics)

These questions cover Python's fundamental mechanics. While "Easy" by interview standards, they test if you understand common traps and beginner pitfalls rather than just textbook syntax.

---

### Q1. Default Mutable Arguments
**Question:** What will be the output of the following code?
```python
def append_to_list(val, my_list=[]):
    my_list.append(val)
    return my_list

list1 = append_to_list(1)
list2 = append_to_list(2, [])
list3 = append_to_list(3)

print(list1, list2, list3)
```

**Options:**
A) `[1] [2] [3]`
B) `[1] [2] [1, 3]`
C) `[1, 3] [2] [1, 3]`
D) `[1, 2, 3] [2] [1, 2, 3]`

**Correct Answer:** **C) `[1, 3] [2] [1, 3]`**

**Detailed Explanation:**
In Python, default arguments are evaluated *only once* at function definition time, not every time the function is called. The exact same list object is used across all calls that do not explicitly provide a list. 
- `list1` appends `1` to the default list.
- `list2` provides a *new* empty list, so it appends `2` to that new list. Default list is unaffected.
- `list3` uses the default list again. It appends `3` to it. The default list is now `[1, 3]`.
Since `list1` and `list3` both point to the *exact same* default list object, printing them both yields `[1, 3]`.

---

### Q2. Identity vs. Equality (String/Integer Interning)
**Question:** What will be the output of the following code?
```python
a = 256
b = 256
x = 257
y = 257

print(a is b, x is y)
```
*(Assume this runs line-by-line in an interactive Python REPL)*

**Options:**
A) `True True`
B) `True False`
C) `False True`
D) `False False`

**Correct Answer:** **B) `True False`**

**Detailed Explanation:**
The `is` operator checks for object identity (whether they reference the same memory address), whereas `==` checks for value equality. Python implementations (specifically CPython) pre-allocate a global array of small integer objects in the range $[-5, 256]$ to save memory and improve performance. This is called *integer interning*.
Since `256` falls in this range, `a` and `b` reference the exact same cached object. `257` falls outside this range, so `x` and `y` reference two uniquely created objects with the same value, making `x is y` evaluate to `False`. *(Note: If this was run as a single file script, the compiler might optimize both 257s to the same object, but in a standard REPL it's False).*

---

### Q3. Tuple Immutability Nuance
**Question:** Consider the following snippet. What happens when it is executed?
```python
my_tuple = (1, 2, [3, 4])
my_tuple[2].append(5)
print(my_tuple)
```

**Options:**
A) `TypeError: 'tuple' object does not support item assignment`
B) `(1, 2, [3, 4, 5])`
C) `(1, 2, [3, 4])`
D) `SyntaxError`

**Correct Answer:** **B) `(1, 2, [3, 4, 5])`**

**Detailed Explanation:**
A common misconception is that tuples make everything strictly immutable. Tuples only guarantee the *references* they hold cannot change. `my_tuple` holds an integer, an integer, and a reference to a list. While you cannot assign a new object to `my_tuple[2]`, the list *itself* is perfectly mutable. Appending to it modifies the list object in place, which does not violate the tuple's immutability invariant.

---

### Q4. Augmenting Assignment on Tuples (`+=` Trap)
**Question:** What will happen here?
```python
x = (1, 2, [3, 4])
x[2] += [5, 6]
```

**Options:**
A) Output is `(1, 2, [3, 4, 5, 6])`
B) `TypeError` is raised and the list remains `[3, 4]`
C) `TypeError` is raised but the list becomes `[3, 4, 5, 6]`
D) Silent failure, list remains `[3, 4]`

**Correct Answer:** **C) `TypeError` is raised but the list becomes `[3, 4, 5, 6]`**

**Detailed Explanation:**
This is one of Python's most notorious edge cases. `x[2] += [5, 6]` roughly translates to `x[2] = x[2].__iadd__([5, 6])`. 
1. The `__iadd__` (in-place add) method runs on the list, which successfully extends it to `[3, 4, 5, 6]`.
2. Python then tries to *reassign* that modified list back to `x[2]`.
3. Because `x` is a tuple, reassignment throws a `TypeError: 'tuple' object does not support item assignment`.
So the exception is definitely raised, but the underlying list was already mutated!

---

### Q5. Local vs. Global Scope Pitfall
**Question:** What will the following code output?
```python
count = 5

def increment():
    print(count)
    count += 1

increment()
```

**Options:**
A) `5`
B) `6`
C) `UnboundLocalError: local variable 'count' referenced before assignment`
D) `NameError: name 'count' is not defined`

**Correct Answer:** **C) `UnboundLocalError: local variable 'count' referenced before assignment`**

**Detailed Explanation:**
When Python parses the `increment` function, it sees `count += 1` (an assignment wrapper). Because there is an assignment to `count` anywhere in the function body, Python treats `count` purely as a *local* variable for the entire scope of the function. When the first line `print(count)` executes, it tries to read the *local* variable `count`, which hasn't been instantiated yet, throwing an `UnboundLocalError`. To fix this, you would need to add `global count` at the start of the function.

---

### Q6. Booleans and Collections Evaluation
**Question:** What does this code print?
```python
print(bool([0]), bool((0,)), bool(""), bool(0))
```

**Options:**
A) `False False False False`
B) `True True False False`
C) `True False False False`
D) `True True False True`

**Correct Answer:** **B) `True True False False`**

**Detailed Explanation:**
In Python, objects evaluate to `False` if they are explicitly numeric `0`, empty collections (empty list `[]`, empty tuple `()`, empty string `""`), or `None`/`False`. 
- `[0]` is a list containing one element (the integer 0). Because the list is non-empty, its boolean value is `True`.
- `(0,)` is a tuple containing one element. Non-empty, so `True`.
- `""` is an empty string. `False`.
- `0` is the numeric value zero. `False`.

---

### Q7. The Late-Binding Closure Trap
**Question:** What will evaluate when calling the lambdas?
```python
multipliers = [lambda x: x * i for i in range(3)]
print([m(2) for m in multipliers])
```

**Options:**
A) `[0, 2, 4]`
B) `[4, 4, 4]`
C) `[0, 0, 0]`
D) `NameError`

**Correct Answer:** **B) `[4, 4, 4]`**

**Detailed Explanation:**
This demonstrates "late binding" in closures. The functions created in the list comprehension don't capture the *value* of `i`, they capture the *name/reference* to `i`. By the time you actually call `m(2)` for the lambdas, the `for` loop has finished and the final value of `i` is `2`. All three lambdas look up `i`, find `2`, and do `x * 2`. So `2 * 2` happens three times, yielding `[4, 4, 4]`. (Fix: `lambda x, i=i: x * i`).

---

### Q8. Except Multiple Exceptions
**Question:** What will this snippet output?
```python
try:
    int("a")
except ValueError, TypeError:
    print("Caught an error!")
```

**Options:**
A) `Caught an error!`
B) `ValueError: invalid literal for int() with base 10: 'a'`
C) `SyntaxError: invalid syntax`
D) `TypeError`

**Correct Answer:** **C) `SyntaxError: invalid syntax`** (in Python 3.x)

**Detailed Explanation:**
In Python 3, to catch multiple exceptions, you *must* pass them as a tuple: `except (ValueError, TypeError):`. 
The syntax `except ValueError, e:` was valid in Python 2 for assigning the exception error variable (now `except ValueError as e:` in Python 3). Doing `except ValueError, TypeError:` in Python 3 causes a hard `SyntaxError`. Therefore, the script never even runs.

---

### Q9. Dictionary Keys Mutability
**Question:** Which of the following statements about dictionary keys is true?
```python
d = {}
d[ (1, 2) ] = "A"
d[ frozenset([1, 2]) ] = "B"
d[ [1, 2] ] = "C"
```

**Options:**
A) All assignments succeed.
B) Third assignment throws a `TypeError: unhashable type: 'list'`
C) First and Third assignments throw `TypeError`
D) Second assignment throws `TypeError: unhashable type: 'frozenset'`

**Correct Answer:** **B) Third assignment throws a `TypeError: unhashable type: 'list'`**

**Detailed Explanation:**
Python dictionary keys must be *hashable*. By definition, an object is hashable if its hash value never changes during its lifetime (meaning it requires immutability).
- Tuples `(1, 2)` containing primitive iterables are hashable.
- `frozenset` is an immutable variant of a set, so it is hashable.
- Lists `[1, 2]` are mutable. They do not have a `__hash__` method implementation, making them strictly unhashable. Attempting to use a list as a dictionary key fails instantly.

---

### Q10. Try-Except-Else-Finally Execution Order
**Question:** What string will the function return?
```python
def check_workflow():
    try:
        return "Try"
    finally:
        return "Finally"

print(check_workflow())
```

**Options:**
A) `"Try"`
B) `"Finally"`
C) `("Try", "Finally")`
D) `SyntaxError: cannot have return in both try and finally`

**Correct Answer:** **B) `"Finally"`**

**Detailed Explanation:**
The `finally` block in Python runs *no matter what*—even if a `return`, `break`, or `continue` statement is encountered in the `try`, `except`, or `else` block. 
Here, the `try` block attempts to return `"Try"`. Before it can yield the value to the caller, the interpreter executes the `finally` block. Since the `finally` block *also* contains a `return` statement, it overwrites the active return value, causing the function to output `"Finally"`.
