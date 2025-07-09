import { Card, Badge, Button, Stack, Container } from 'react-bootstrap'
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
    <div className="todo-app-container">
     

      <Container>
        <div className="todo-grid  ">
          <AnimatePresence>
            {todos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-5"
              >
                <div className="text-muted text-center">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                    alt="No tasks" 
                    style={{ width: '120px', opacity: 0.7, marginBottom: '1rem' }}
                  />
                  <h5 className="text-muted ">No todos found</h5>
                  <p className="text-muted">Add a new task to get started!</p>
                </div>
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
                  <Card className={`mb-3 todo-card ${todo.completed ? 'completed' : ''}`}>
                    <Card.Body>
                      <div className="d-flex align-items-start">
                        <Button 
                          variant="link" 
                          className="p-0 me-3 toggle-btn"
                          onClick={() => onToggleComplete(todo.id)}
                        >
                          {todo.completed ? (
                            <CheckCircle className="text-success" size={24} />
                          ) : (
                            <Circle className="text-muted" size={24} />
                          )}
                        </Button>
                        <div className="flex-grow-1">
                          <Card.Title className={`mb-2 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                            {todo.task}
                          </Card.Title>
                          <Stack direction="horizontal" gap={2} className="mb-3">
                            <Badge 
                              pill 
                              bg={priorityColors[todo.priority]} 
                              className="text-capitalize px-2 py-1"
                            >
                              {priorityLabels[todo.priority]}
                            </Badge>
                            <small className="text-muted">
                              <i className="bi bi-calendar me-1"></i>
                              {format(new Date(todo.date), 'MMM dd, yyyy')}
                            </small>
                          </Stack>
                          <div className="d-flex justify-content-end">
                            <Button 
                              variant="outline-secondary" 
                              size="sm" 
                              className="me-2 action-btn"
                              onClick={() => onEdit(todo)}
                            >
                              <PencilSquare size={16} className="me-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              className="action-btn"
                              onClick={() => onDelete(todo.id)}
                            >
                              <Trash size={16} className="me-1" />
                              Delete
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
      </Container>

      {/* Add some custom styles */}
      <style jsx>{`
       
        
        .todo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .todo-card {
          border: none;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .todo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        
        .todo-card.completed {
          background-color: #f8f9fa;
        }
        
        .action-btn {
          border-radius: 20px;
          padding: 0.25rem 0.75rem;
        }
        
        .toggle-btn {
          transition: transform 0.2s;
        }
        
        .toggle-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}

export default TodoList