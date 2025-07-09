

import { useState, useEffect } from 'react'
import { Modal, Form, Button, FloatingLabel, FormControl } from 'react-bootstrap'
import { motion } from 'framer-motion'

const AddTodoModal = ({ show, onHide, onSubmit, todo, darkMode }) => {
  const [date, setDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [task, setTask] = useState('')
  const [completed, setCompleted] = useState(false)
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    if (todo) {
      setDate(todo.date)
      setPriority(todo.priority)
      setTask(todo.task)
      setCompleted(todo.completed)
    } else {
      resetForm()
    }
  }, [todo])

  const resetForm = () => {
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
    setPriority('medium')
    setTask('')
    setCompleted(false)
    setValidated(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    const newTodo = {
      id: todo ? todo.id : Date.now(),
      date,
      priority,
      task,
      completed
    }
    onSubmit(newTodo)
    resetForm()
  }

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className={darkMode ? 'bg-dark text-white' : ''}>
        <Modal.Title>{todo ? 'Edit Task' : 'Add New Task'}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className={darkMode ? 'bg-dark text-white' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FloatingLabel controlId="date" label="Due Date" className="mb-3">
              <FormControl 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
                className={darkMode ? 'bg-secondary text-white' : ''}
              />
              <Form.Control.Feedback type="invalid">
                Please select a date
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="priority" label="Priority" className="mb-3">
              <Form.Select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className={darkMode ? 'bg-secondary text-white' : ''}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel controlId="task" label="Task Description" className="mb-3">
              <FormControl 
                as="textarea" 
                placeholder="Enter task description" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                required 
                style={{ height: '100px' }}
                className={darkMode ? 'bg-secondary text-white' : ''}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a task description
              </Form.Control.Feedback>
            </FloatingLabel>

            <Form.Check 
              type="switch"
              id="completed"
              label="Completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className={darkMode ? 'text-white' : ''}
            />
          </motion.div>
        </Modal.Body>
        <Modal.Footer className={darkMode ? 'bg-dark' : ''}>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {todo ? 'Save Changes' : 'Add Task'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddTodoModal