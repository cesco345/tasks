import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReminderList from "./components.tsx/ReminderList";
import Reminder from "./models/Reminder";
import reminderService from "./services/Reminder";
import NewReminder from "./components.tsx/NewReminder";
import { title } from "process";

function App() {
  const [reminders, setReminders] = React.useState<Reminder[]>([]);
   useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await reminderService.getReminders();
    setReminders(reminders);
  }
  const removeReminder = (id: number) => {
   setReminders(reminders.filter(reminder =>reminder.id !== id));
  }

   const addReminder = async (title: string) => {
   const newReminder = await reminderService.addReminder(title);
   setReminders([ newReminder, ...reminders ]);
    
  }


  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder} />
      <ReminderList items={reminders} onRemoveReminder={removeReminder} />

    </div>
  );
}

export default App;
