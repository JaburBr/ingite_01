import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskProps = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const isTaskTitle = tasks.find((x) => x.title === newTaskTitle);
    if (isTaskTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }
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
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não',
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const result = tasks.filter((x) => x.id !== id);
          setTasks(result);
        },
      },
    ]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskProps) {
    const updtTasks = tasks.map((x) => ({ ...x }));
    const result = updtTasks.find((x) => x.id === taskId);
    if (!result) return;
    result.title = taskNewTitle;
    setTasks(updtTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
