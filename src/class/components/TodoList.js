import React, { Component } from 'react'
import TodoItem from './TodoItem'

class TodoList extends Component {
    render() {
        const { todos, onToggle, onRemove } = this.props
        const todoList =
            todos &&
            todos.map((todo) => (
                <TodoItem
                    key={todo.get('id')}
                    done={todo.get('done')}
                    onToggle={() => onToggle(todo.get('id'))}
                    onRemove={() => onRemove(todo.get('id'))}
                >
                    {todo.get('text')}
                </TodoItem>
            ))
        return <div style={{ paddingTop: '10px' }}>{todoList}</div>
    }
}

export default TodoList