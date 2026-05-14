import { useTimer } from "../hooks/useTimer";
import PageHeader from "../components/PageHeader";
import TimerCircle from "../components/TimerCircle";
import SessionHistory from "../components/SessionHistory";

export default function Timer() {
  const {
    sessions,
    timeLeft,
    running,
    startedAt,
    label, setLabel,
    ended,
    circumference,
    progress,
    todaySessions,
    handleStart,
    handlePause,
    handleReset,
    handleEnd,
  } = useTimer();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Study Timer"
        subtitle="Use the Pomodoro technique to stay focused and track your sessions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
        <TimerCircle
          timeLeft={timeLeft}
          running={running}
          startedAt={startedAt}
          ended={ended}
          label={label}
          setLabel={setLabel}
          circumference={circumference}
          progress={progress}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onEnd={handleEnd}
        />
        <SessionHistory sessions={sessions} todaySessions={todaySessions} />
      </div>
    </div>
  );
}

