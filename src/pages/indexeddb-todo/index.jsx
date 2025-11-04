import { useEffect, useState } from "react";

export default function TodoIndexedDB() {
  const [db, setDb] = useState(null);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // --- 1. INITIALIZE IndexedDB ---
  useEffect(() => {
    const request = indexedDB.open("todoDB", 1);

    // Triggered when the database is created or upgraded
    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      // Create an object store (like a table)
      if (!database.objectStoreNames.contains("todos")) {
        const store = database.createObjectStore("todos", {
          keyPath: "id", // key to identify each record
          autoIncrement: true, // auto-increment primary key
        });

        // Create an index for searching by "done" status (optional)
        store.createIndex("done", "done", { unique: false });
      }
    };

    // Fired when the database is successfully opened
    request.onsuccess = () => {
      setDb(request.result);
    };

    // Fired if an error occurs while opening the database
    request.onerror = (event) => {
      console.error("❌ Error opening IndexedDB:", event);
    };
  }, []);

  // --- 2. ADD TO-DO ---
  const addTodo = (text) => {
    if (!db || !text.trim()) return;

    const tx = db.transaction("todos", "readwrite"); // create transaction (write mode)
    const store = tx.objectStore("todos"); // access the object store
    store.add({ text, done: false }); // add a new record

    tx.oncomplete = listTodos; // refresh list after transaction completes
    setText("");
  };

  // --- 3. FETCH ALL TODOS ---
  const listTodos = () => {
    if (!db) return;

    const tx = db.transaction("todos", "readonly"); // transaction in read-only mode
    const store = tx.objectStore("todos");
    const req = store.getAll(); // get all records
    req.onsuccess = () => setTodos(req.result);
  };

  // --- 4. TOGGLE TO DO STATUS (done / not done) ---
  const toggleTodo = (id) => {
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    const req = store.get(id); // get record by id

    req.onsuccess = () => {
      const todo = req.result;
      todo.done = !todo.done; // toggle the "done" state
      store.put(todo); // update the record
      tx.oncomplete = listTodos;
    };
  };

  // --- 5. DELETE TO-DO ---
  const deleteTodo = (id) => {
    const tx = db.transaction("todos", "readwrite");
    const store = tx.objectStore("todos");
    store.delete(id); // delete record by id
    tx.oncomplete = listTodos;
  };

  // --- 6. FETCH TODOS AFTER DATABASE IS READY ---
  useEffect(() => {
    if (db) listTodos();
  }, [db]);

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h2>🗂️ IndexedDB Todo List</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={() => addTodo(text)}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: 6,
              background: todo.done ? "#e6ffe6" : "white",
            }}
          >
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ color: "red", marginLeft: 8 }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
