'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isEditing, setIsEditing] = useState(true);
  const [isRunning, setIsRunning] = useState<Boolean | null>(null);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const handleReset = () => {
    setTimer({ hours: 0, minutes: 0, seconds: 0 });
    setIsEditing(!isEditing);
    setIsRunning(null);
  };

  const handleStart = () => {
    if (timer.hours !== 0 || timer.minutes !== 0 || timer.seconds !== 0) {
      setIsRunning(true);
      setIsEditing(!isEditing);
    } else {
      window.alert('Add time');
    }
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  //to grant notification permission
  function notifyMe() {
    if (!('Notification' in window)) {
      // Check if the browser supports notifications
      alert('This browser does not support desktop notification');
    } else if (Notification.permission !== 'denied') {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          const notification = new Notification(
            'Welcome! You will now recieve notifications for Countdown Timer.'
          );
        }
      });
    }
  }

  useEffect(() => {
    notifyMe();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => {
        if (timer.seconds > 0) {
          setTimer({ ...timer, seconds: timer.seconds - 1 });
        } else if (timer.minutes > 0) {
          setTimer({ ...timer, minutes: timer.minutes - 1, seconds: 59 });
        } else if (timer.hours > 0) {
          setTimer({ hours: timer.hours - 1, minutes: 59, seconds: 59 });
        }
      }, 1000);
      if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
        handleReset();
        if (Notification.permission === 'granted') {
          new Notification('Timer complete!');
        } else {
          alert('Timer Complete!');
        }
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timer.hours, timer.minutes, timer.seconds]);

  return (
    <main className='flex flex-col items-center justify-center w-screen'>
      <h1 className='text-3xl font-bold mt-8'>Countdown Timer</h1>
      <div className='flex justify-center items-center text-center mt-16 w-full'>
        {isEditing ? (
          <>
            <label htmlFor='hours' hidden>
              hours
            </label>
            <input
              id='hours'
              type='number'
              placeholder='HH'
              className='w-16 border border-black p-1'
              onChange={(e) =>
                setTimer({ ...timer, hours: Number(e.target.value) })
              }
            />
            <p className='px-3'>:</p>
            <label htmlFor='minutes' hidden>
              minutes
            </label>
            <input
              id='minutes'
              type='number'
              placeholder='MM'
              className='w-16 border border-black p-1'
              onChange={(e) =>
                setTimer({ ...timer, minutes: Number(e.target.value) })
              }
            />
            <p className='px-3'>:</p>
            <label htmlFor='secounds' hidden>
              seconds
            </label>
            <input
              id='seconds'
              type='number'
              placeholder='SS'
              className='w-16 border border-black p-1'
              onChange={(e) =>
                setTimer({ ...timer, seconds: Number(e.target.value) })
              }
            />
            <div className='ml-3'>
              <button
                className='border border-black px-2 py-1'
                onClick={handleStart}
              >
                Start
              </button>
            </div>
          </>
        ) : (
          <>
            <p className='w-14 p-1'>
              {timer.hours.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </p>
            <p>:</p>
            <p className='w-14 p-1'>
              {timer.minutes.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </p>
            <p>:</p>
            <p className='w-14 p-1'>
              {timer.seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </p>
            <div className='flex items-center'>
              <button
                className='border border-black px-2 py-1'
                onClick={handlePause}
              >
                {isRunning ? 'Pause' : 'Resume'}
              </button>
              <button
                className='border border-black px-2 py-1 ml-2'
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
