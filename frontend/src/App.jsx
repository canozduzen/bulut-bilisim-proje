import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')

  // Backend'den verileri çek (GET)
  const fetchTodos = async () => {
    const response = await fetch('http://13.62.54.131:3000/api/todos')
    const data = await response.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Yeni görev ekle (POST)
  const addTodo = async (e) => {
    e.preventDefault()
    if (!task) return

    await fetch('http://13.62.54.131:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    })
    setTask('')
    fetchTodos() // Listeyi yenile
  }

  // Görev sil (DELETE)
  // Görev sil (DELETE)
  const deleteTodo = async (id) => {
    await fetch('http://13.62.54.131:3000/api/todos/' + id, {
      method: 'DELETE'
    })
    fetchTodos() // Listeyi yenile
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2>☁️ Bulut Bilişim Görev Yöneticisi</h2>
      
      <form onSubmit={addTodo} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Yeni görev ekle..." 
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Ekle</button>
      </form>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f9fa', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '4px 8px' }}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App