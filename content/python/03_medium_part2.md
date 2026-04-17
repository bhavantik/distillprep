# Python Interview MCQs - Medium Level (Part 2)

These 25 questions delve into generators, context managers, scoping rules, and nuances regarding Python's standard implementations (Python 3 specific defaults).

---

### Q36. Exception Variable Scope Leak
**Question:** What does this Python 3 code print?
```python
try:
    raise ValueError("Error!")
except ValueError as e:
    pass

print(e)
```
A) `Error!`
B) `ValueError("Error!")`
C) `None`
D) `NameError: name 'e' is not defined`

**Correct Answer:** **D) `NameError: name 'e' is not defined`**
**Explanation:** In Python 3, when an exception is handled using `as target`, the target is deleted at the end of the `except` block. This prevents circular reference garbage collection issues with exception tracebacks. To use the error outside the block, assign it to a different variable.

---

### Q37. Context Manager Exception Swallowing
**Question:** How does a Context Manager (`__enter__` / `__exit__`) suppress an exception raised inside the `with` block?
A) By wrapping the `yield` statement in a try/except.
B) By returning `True` from the `__exit__` method.
C) By returning `False` from the `__exit__` method.
D) Context managers cannot swallow exceptions.

**Correct Answer:** **B) By returning `True` from the `__exit__` method.**
**Explanation:** When an exception occurs in a `with` block, Python calls `__exit__(exc_type, exc_val, traceback)`. If `__exit__` returns a truthy value, Python considers the exception gracefully handled and does not propagate it. If it returns falsy (the default if no explicit return), the exception propagates.

---

### Q38. The Generator `.send()` Method
**Question:** What happens when you first initialize a generator and immediately call `gen.send(10)`?
A) Yields `10`.
B) Raises `TypeError: can't send non-None value to a just-started generator`.
C) `10` is buffered for the first yield.
D) SyntaxError.

**Correct Answer:** **B) Raises `TypeError: can't send non-None value to a just-started generator`.**
**Explanation:** A generator must execute up to its first `yield` expression before it can receive a value. To "prime" a generator, you must first call `next(gen)` or `gen.send(None)`. Sending a non-None value before priming causes a `TypeError`.

---

### Q39. `nonlocal` vs `global`
**Question:** What is the output of the following function call?
```python
x = 0
def outer():
    x = 1
    def inner():
        nonlocal x
        x = 2
    inner()
    return x

print(outer(), x)
```
A) `2 2`
B) `2 0`
C) `1 2`
D) `1 0`

**Correct Answer:** **B) `2 0`**
**Explanation:** The `nonlocal` keyword specifically binds to the nearest enclosing variable scope excluding globals. `inner()` mutates the `x = 1` from `outer()`, changing it to `2`. The global `x = 0` remains entirely unaffected.

---

### Q40. Name Mangling in Python
**Question:** Why does Python dynamically mangle class attributes starting with dual underscores (e.g., `__hidden`)?
A) To enforce strict private access security policies.
B) To prevent accidental name collisions in subclasses.
C) To interface with C extension modules.
D) To hide methods from `dir()`.

**Correct Answer:** **B) To prevent accidental name collisions in subclasses.**
**Explanation:** Python does not have strict access modifiers mapping (no true `private`). Name mangling (renaming `__var` to `_ClassName__var`) guarantees that if a subclass uses the exact same variable name `__var`, it won't accidentally overwrite the parent class's attribute.

---

### Q41. Comparing Unorderable Types
**Question:** What happens in Python 3 when running `"A" > 0`?
A) Evaluates to `True` (Lexicographical ordering compares the memory address).
B) Evaluates to `False`.
C) Raises `TypeError`.
D) Compares ASCII value to integer value (`65 > 0`).

**Correct Answer:** **C) Raises `TypeError`.**
**Explanation:** In Python 2, `"A" > 0` evaluated based on object type names (str > int), returning True, which caused notoriously hidden bugs. Python 3 fixes this by enforcing strong typing on ordinals, raising a `TypeError: '>' not supported between instances of 'str' and 'int'`.

---

### Q42. Dictionary Views vs Lists
**Question:** In Python 3, what is the core behavioral difference of `dict.keys()` compared to Python 2?
A) It returns a generator.
B) It returns a dynamic View reflecting dictionary changes in real-time.
C) It returns an immutable Tuple.
D) It is an async generator.

**Correct Answer:** **B) It returns a dynamic View reflecting dictionary changes in real-time.**
**Explanation:** `dict.keys()`, `dict.values()`, and `dict.items()` in Py3 return *Views*. If the dictionary is modified, the View immediately shows the updated payload. A view acts somewhat like a set but consumes zero extra memory compared to copying keys into a list.

---

### Q43. Default Arguments Evaluation Context
**Question:** Which scope handles the default argument evaluation for `def f(x=math.pi):` ?
A) The scope where the function is called.
B) The global module scope containing the function definition.
C) A temporary isolated namespace.
D) The local function scope just prior to instantiation.

**Correct Answer:** **B) The global module scope containing the function definition.**
**Explanation:** Default args are evaluated immediately exactly where the `def` statement executes. Variables used in default argument definitions are pulled directly from the enclosing scope *at that specific runtime moment*.

---

### Q44. The Multiple Inheritance Diamond with `super()`
**Question:** Consider `class D(B, C)`. Inside `B.__init__`, a call to `super().__init__()` directs to which class next?
A) It calls `D.__init__`.
B) It calls the common grandparent `A.__init__`.
C) It calls `C.__init__`.
D) It throws a RecursionError.

**Correct Answer:** **C) It calls `C.__init__`.**
**Explanation:** In Python, `super()` does NOT mean "parent". It means "the next class in the Method Resolution Order (MRO)". The MRO of D is `D -> B -> C -> A`. Since we are currently inside `B`, `super()` points to the *next* sibling in line for D's MRO, which is `C`.

---

### Q45. List Element Swap Syntax
**Question:** Which implementation swaps values correctly without utilizing a temporary third variable?
A) `a = b; b = a`
B) `a, b = b, a`
C) `a, b == b, a`
D) `swap(a, b)`

**Correct Answer:** **B) `a, b = b, a`**
**Explanation:** The tuple unpacking logic perfectly evaluates the right-hand side `(b, a)` creating a tuple first in memory, and then simultaneously unpacks those assigned indices to the targets on the left side `a` and `b`. 

---

### Q46. Floor Division on Negative Numbers
**Question:** Evaluate `-7 // 3`.
A) `-2`
B) `-2.333`
C) `-3`
D) `-1`

**Correct Answer:** **C) `-3`**
**Explanation:** The `//` operator performs "floor division", which rounds down towards negative infinity. `-7 / 3` is approximately `-2.33`. Rounding *down* towards negative infinity produces `-3`, whereas `int(-7/3)` yields `-2` (truncation towards zero). 

---

### Q47. Falsyness of Strange Defaults
**Question:** Which of these boolean checks returns `True`?
A) `bool(NotImplemented)`
B) `bool(None)`
C) `bool({})`
D) `bool(range(0))`

**Correct Answer:** **A) `bool(NotImplemented)`**
**Explanation:** `NotImplemented` is a special singleton object returned by dunder magic methods to indicate a type mismatch (forcing Python to try the reverse operation, like `__radd__`). It is inherently dynamically `True`. Contrast it with `NotImplementedError` which is an Exception class. The rest are completely `False`.

---

### Q48. `__new__` vs `__init__`
**Question:** Which statement correctly sums up the difference?
A) `__init__` allocates the memory; `__new__` populates it.
B) `__new__` allocates memory and returns an instance; `__init__` populates the already allocated instance.
C) `__new__` is only accessible inside metaclasses.
D) `__init__` must always return `self`, `__new__` returns nothing.

**Correct Answer:** **B)** `__new__` allocates memory and returns an instance; `__init__` populates the already allocated instance.
**Explanation:** `__new__` is a class method acting as the true constructor, returning the new object. Automatically afterward, Python invokes `__init__` on the freshly minted object to initialize attributes. 

---

### Q49. The `.index()` vs `.find()` String methods
**Question:** What occurs when `substring` is not found in a string `s`?
A) `s.index()` and `s.find()` both return `-1`.
B) `s.find()` returns `-1`, `s.index()` raises a `ValueError`.
C) `s.find()` raises a `ValueError`, `s.index()` returns `-1`.
D) Both return `None`.

**Correct Answer:** **B) `s.find()` returns `-1`, `s.index()` raises a `ValueError`.**
**Explanation:** By design, `.find()` mimics low-level C behaviors returning `-1` if absent. `index()` is designed to fail aggressively by throwing an Exception, avoiding tricky logic bugs where `-1` evaluates accidentally as the last character index.

---

### Q50. Asserts working conditionally
**Question:** What happens to `assert x > 0, "Error!"` when the script is run with `python -O script.py`?
A) The assert statement halts execution on failure immediately.
B) The assert implicitly generates a log message without halting.
C) The assert statement is entirely ignored by the compiler.
D) Raises SyntaxError.

**Correct Answer:** **C) The assert statement is entirely ignored by the compiler.**
**Explanation:** Python's optimized `-O` flag strips out assert statements and `__debug__` blocks before bytecode compilation. Therefore, assertions should *never* contain business logic or assignment code. 

---

### Q51. Floating Point Inexactness
**Question:** `print(0.1 + 0.2 == 0.3)`
A) `True`
B) `False`
C) `SyntaxError`
D) `TypeError`

**Correct Answer:** **B) `False`**
**Explanation:** Standard `float` in Python enforces IEEE-754 binary floating-point specifications. `0.1` and `0.2` cannot be perfectly represented in base-2 fractions. `0.1 + 0.2` yields `0.30000000000000004`. To perform exact decimal arithmetic, rely on the `decimal` module.

---

### Q52. Nested Decorators Parameter Scope
**Question:** If you want a decorator that takes arguments `@my_dec(5)`, how many functional layers are required?
A) 1
B) 2
C) 3
D) 4

**Correct Answer:** **C) 3**
**Explanation:** 
1. The first outermost layer takes the argument `5`. It executes and returns the actual decorator.
2. The middle layer takes the `func` wrapper object to be decorated.
3. The innermost layer takes the `*args, **kwargs` applied iteratively on the target function invocation.

---

### Q53. List slicing vs Assigning to Slices
**Question:** What does `a` evaluate to?
```python
a = [1, 2, 3]
a[1:2] = [4, 5, 6]
```
A) `[1, [4, 5, 6], 3]`
B) `[1, 4, 5, 6, 3]`
C) `[1, 5, 6, 3]`
D) `TypeError`

**Correct Answer:** **B) `[1, 4, 5, 6, 3]`**
**Explanation:** Python permits slice assignment to iteratively displace list elements seamlessly. The slice `a[1:2]` precisely targets `2`. It cuts `2` out and drops `4, 5, 6` into that position. It resizes the list perfectly.

---

### Q54. Overloading Equality operator with Identity?
**Question:** You overload `__eq__(self, other)` in your class to always return True. Does `obj is obj2` also evaluate to True now?
A) Yes, because equality propagates backward.
B) No, the `is` check is un-overridable logic built into CPython's memory address manager.
C) Only if memory allocations precisely match.
D) Raises AttributeError on `is`.

**Correct Answer:** **B) No, the `is` check is un-overridable logic built into CPython's memory address manager.**
**Explanation:** `==` maps to the `__eq__` dunder method which you can redefine. `is` rigidly checks `id(a) == id(b)` internally. You can practically never hijack or override `is` behavior in Python.

---

### Q55. Iterables vs Iterators
**Question:** Which dunder methods definitively confirm an object is a pure Iterator?
A) `__iter__` only.
B) `__next__` only.
C) Both `__iter__` and `__next__` defined.
D) Inheriting from `abc.Iterator`.

**Correct Answer:** **C) Both `__iter__` and `__next__` defined.**
**Explanation:** An Iterable allows `__iter__()` to generate an iterator. An Iterator *itself* must implement primarily `__next__()` to drive iterative steps and `__iter__()` (which usually just returns `self` recursively to be utilized seamlessly in For-loops).

---

### Q56. Tuple sorting
**Question:** What does `sorted([ (1, 2), (1, -1), (2, 0) ])` output?
A) `[(1, -1), (1, 2), (2, 0)]`
B) `[(2, 0), (1, 2), (1, -1)]`
C) `[(1, 2), (1, -1), (2, 0)]`
D) Error, tuples cannot be sorted.

**Correct Answer:** **A) `[(1, -1), (1, 2), (2, 0)]`**
**Explanation:** Tuples sequentially sort element-by-element starting comprehensively from index 0. `1` perfectly ties the first two elements. Python seamlessly falls back to comparing index 1: `-1 < 2`. The third tuple sorts last because `2 > 1`. 

---

### Q57. Dict Comprehension Unpacking Trap
**Question:** Evaluate `**kwargs` inside a comprehension.
```python
d = {'a': 1, 'b': 2}
x = {k: v for k, v in **d}
```
A) Error: SyntaxError.
B) `x = {'a': 1, 'b': 2}`
C) `x = {'a': 'b', 1: 2}`
D) Error: ValueError.

**Correct Answer:** **A) Error: SyntaxError.**
**Explanation:** The dictionary unpacking syntax `**d` is solely permitted natively during function calls or dict literals like `{*d, **d2}`. For iteratively unwrapping in a `for` clause, you must utilize `d.items()`. You simply cannot extract dict sequences natively using `**d` in a logical `for` iteration statement.

---

### Q58. Unpacking and Appending Edge-Case
**Question:**
```python
lst = [1]
lst.append(lst.copy())
```
What is inside `lst`?
A) `[1]`
B) `[[1]]`
C) `[1, [1]]`
D) Infinite Recursion list.

**Correct Answer:** **C) `[1, [1]]`**
**Explanation:** `lst.copy()` is executed *first* creating a fresh shallow copy of `[1]`. Then, `append` executes attaching that entire new separate array structure directly onto the tailend of the original `lst`, making it `[1, [1]]`. It avoids circular referencing infinitely.

---

### Q59. Sets `symmetric_difference_update` Operator
**Question:** Which operator is equivalent to updating `.symmetric_difference()` in place?
A) `^=`
B) `|=`
C) `&=`
D) `-=`

**Correct Answer:** **A) `^=`**
**Explanation:** 
- `|` means Union (`OR`)
- `&` means Intersection (`AND`)
- `-` means Difference (`NOT`)
- `^` mathematically represents XOR mapping exactly to Symmetric Difference (elements situated exclusively in either set but strictly not both). `^=` does this natively in-place.

---

### Q60. The Walrus Operator `:=` functionality mapping
**Question:** What does Python 3.8's assignment expression `:=` effectively change?
A) Enables assigning dynamically evaluated inputs cleanly during structural expressions logic (e.g. `while` loops).
B) Modifies variable immutability flags temporarily inside expressions.
C) Functions identically to a pointer reference.
D) Declares strictly typed variables bypassing Pylance warnings.

**Correct Answer:** **A)** Enables assigning dynamically evaluated inputs cleanly during structural expressions logic.
**Explanation:** The assignment expression cleanly assigns AND actively returns a variable's payload seamlessly inside a conditional logic loop: `if (n := len(a)) > 10: print(f"List is too long ({n})")`.
