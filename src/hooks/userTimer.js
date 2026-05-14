import { useState, useEffect, useRef } from "react";

const API = "http://localhost:3001";
const POMODORO = 25 * 60;

export function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function useTimer() {
  const [sessions, setSessions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(POMODORO);
  const [running, setRunning] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [label, setLabel] = useState("Focus Session");
  const [ended, setEnded] = useState(false);

  const intervalRef = useRef(null);

  // Fetch sessions
  const fetchSessions = async () => {
    const response = await fetch(`${API}/sessions`);
    const data = await response.json();
    setSessions(data);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);

            setRunning(false);
            setEnded(true);

            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  // Start timer
  const handleStart = () => {
    if (!startedAt) {
      setStartedAt(new Date().toISOString());
    }

    setRunning(true);
    setEnded(false);
  };

  // Pause timer
  const handlePause = () => {
    setRunning(false);
  };

  // Reset timer
  const handleReset = () => {
    setRunning(false);
    setTimeLeft(POMODORO);
    setStartedAt(null);
    setEnded(false);
  };

  // End and save session
  const handleEnd = async () => {
    setRunning(false);

    const endedAt = new Date().toISOString();

    const duration = POMODORO - timeLeft;

    if (duration < 1) return;

    const sessionData = {
      label,
      duration,
      startedAt: startedAt || endedAt,
      endedAt,
    };

    await fetch(`${API}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionData),
    });

    await fetchSessions();

    // Reset
    setTimeLeft(POMODORO);
    setStartedAt(null);
    setEnded(false);
  };

  const circumference = 2 * Math.PI * 100;

  const progress =
    ((POMODORO - timeLeft) / POMODORO) * circumference;

  const todaySessions = sessions.filter(
    (s) =>
      s.startedAt &&
      new Date(s.startedAt).toDateString() ===
        new Date().toDateString()
  );

  return {
    sessions,
    timeLeft,
    running,
    startedAt,
    label,
    setLabel,
    ended,
    circumference,
    progress,
    todaySessions,
    handleStart,
    handlePause,
    handleReset,
    handleEnd,
    POMODORO,
  };
}