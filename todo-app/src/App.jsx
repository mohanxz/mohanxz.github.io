import { useState, useEffect } from 'react'
import { Container, Button, Navbar, Form } from 'react-bootstrap'
import { MoonStarsFill, SunFill } from 'react-bootstrap-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import TodoList from './components/TodoList'
import AddTodoModal from './components/AddTodoModal'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editTodo, setEditTodo] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    if (savedTodos) setTodos(JSON.parse(savedTodos))
    setDarkMode(savedDarkMode)
    setLoading(false)
  }, [])

  // Save todos to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, loading])

  // Toggle dark mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode'
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true
    if (filter === 'completed') return todo.completed
    if (filter === 'active') return !todo.completed
    return true
  })

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, { ...newTodo, id: Date.now() }])
    setShowAddModal(false)
    toast.success('Todo added successfully!')
  }

  const handleEditTodo = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))
    setEditTodo(null)
    toast.success('Todo updated successfully!')
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
    toast.error('Todo deleted!')
  }

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              📝 TickIt
            </motion.div>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Form.Select 
              size="sm" 
              className="me-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Form.Select>
            <Button 
              variant={darkMode ? 'outline-light' : 'outline-dark'} 
              size="sm" 
              className="me-2"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <SunFill /> : <MoonStarsFill />}
            </Button>
            <Button 
              variant="primary"
              size="sm"
              onClick={() => setShowAddModal(true)}
            >
              + Add Task
            </Button>
          </div>
        </Container>
      </Navbar>

      <Container className="py-3">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            <TodoList 
              todos={filteredTodos} 
              onEdit={setEditTodo} 
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
            />
          </AnimatePresence>
        )}
      </Container>

      <AddTodoModal 
        show={showAddModal || editTodo !== null}
        onHide={() => {
          setShowAddModal(false)
          setEditTodo(null)
        }}
        onSubmit={editTodo ? handleEditTodo : handleAddTodo}
        todo={editTodo}
        darkMode={darkMode}
      />
    </div>
  )
}

export default App