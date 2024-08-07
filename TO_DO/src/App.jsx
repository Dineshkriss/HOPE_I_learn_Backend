import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [newTask, setnewTask] = useState("");
  const [Tasks, setTasks] = useState([]);
  const [newHabit, setnewHabit] = useState("");
  const [Habits, setHabits] = useState([]);

  useEffect(() => {
    localStorage.clear();
    Tasks.forEach((item) => {
      console.log(item);
      localStorage.setItem(item.id, JSON.stringify(item));
    });
  }, [Tasks]);

  useEffect(() => {
    localStorage.clear();
    Habits.forEach((item) => {
      console.log(item);
      localStorage.setItem(item.id, JSON.stringify(item));
    });
  }, [Habits]);

  function handleSubmit(e) {
    e.preventDefault();
    setTasks([
      ...Tasks,
      { id: crypto.randomUUID(), taskname: newTask, done: false },
    ]);
    setnewTask("");
  }

  function toggleCheckbox(id) {
    setTasks(
      Tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function toggleHabitcheckbox(id,day){
    setHabits(Habits.map((habit) => {
      if(habit.id === id){
        return {
          ...habit,Done:{
            ...habit.Done,[`${day}_done`]: !habit.Done[`${day}_done`]
          }
        };
      }
      return habit;
    }))
  }

  const deleteTask = (id) => {
    setTasks(Tasks.filter((task) => task.id !== id));
  };

  function addHabit(e) {
    e.preventDefault();
    setHabits([
      ...Habits,
      {
        id: crypto.randomUUID(),
        HabitName: newHabit,
        Done: {
          monday_done: false,
          tuesday_done: false,
          wednesday_done: false,
          thursday_done: false,
          friday_done: false,
          saturday_done: false,
          sunday_done: false,
        },
      },
    ]);
    setnewHabit("");
   
  }

  return (
    <>
      <h1 className="header">
        <u>
          <b>TO-DO LIST</b>
        </u>
      </h1>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="new-task">
          <label htmlFor="new-item" className="title">New Task : </label>
          <input
            value={newTask}
            onChange={(e) => setnewTask(e.target.value)}
            type="text"
            id="new-item"
            className="new-item"
            placeholder="Enter the Task"
          />
          <button className="btn">Add Task</button>
        </div>
      </form>

      <h1 className="header">Tasks</h1>

      <ul className="list">
        {Tasks.map((Task) => {
          return (
            <li key={Task.id} className="list-item">
              <label>
                <input
                  type="checkbox"
                  checked={Task.done}
                  onChange={() => toggleCheckbox(Task.id)}
                />
                {Task.taskname}
                <button
                  className="btn-del"
                  onClick={() => {
                    deleteTask(Task.id);
                  }}
                >
                  delete
                </button>
              </label>
            </li>
          );
        })}
      </ul>

      <hr></hr>

      <h1 className="header">
        <b>
          <u>Habit Tracker</u>
        </b>
      </h1>

      <form className="new-item-form">
        <div className="new-habit">
          <label htmlFor="new-item" className="title">New Habit : </label>
          <input
            value={newHabit}
            onChange={(e) => setnewHabit(e.target.value)}
            type="text"
            id="new-item"
            className="new-item"
            placeholder="Enter the Habit"
          />
        </div>
      </form>
      <br />
      <br />

      <table className="timetable">
        <thead>
          <tr>
            <th>
              Day
              <br />
              Habit
            </th>
            <th>MONDAY</th>
            <th>TUESDAY</th>
            <th>WEDNESDAY</th>
            <th>THURSDAY</th>
            <th>FRIDAY</th>
            <th>SATURDAY</th>
            <th>SUNDAY</th>
          </tr>
        </thead>
        <tbody>
          {Habits.map((habit) => {
            return (
              <tr key={habit.id}>
                <th>
                  <label>{habit.HabitName}</label>
                </th>
                <td>
                  <input type="checkbox" checked={habit.monday_done} onChange={() => toggleHabitcheckbox(habit.id,"monday")} />
                </td>
                <td>
                  <input type="checkbox" checked={habit.tuesday_done} onChange={() => toggleHabitcheckbox(habit.id,"tuesday")} />
                </td>
                <td>
                  <input type="checkbox" checked={habit.friday_done} onChange={() => toggleHabitcheckbox(habit.id,"wednesday")} />
                </td>
                <td>
                  <input type="checkbox" checked={habit.thursday_done} onChange={() => toggleHabitcheckbox(habit.id,"thursday")} />
                </td>
                <td>
                  <input type="checkbox" checked={habit.friday_done} onChange={() => toggleHabitcheckbox(habit.id,"friday")} />
                </td>
                <td>
                  <input type="checkbox" checked={habit.saturday_done} onChange={() => toggleHabitcheckbox(habit.id,"saturday")} />
                </td>
                <td>
                  <input type="checkbox" checked={habit.sunday_done} onChange={() => toggleHabitcheckbox(habit.id,"sunday")} />
                </td>
              </tr>
            );
          })}
          {/* <tr>
            <th>Reading</th>
            <td><input type="checkbox"/></td>
            <td><input type="checkbox"/></td>
            <td><input type="checkbox"/></td>
            <td><input type="checkbox"/></td>
            <td><input type="checkbox"/></td>
            <td><input type="checkbox"/></td>
            <td><input type="checkbox"/></td>
          </tr> */}
          <tr>
            <td>
              <button className="btn-habit" onClick={addHabit}>
                Add Habit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
