import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const _task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((auxTasks) => [...auxTasks, _task]);
  }

  function handleToggleTaskDone(id: number) {
    const updtTasks = tasks.map((x) => ({ ...x }));
    const result = updtTasks.find((x) => x.id === id);
    if (!result) return;
    result.done = !result.done;
    setTasks(updtTasks);
  }

  function handleRemoveTask(id: number) {
    const result = tasks.filter((x) => x.id !== id);
    setTasks(result);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList tasks={tasks} toggleTaskDone={handleToggleTaskDone} removeTask={handleRemoveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
