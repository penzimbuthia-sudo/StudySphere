import { Play, Pause, RotateCcw, StopCircle, Check } from "lucide-react";
import Button from "./Button";
import { formatTime } from "../hooks/useTimer";


export default function TimerCircle({
  timeLeft,
  running,
  startedAt,
  ended,
  label,
  setLabel,
  circumference,
  progress,
  onStart,
  onPause,
  onReset,
  onEnd,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-gray-100 flex flex-col items-center gap-5">
      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold tracking-wide">
        Pomodoro (25/5)
      </span>

      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        disabled={!!startedAt}
        placeholder="Session label…"
        className="text-center text-sm border border-gray-200 rounded-lg px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-50 disabled:text-gray-400 font-medium"
      />

      <div className="relative w-48 h-48 sm:w-60 sm:h-60">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <circle cx="120" cy="120" r="100" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle
            cx="120" cy="120" r="100" fill="none"
            stroke="#6366f1" strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            transform="rotate(-90 120 120)"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-sm text-gray-400 mt-1 font-medium">Focus Time</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 w-full justify-center flex-wrap">
        {!running ? (
          <Button variant="timer" size="lg" onClick={onStart} className="flex-1 max-w-36">
            <Play size={17} fill="white" /> Start
          </Button>
        ) : (
          <Button variant="secondary" size="lg" onClick={onPause} className="flex-1 max-w-36">
            <Pause size={17} /> Pause
          </Button>
        )}
        <Button variant="secondary" size="lg" onClick={onReset}>
          <RotateCcw size={17} /> Reset
        </Button>
        {startedAt && (
          <Button variant="danger" size="lg" onClick={onEnd}>
            <StopCircle size={17} /> End
          </Button>
        )}
      </div>

      {ended && (
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl text-sm font-semibold w-full justify-center">
          <Check size={15} /> Session complete! Click End to save it.
        </div>
      )}

      <div className="bg-indigo-50 rounded-xl p-4 flex items-start gap-3 w-full border border-indigo-100">
        <span className="text-2xl shrink-0">🌱</span>
        <div>
          <p className="text-sm font-bold text-indigo-800">Stay focused, stay consistent,</p>
          <p className="text-sm text-indigo-600 font-medium">and success will follow. You've got this! 💪</p>
        </div>
      </div>
    </div>
  );
}
