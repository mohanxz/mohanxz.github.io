import { useState, useEffect } from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { motion } from 'framer-motion';

const AddTodoModal = ({ show, onHide, onSubmit, todo, darkMode }) => {
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [task, setTask] = useState('');
  const [completed, setCompleted] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (todo) {
      setDate(todo.date);
      setPriority(todo.priority);
      setTask(todo.task);
      setCompleted(todo.completed);
    } else {
      resetForm();
    }
  }, [todo]);

  const resetForm = () => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setPriority('medium');
    setTask('');
    setCompleted(false);
    setValidated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const newTodo = {
      id: todo ? todo.id : Date.now(),
      date,
      priority,
      task,
      completed
    };
    onSubmit(newTodo);
    resetForm();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      className={darkMode ? 'dark-modal' : ''}
    >
      <Modal.Header
        closeButton
        closeVariant={darkMode ? 'white' : undefined}
        className={darkMode ? 'bg-dark-2 text-light border-dark' : ''}
      >
        <Modal.Title>{todo ? 'Edit Task' : 'Add New Task'}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className={darkMode ? 'bg-dark-1 text-light' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FloatingLabel controlId="date" label="Due Date" className="mb-3">
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={darkMode ? 'bg-dark-2 text-light border-dark' : ''}
              />
              <Form.Control.Feedback type="invalid">
                Please select a date
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="priority" label="Priority" className="mb-3">
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={darkMode ? 'bg-dark-2 text-light border-dark' : ''}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
            </FloatingLabel>

              <Form.Control
                as="textarea"
                placeholder="Enter task description"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
                style={{
                  height: '100px',
                  backgroundColor: 'transparent',
                  boxShadow: 'none'
                }}
                className={darkMode ? 'text-light border-dark no-bg-input' : 'no-bg-input'}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a task description
              </Form.Control.Feedback>

            <Form.Check
              type="switch"
              id="completed"
              label="Completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className={darkMode ? 'text-light toggler' : 'toggler'}
            />
          </motion.div>
        </Modal.Body>
        <Modal.Footer className={darkMode ? 'bg-dark-2 border-dark' : ''}>
          <Button variant={darkMode ? 'outline-light' : 'secondary'} onClick={onHide}>
            Cancel
          </Button>
          <Button variant={darkMode ? 'primary-light' : 'primary'} type="submit">
            {todo ? 'Save Changes' : 'Add Task'}
          </Button>
        </Modal.Footer>
      </Form>

      {/* Custom styles for dark mode and transparent input */}
      <style jsx global>{`
        .dark-modal .modal-content {
          background-color: var(--bs-dark-1);
          color: #f8f9fa;
          border: 1px solid #495057;
        }

        .bg-dark-1 {
          background-color: #212529;
        }

        .bg-dark-2 {
          background-color: #2c3034;
        }

        .border-dark {
          border-color: #495057 !important;
        }

        .btn-primary-light {
          background-color: #4eacff;
          border-color: #4eacff;
          color: #fff;
        }

        .btn-primary-light:hover {
          background-color: #3a9bf5;
          border-color: #3a9bf5;
        }
          .toggler{
          margin-top:10px;
          }

        .dark-modal .form-control:focus,
        .dark-modal .form-select:focus {
          background-color: #343a40;
          color: #f8f9fa;
          border-color: #4eacff;
          box-shadow: 0 0 0 0.25rem rgba(78, 172, 255, 0.25);
        }

        .dark-modal .form-floating > label {
          color: #adb5bd;
        }

        .dark-modal .form-control::placeholder {
          color: #6c757d !important;
        }

        .dark-modal .form-switch .form-check-input:checked {
          background-color: #4eacff;
          border-color: #4eacff;
        }

        .dark-modal .form-control.is-invalid {
          border-color: #dc3545;
        }

        .dark-modal .invalid-feedback {
          color: #ff6b6b;
        }

        .no-bg-input {
          background-color: transparent !important;
        }
      `}</style>
    </Modal>
  );
};

export default AddTodoModal;
