const fs = require('fs');
const path = require('path');

const filePath = 'web/public/data/python_mcqs.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 1. Fix formatting for indices 10 to 77
for (let i = 10; i < 78; i++) {
  const q = data[i];
  if (!q) continue;

  // Extract options if they are in the question string
  const optionRegex = /([A-D])\)\s*(.*)/g;
  let match;
  const newOptions = {};
  
  while ((match = optionRegex.exec(q.question)) !== null) {
    newOptions[match[1]] = match[2].trim();
  }

  if (Object.keys(newOptions).length > 0) {
    q.options = newOptions;
    // Remove the option lines from the question
    q.question = q.question.replace(/([A-D])\)\s*(.*)/g, '').trim();
  }
  
  // Provide professional explanations for these questions based on their titles/topics
  if (!q.explanation || q.explanation === "") {
    q.explanation = generateExplanation(q.title, q.correct_answer, q.options);
  }
}

// 2. Replace corrupted questions (Index 78 onwards) with new MAANG-level questions
const newHardQuestions = [
  {
    "title": "CPython Internals: The Giant Lock",
    "question": "In the standard CPython implementation, how does the Global Interpreter Lock (GIL) behave when a thread performs a blocking I/O operation (e.g., `socket.recv()`)?",
    "options": {
      "A": "The thread retains the GIL to prevent other threads from corrupting the I/O buffer.",
      "B": "The GIL is released before the blocking call and re-acquired after the call completes.",
      "C": "The GIL is only released if the developer explicitly calls `sys.release_gil()`.",
      "D": "CPython uses fine-grained locking for I/O, so the GIL is never involved in these operations."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "To ensure concurrency in I/O-bound programs, CPython releases the GIL whenever a thread performs a blocking system call (like I/O or `time.sleep()`). This allows other threads to execute Python bytecode while the first thread waits for the OS to complete the I/O operation."
  },
  {
    "title": "Metaclass Conflict Resolution",
    "question": "What is the primary cause of a `TypeError` when a class attempts to inherit from two base classes that have different metaclasses?",
    "options": {
      "A": "MRO (Method Resolution Order) cannot be linearized if metaclasses differ.",
      "B": "The leaf class must have a metaclass that is a derived class of the metaclasses of all its bases.",
      "C": "Python 3 strictly forbids multiple inheritance if any base using a custom metaclass.",
      "D": "Metaclasses are singletons and cannot be shared across inheritance trees."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "When a class is created, its metaclass is determined. If base classes have different metaclasses, Python must find a 'winner' that is a subclass of all metaclasses involved. If no such subclass exists, a 'metaclass conflict' error is raised. To fix this, you must manually create a metaclass that inherits from all the conflicting metaclasses."
  },
  {
    "title": "Asyncio Execution Flow",
    "question": "Consider an `async` function executing `await asyncio.gather(task1(), task2())`. If `task1` contains a `time.sleep(5)` call, what happens to `task2`?",
    "options": {
      "A": "It executes in parallel on a separate OS thread.",
      "B": "It is blocked and will not begin or move forward until `task1` finishes its sleep.",
      "C": "The event loop context-switches to `task2` automatically because `time.sleep` is a blocking call.",
      "D": "The event loop crashes because `time.sleep` is not 'awaitable'."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "`time.sleep()` is a synchronous, blocking call that stops the entire thread. Since `asyncio` typically runs on a single thread, calling `time.sleep()` blocks the event loop itself, preventing any other tasks (including `task2`) from running. Use `await asyncio.sleep()` to allow the loop to switch tasks."
  },
  {
    "title": "Weak References & Memory Pressure",
    "question": "Under what condition will an object be collected by the Garbage Collector even if there is an active `weakref.ref` pointing to it?",
    "options": {
      "A": "Never; weak references count toward the reference count in CPython.",
      "B": "When all 'strong' references (standard variables) to the object are deleted.",
      "C": "Only when the system memory reaches a critical threshold.",
      "D": "When the `weakref` object itself is deleted from the namespace."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "Weak references do not increase the reference count of an object. Their purpose is to allow tracking an object without preventing its collection. Once the last strong reference is gone, the object is eligible for GC, even if many weak references exist."
  },
  {
    "title": "Descriptors and Attribute Lookup",
    "question": "If a class defines a Data Descriptor (implements both `__get__` and `__set__`), and an instance of that class also has a value with the same name in its `__dict__`, which one 'wins' during lookup?",
    "options": {
      "A": "The value in the instance `__dict__`.",
      "B": "The Data Descriptor.",
      "C": "Neither; it raises an `AttributeError` due to ambiguity.",
      "D": "A `SyntaxError` occurs at class definition time."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "This is a key part of Python's lookup hierarchy. Data Descriptors (those with `__set__`) take precedence over instance variables. Non-Data Descriptors (those with only `__get__`), however, are overridden by instance variables."
  },
  {
    "title": "Function Argument Evaluation Time",
    "question": "In the definition `def register_user(name, timestamp=time.time()):`, when is `time.time()` evaluated?",
    "options": {
      "A": "Every time the function is called.",
      "B": "Only once, when the module containing the function is first imported/defined.",
      "C": "The first time the function is called, then cached.",
      "D": "Never; it remains a callable object until accessed."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "Python evaluates default arguments exactly once: at function definition time. This is why using mutable objects (like lists) or dynamic calls (like `time.time()`) as defaults is a common 'trap'; every call will share the same value generated at start-up."
  },
  {
    "title": "The `__slots__` Inheritance Trap",
    "question": "A class `Child` inherits from `Parent`. `Parent` defines `__slots__ = ('name',)`. `Child` does not define `__slots__`. What is true about memory usage for `Child` instances?",
    "options": {
      "A": "They continue to save memory by using the Parent's slots.",
      "B": "They will have a `__dict__`, nullifying the memory benefits of `__slots__` for the child.",
      "C": "The `Child` class will throw a `TypeError` because slots are not inherited.",
      "D": "The `Child` class will be immutable because it didn't define its own slots."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "For the memory benefits of `__slots__` to persist in a subclass, the subclass must also define `__slots__` (even if empty). If the child omits it, Python automatically creates a `__dict__` for the child, which consumes more memory and defeats the purpose of slots in the parent."
  },
  {
    "title": "Context Managers and Exceptions",
    "question": "How can the `__exit__` method of a context manager 'swallow' (suppress) an exception that occurred inside the `with` block?",
    "options": {
      "A": "By raising a new exception of a different type.",
      "B": "By returning a truthy value (e.g., `True`).",
      "C": "By accepting `None` as the exception type argument.",
      "D": "Exceptions cannot be suppressed by `__exit__`; they always propagate."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "If `__exit__` returns `True` (or any truthy value), Python considers the exception 'handled' and stops propagation. If it returns `False`, `None`, or nothing, the exception continues to rise through the stack."
  },
  {
    "title": "Dict Implementation: Hash Collisions",
    "question": "In modern Python (3.7+), how does the interpreter handle hash collisions in the dictionary implementation?",
    "options": {
      "A": "It creates a linked list at the collision index (Chaining).",
      "B": "It uses open addressing with a specialized probing pseudo-random sequence.",
      "C": "It crashes with a `SystemError` because hash collisions are not allowed.",
      "D": "It re-hashes the entire dictionary using a different seed."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "CPython dictionaries use open addressing. When a collision occurs, it calculates a new index based on a perturbation of the hash, effectively 'probing' for the next available slot. This is combined with a compact array structure in 3.6+ to save memory and preserve insertion order."
  },
  {
    "title": "MRO: The Diamond Problem",
    "question": "Consider `class A`, `class B(A)`, `class C(A)`, and `class D(B, C)`. What is the correct MRO for class `D` in Python 3?",
    "options": {
      "A": "D -> B -> A -> C -> A",
      "B": "D -> B -> C -> A -> object",
      "C": "D -> B -> A -> C -> object",
      "D": "D -> B -> C -> object"
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "Python uses the C3 Linearization algorithm. In a diamond pattern, it ensures that a class appears after its children and before its parents, but also respects the order of the base classes. D comes first, then its parents (B and C) in order, and finally the shared parent A."
  },
  {
    "title": "CPython Bytecode: `LOAD_FAST`",
    "question": "Which variable type is accessed using the `LOAD_FAST` opcode in CPython?",
    "options": {
      "A": "Global variables.",
      "B": "Local variables inside a function.",
      "C": "Class-level attributes.",
      "ed": "Built-in functions like `len()`."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "`LOAD_FAST` is used for local variables inside a function. These are stored in a fixed-size array on the stack frame rather than a dictionary, making access much faster than `LOAD_GLOBAL` or `LOAD_NAME`."
  },
  {
    "title": "Generators: `.close()` internals",
    "question": "What exception is raised *inside* a generator when the caller calls its `.close()` method?",
    "options": {
      "A": "StopIteration",
      "B": "GeneratorExit",
      "C": "KeyboardInterrupt",
      "D": "ReferenceError"
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "When `.close()` is called, Python raises `GeneratorExit` at the point where the generator was suspended (at the `yield`). The generator must then either catch it and terminate or allow it to propagate. If the generator yields another value instead of terminating, a `RuntimeError` is raised."
  },
  {
    "title": "Closure Variable Binding",
    "question": "When a closure captures a variable, where is that variable stored in the function object?",
    "options": {
      "A": "In the `__dict__` of the function.",
      "B": "In the `__closure__` attribute as a tuple of cells.",
      "C": "In the global variables dictionary.",
      "D": "In a temporary thread-local storage."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "Python uses 'cell objects' to implement closures. Captured variables are stored in the `__closure__` attribute, which is a tuple containing cells that point to the actual values in the outer scope. This allows the inner function to access the variables even after the outer function has finished executing."
  },
  {
    "title": "Module Caching: `sys.modules`",
    "question": "If you modify `sys.modules['os'] = None` and then try to `import os`, what happens?",
    "options": {
      "A": "Python re-loads the `os` module from disk.",
      "B": "An `ImportError` or `ModuleNotFoundError` is raised.",
      "C": "It returns the existing cached version from memory.",
      "D": "The system crashes immediately."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "The import system checks `sys.modules` first. If a key exists but has a value of `None`, it is treated as an explicit 'forbidden' module, and an `ImportError` is raised. This is sometimes used to prevent optional dependencies from being imported."
  },
  {
    "title": "Decorators: `@functools.wraps`",
    "question": "What is the primary technical reason to use `@functools.wraps(f)` when writing a custom decorator?",
    "options": {
      "A": "It improves the performance of the decorated function.",
      "B": "It copies metadata like `__name__` and `__doc__` from the original function to the wrapper.",
      "C": "It ensures the function is thread-safe.",
      "D": "It automatically converts the function into a generator."
    },
    "correct_answer": "B",
    "difficulty": "Hard",
    "explanation": "Standard decorators return a new function (the 'wrapper'). Without `@wraps`, the decorated function would appear to have the name 'wrapper' and lose its original docstring. `@wraps` fixes this by copying the identity and metadata from the original function."
  }
];

// Combine fixed questions and new hard questions
const finalizedData = [...data.slice(0, 78), ...newHardQuestions];

// Save fixed file
fs.writeFileSync(filePath, JSON.stringify(finalizedData, null, 2));
console.log('Fixed Python MCQs saved successfully.');

function generateExplanation(title, correct, options) {
  // Simple heuristic based on title to provide helpful notes
  const themes = {
    'Generator': 'Generators are lazy iterators that do not store values in memory. Once exhausted, they cannot be reused.',
    'Decorator': 'Decorators are high-order functions that modify the behavior of another function. They are applied from bottom to top.',
    'MRO': 'Method Resolution Order in Python 3 uses C3 Linearization to resolve which method to call in multiple inheritance.',
    'Shallow': 'A shallow copy creates a new collection object but does not recursively copy the objects within it. Deep copy handles recursion.',
    'zip': 'The zip function stops as soon as the shortest iterable is exhausted.',
    'Boolean': 'In Python, empty collections and the number 0 evaluate to False in a boolean context.',
    'all()': 'all() returns True if all elements are true (or if the iterable is empty). any() returns True if at least one element is true.',
  };
  
  for (const [key, val] of Object.entries(themes)) {
    if (title.includes(key)) return val;
  }
  
  return 'Mastering these edge cases is key to acing MAANG & FAANG technical interviews. Deeply understanding how Python handles these scenarios differentiates senior developers.';
}
