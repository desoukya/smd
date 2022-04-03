import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

interface Todo {
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const getTodosFromAsyncStorage = async () => {
    const todos = await AsyncStorage.getItem('todoList');
    if (todos) {
      const myTodos = JSON.parse(todos);
      if (myTodos && myTodos.length) {
        setTodoList(myTodos);
      }
    }
  };

  const saveTodosToAsyncStorage = async (todos: Todo[]) => {
    await AsyncStorage.setItem('todoList', JSON.stringify(todos));
    setTodoList(todos);
  };  

  useEffect(() => {
    getTodosFromAsyncStorage();
  }, []);

  const handleSubmit = async (): Promise<void> => {
    if (!todo) {
      showError(true);
    } else {
      const todos = [...todoList, { text: todo.trim(), completed: false }];
      await saveTodosToAsyncStorage(todos);
      setTodo('');
    }
  };

  const removeItem = async (idx: number): Promise<void> => {
    const newToDoList = [...todoList];
    newToDoList.splice(idx, 1);
    await saveTodosToAsyncStorage(newToDoList);
  };

  const toggleComplete = async (idx: number): Promise<void> => {
    const newToDoList = [...todoList];
    newToDoList[idx].completed = !newToDoList[idx].completed;
    await saveTodosToAsyncStorage(newToDoList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          autoCapitalize='none'
          placeholder='Enter your todo task...'
          value={todo}
          onChangeText={e => {
            setTodo(e);
            showError(false);
          }}
          style={styles.inputBox}
        />
        <Button title='Add Task' onPress={handleSubmit} />
      </View>
      {error && (
        <Text style={styles.error}>Cannot create empty todo</Text>
      )}
      <Text style={styles.subtitle}>Your Tasks :</Text>
      {/* if not tasks exists then show default message */}
      {todoList.length === 0 && <Text>You don't have any tasks</Text>}
      {/* loop through each todo in list and display it */}
      {todoList.map((todo: Todo, idx: number) => (
        <View style={styles.listItem} key={`${idx}_${todo.text}`}>
          {/* display the todo task */}
          <Text
            style={[
              styles.task,
              { textDecorationLine: todo.completed ? 'line-through' : 'none' }
            ]}
          >
            {todo.text}
          </Text>
          {/* button to mark as complete */}
          <Button
            color={todo.completed ? 'green' : 'black'}
            title={todo.completed ? '[✅]' : '[ - ]'}
            onPress={() => toggleComplete(idx)}
          />
          {/* button to remove task from list */}
          <Button
            title='❌'
            onPress={() => removeItem(idx) }
            color='crimson'
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: 'center'
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  inputBox: {
    width: 200,
    borderColor: 'purple',
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'purple'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  addButton: {
    alignItems: 'flex-end'
  },
  task: {
    width: 200
  },
  error: {
    color: 'red'
  }
});
