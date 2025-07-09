import { Card, Badge, Button, Stack } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { PencilSquare, Trash, CheckCircle, Circle } from 'react-bootstrap-icons'
import { format } from 'date-fns'

const priorityColors = {
  high: 'danger',
  medium: 'warning',
  low: 'success'
}

const priorityLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low'
}

const TodoList = ({ todos, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="todo-grid">
      <AnimatePresence>
        {todos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-5"
          >
            <div className="text-muted text-center">No todos found. Add a new task to get started!</div>
          </motion.div>
        ) : (
          todos.map(todo => (
            <motion.div
              key={todo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className={`mb-3 shadow-sm ${todo.completed ? 'completed' : ''}`}>
                <Card.Body>
                  <div className="d-flex align-items-start">
                    <Button 
                      variant="link" 
                      className="p-0 me-2"
                      onClick={() => onToggleComplete(todo.id)}
                    >
                      {todo.completed ? (
                        <CheckCircle className="text-success" size={24} />
                      ) : (
                        <Circle className="text-muted" size={24} />
                      )}
                    </Button>
                    <div className="flex-grow-1">
                      <Card.Title className={`mb-1 ${todo.completed ? 'text-decoration-line-through' : ''}`}>
                        {todo.task}
                      </Card.Title>
                      <Stack direction="horizontal" gap={2} className="mb-2">
                        <Badge bg={priorityColors[todo.priority]} className="text-capitalize">
                          {priorityLabels[todo.priority]}
                        </Badge>
                        <small className="text-muted">
                          {format(new Date(todo.date), 'MMM dd, yyyy')}
                        </small>
                      </Stack>
                      <div className="d-flex justify-content-end">
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => onEdit(todo)}
                        >
                          <PencilSquare size={16} />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => onDelete(todo.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  )
}

export default TodoList