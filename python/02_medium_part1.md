# Python Interview MCQs - Medium Level (Part 1)

These 25 questions test a deeper understanding of Python's execution model, standard library quirks, and object-oriented features.

---

### Q11. Generator Exhaustion
**Question:** What will be printed?
```python
gen = (x**2 for x in range(3))
list1 = list(gen)
list2 = list(gen)
print(list1, list2)
```
A) `[0, 1, 4] [0, 1, 4]`
B) `[0, 1, 4] []`
C) `[] [0, 1, 4]`
D) `TypeError: 'generator' object is not iterable`

**Correct Answer:** **B) `[0, 1, 4] []`**
**Explanation:** Generators evaluated lazily and yield items one by one. Once a generator is exhausted (as `list1` fully consumes it), it does not reset. Calling `list()` on an exhausted generator returns an empty list.

---

### Q12. The `for...else` Construct
**Question:** What is the output?
```python
for i in range(3):
    if i == 5:
        break
else:
    print("Loop finished")
```
A) (Nothing is printed)
B) `Loop finished`
C) `SyntaxError`
D) `NameError`

**Correct Answer:** **B) `Loop finished`**
**Explanation:** In Python, the `else` block attached to a `for` or `while` loop executes *only if the loop completes normally* (i.e., it is not terminated by a `break`). Because `i==5` is never True, `break` is never hit, so `else` executes.

---

### Q13. Multiple Decorator Order
**Question:** In what order are `decorator_a` and `decorator_b` applied?
```python
@decorator_a
@decorator_b
def my_func():
    pass
```
A) `decorator_a(decorator_b(my_func))`
B) `decorator_b(decorator_a(my_func))`
C) Executed simultaneously
D) Evaluated alphabetically

**Correct Answer:** **A) `decorator_a(decorator_b(my_func))`**
**Explanation:** Decorators are applied "bottom-up" (closest to the function first). `decorator_b` wraps `my_func`, and then `decorator_a` wraps the result of `decorator_b()`. 

---

### Q14. Boolean Evaluation of `all()` and `any()`
**Question:** What is the output?
```python
print(all([]), any([]))
```
A) `False False`
B) `True False`
C) `False True`
D) `True True`

**Correct Answer:** **B) `True False`**
**Explanation:** `any()` returns True if *at least one* element is truthy; an empty list has no truthy elements, so it returns `False`. `all()` returns True if *all* elements are truthy. For an empty list, this is vacuously True (there are no falsy elements to make it False).

---

### Q15. Dictionary Comprehension Key Overwrite
**Question:** What does `len(d)` evaluate to?
```python
d = {x: x % 2 for x in (1, 3, 5, 1, 3)}
```
A) `5`
B) `3`
C) `2`
D) `TypeError`

**Correct Answer:** **B) `3`**
**Explanation:** Dictionary comprehensions process elements iteratively from left to right. The keys `1`, `3`, and `5` are processed. When `1` and `3` appear again, they simply overwrite the existing keys with their new values. The unique keys are `1, 3, 5`, making the length `3`.

---

### Q16. The `zip()` Function Behavior
**Question:** What does this code print?
```python
a = [1, 2, 3]
b = ['a', 'b']
print(list(zip(a, b)))
```
A) `[(1, 'a'), (2, 'b'), (3, None)]`
B) `[(1, 'a'), (2, 'b')]`
C) `ValueError: iterables have different lengths`
D) `[(1, 'a'), (2, 'b'), (3, '')]`

**Correct Answer:** **B) `[(1, 'a'), (2, 'b')]`**
**Explanation:** By default, Python's `zip()` stops aggregating elements as soon as the *shortest* iterable is exhausted. If you want padding with `None` (like option A), you must use `itertools.zip_longest()`.

---

### Q17. Shallow Copy vs Deep Copy
**Question:** What happens to `list_a`?
```python
import copy
list_a = [[1, 2], [3, 4]]
list_b = copy.copy(list_a)
list_b[0][0] = 99
```
A) `list_a` remains `[[1, 2], [3, 4]]`
B) `list_a` becomes `[[99, 2], [3, 4]]`
C) `list_a` becomes `[[99, 2], [99, 4]]`
D) `AttributeError`

**Correct Answer:** **B) `list_a` becomes `[[99, 2], [3, 4]]`**
**Explanation:** `copy.copy()` creates a *shallow* copy. It copies the outer list, but the inner lists are just referenced. Modifying an inner list via `list_b` mutates the same inner list object that `list_a` points to. Use `copy.deepcopy()` to clone everything recursively.

---

### Q18. Method Resolution Order (MRO)
**Question:** In a diamond inheritance pattern `class D(B, C)`, where `B` and `C` inherit from `A`, what is the typical MRO in Python 3?
A) `D, B, A, C`
B) `D, B, C, A, object`
C) `D, A, B, C`
D) `B, C, A, D`

**Correct Answer:** **B) `D, B, C, A, object`**
**Explanation:** Python 3 uses the C3 Linearization algorithm for MRO. It ensures that a subclass is checked before its superclasses, and multiple parents are checked in the order they are listed `(B, C)`. It goes left-to-right but preserves superclass uniqueness (A is checked only *after* both B and C are checked).

---

### Q19. `isinstance` vs `type`
**Question:** What does this evaluate to?
```python
class Animal: pass
class Dog(Animal): pass

d = Dog()
print(type(d) == Animal, isinstance(d, Animal))
```
A) `True True`
B) `False True`
C) `True False`
D) `False False`

**Correct Answer:** **B) `False True`**
**Explanation:** `type(d)` returns precisely `<class '__main__.Dog'>`, which is not equal to `<class '__main__.Animal'>`. `isinstance()` checks if the object is an instance of the class *or a subclass thereof*, making it `True`. For robust polymorphic code, always prefer `isinstance()`.

---

### Q20. Modifying Lists while Iterating
**Question:** What is printed?
```python
lst = [1, 2, 3, 4]
for item in lst:
    if item in (2, 3):
        lst.remove(item)
print(lst)
```
A) `[1, 4]`
B) `[1, 3, 4]`
C) `[1, 2, 4]`
D) `ValueError`

**Correct Answer:** **B) `[1, 3, 4]`**
**Explanation:** You should *never* remove items from a list you are iterating over. When `2` is encountered (index 1) and removed, the list shifts left. The value `3` now sits at index 1. The loop iterator automatically advances to index 2 (which now holds `4`), entirely skipping `3`. 

---

### Q21. `__str__` vs `__repr__`
**Question:** Which magic method is explicitly intended to give an unambiguous representation mainly for developers?
A) `__str__`
B) `__repr__`
C) `__format__`
D) `__unicode__`

**Correct Answer:** **B) `__repr__`**
**Explanation:** `__str__` is for a readable, human-friendly representation of an object. `__repr__` aims to be unambiguous. If possible, `eval(repr(obj))` should recreate the object. When you inspect an object in the REPL or print a list of objects, Python calls `__repr__`.

---

### Q22. The `__dict__` Attribute Trap
**Question:** Why does setting an attribute on `object()` fail?
```python
obj = object()
obj.name = "Test"
```
A) `object()` returns a singleton
B) `object` instances lack a `__dict__` attribute
C) `object` instances are immutably cached
D) It actually succeeds

**Correct Answer:** **B) `object` instances lack a `__dict__` attribute**
**Explanation:** In Python, arbitrary attributes are usually stored in a `__dict__` attribute on the instance. However, to save memory, the base `object` class (and instances of classes defining `__slots__`) do not have a `__dict__`, so you cannot assign arbitrary attributes at runtime.

---

### Q23. Slicing Out of Bounds Error?
**Question:** What happens when this is run?
```python
a = [1, 2, 3]
print(a[1:100])
```
A) `IndexError: list index out of range`
B) `[2, 3]`
C) `[2, 3, None, None...]`
D) `SyntaxError`

**Correct Answer:** **B) `[2, 3]`**
**Explanation:** Python slicing is extremely forgiving. Unlike direct index access (`a[100]`), list slices gracefully truncate to the actual boundaries of the list. It returns all elements from index 1 to the end of the list without raising an `IndexError`.

---

### Q24. F-String Evaluation Time
**Question:** What gets printed?
```python
def f(): return 10
s = f"{f()}"
def f(): return 20

print(s)
```
A) `10`
B) `20`
C) `RuntimeError`
D) `<function f at ...>`

**Correct Answer:** **A) `10`**
**Explanation:** F-strings are evaluated dynamically *at runtime exactly when the expression runs*. When `s = f"{f()}"` executes, it calls the *current* definition of `f`, pulling `10`. Redefining `f` afterwards does not magically update the already-evaluated string `s`.

---

### Q25. Variable Unpacking Tricky Case
**Question:** What does `a` evaluate to?
```python
*a, b, c = 1, 2
```
A) `a = [1]`, `b = 2`, `c = None`
B) `a = []`, `b = 1`, `c = 2`
C) `a = (1,)`, `b=2`, `c=2`
D) `ValueError: not enough values to unpack`

**Correct Answer:** **B) `a = []`, `b = 1`, `c = 2`**
**Explanation:** In variable unpacking, variables without an asterisk must be assigned specifically. Python assigns `b=1` and `c=2` from the back, leaving no leftover elements for `*a`. The starred variable seamlessly collects zero elements, becoming an empty list `[]`.

---

### Q26. Set Comprehension vs Generator Expression
**Question:** What is the type of `x`?
```python
x = {}
y = ()
z = {i for i in range(1)}
```
A) dict, tuple, set
B) set, tuple, dict
C) dict, generator, dict
D) dict, tuple, dict

**Correct Answer:** **A) dict, tuple, set**
**Explanation:**
- `{}` creates an empty dictionary. (To make an empty set, use `set()`).
- `()` creates an empty tuple.
- `{i for i in ...}` uses set comprehension syntax, so `z` is a `set`, not a dict. Dict comprehensions require a colon `{k: v for...}`.

---

### Q27. List Multiplier Reference Trap
**Question:** What is the output?
```python
grid = [[0]] * 3
grid[0][0] = 1
print(grid)
```
A) `[[1], [0], [0]]`
B) `[[1], [1], [1]]`
C) `TypeError`
D) `[[0], [0], [0]]`

**Correct Answer:** **B) `[[1], [1], [1]]`**
**Explanation:** The `*` operator on lists copies the *references*, not the objects themselves. `grid` contains 3 references to the *exact same* inner list `[0]`. Changing the 0th element changes it for all three references.

---

### Q28. Return Within a Generator
**Question:** In Python 3.3+, what happens when a generator executes `return "Done"`?
A) SyntaxError
B) The generator yields `"Done"` and terminates
C) It raises `StopIteration("Done")`
D) It ignores the return value and raises normal StopIteration

**Correct Answer:** **C) It raises `StopIteration("Done")`**
**Explanation:** Returning a value from a generator is legal in modern Python. The returned payload is attached to the `StopIteration` exception's `value` attribute. This powers the `yield from` syntax and asyncio mechanics under the hood.

---

### Q29. Keyword Arguments Ordering
**Question:** In Python 3, is it valid to define `def func(a, *args, b):`?
A) No, `*args` must be the final parameter.
B) Yes, but `b` must be passed as a keyword argument.
C) Yes, `b` captures the final positional argument.
D) No, `SyntaxError`.

**Correct Answer:** **B) Yes, but `b` must be passed as a keyword argument.**
**Explanation:** Parameters that appear after `*args` are called *Keyword-Only Arguments*. You can never reach them positionally because `*args` consumes all remaining positional arguments. You must explicitly do `func(1, 2, 3, b=4)`.

---

### Q30. The `del` Statement Mechanics
**Question:** What does `del obj` do?
A) Immediately frees memory for the object.
B) Removes the name `obj` from the namespace and decrements the object's reference count.
C) Calls Python's garbage collector.
D) Calls the object's `__del__` destructor explicitly.

**Correct Answer:** **B) Removes the name `obj` from the namespace and decrements the object's reference count.**
**Explanation:** `del` unbinds references, it does not delete objects. Over time, if an object's reference count hits zero as a result of a `del` operation (or dropping out of scope), Python's memory manager frees it. `__del__` is called right before the object is destroyed, not precisely when `del` is typed.

---

### Q31. Map Lazy Evaluation
**Question:** What does this Python 3 code print?
```python
nums = [1, 2, 3]
squared = map(lambda x: x**2, nums)
nums.append(4)
print(list(squared))
```
A) `[1, 4, 9]`
B) `[1, 4, 9, 16]`
C) MemoryError
D) Empty List

**Correct Answer:** **B) `[1, 4, 9, 16]`**
**Explanation:** `map` in Python 3 returns an iterator. It doesn't evaluate the mapping until you consume it with `list()`. Because it's lazy and holds a reference to the original `nums` list, when we mutate `nums` before consumption, `map` processes the appended `4` as well!

---

### Q32. Mutable Default Trap vs Keyword Trap
**Question:** What happens?
```python
def f(a, **kwargs):
    kwargs.setdefault('opts', []).append(a)
    return kwargs

print(f(1), f(2))
```
A) `{'opts': [1]} {'opts': [2]}`
B) `{'opts': [1]} {'opts': [1, 2]}`
C) `TypeError`
D) `{'opts': [2]} {'opts': [2]}`

**Correct Answer:** **A) `{'opts': [1]} {'opts': [2]}`**
**Explanation:** `kwargs` is constructed as a *new* dictionary every single time the function is called. Therefore, `kwargs.setdefault` modifies a fresh dictionary. It does NOT suffer from the mutable default argument trap because `kwargs` itself is not a statically defined default argument at definition time.

---

### Q33. `bool()` Evaluation Trick
**Question:** Which of these objects inherently evaluates to `False`?
A) A class without `__bool__` or `__len__` methods.
B) Function objects `def x(): pass`
C) An instance of a class that returns `0` from `__len__`
D) The floating point number `-0.0001`

**Correct Answer:** **C) An instance of a class that returns `0` from `__len__`**
**Explanation:** To evaluate Truthy/Falsy, Python checks `__bool__()` on the object. If missing, it checks `__len__()`. If `__len__()` returns `0`, the object is `False`. If both are missing, custom objects are `True` by default. Floating point `-0.0001` is not zero, so it is `True`.

---

### Q34. Sorting a Dictionary
**Question:** What does `sorted({'c': 1, 'b': 2, 'a': 3})` output?
A) `['a', 'b', 'c']`
B) `[('a', 3), ('b', 2), ('c', 1)]`
C) `{'a': 3, 'b': 2, 'c': 1}`
D) `TypeError`

**Correct Answer:** **A) `['a', 'b', 'c']`**
**Explanation:** Iterating directly over a dictionary yields its keys. Therefore, `sorted()` applied directly to a dictionary pulls its keys and sorts them, discarding the values entirely, and always returning a list.

---

### Q35. Circular References and GC
**Question:** How does Python resolve isolated circular references (e.g., `A` references `B`, `B` references `A`, but nothing from the outer namespace references either)?
A) They persist until interpreted termination (Memory Leak).
B) CPython's reference counting handles it.
C) CPython's Generational Garbage Collector identifies and sweeps them.
D) `__del__` forces destruction.

**Correct Answer:** **C) CPython's Generational Garbage Collector identifies and sweeps them.**
**Explanation:** Standard reference counting cannot solve circular references (their ref counts never hit zero). Python runs a background Generational Garbage Collector specifically designed to detect grouped objects with interconnecting references but zero external incoming references, and safely frees them.
