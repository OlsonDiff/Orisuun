import React from 'react';
import TaskItem from './taskItem';
import { TaskDetails } from './taskDetails';

const TaskList = ({ tasks, setSelectedTask, selectedTaskId, isMobile }) => {
  return (
    <div className="relative">
      <div
        className={`hidden lg:block border border-gray-200 absolute h-full left-8`}
      ></div>
      <ul className={`flex flex-col gap-4 small-500:px-4`}>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem
              task={task}
              setSelectedTask={setSelectedTask}
              holder={task.mainImg}
              holderOnFocus={task.focusImg}
              isSelected={task.id === selectedTaskId}
            />
            {isMobile && task.id === selectedTaskId && (
              <TaskDetails task={task} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
