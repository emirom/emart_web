import { useEffect, useState } from "react";

interface TimerLineProps {
  initialTime: number;
}

const TimerLine = ({ initialTime }: TimerLineProps) => {
  const [time, setTime] = useState(initialTime);
  const [duration, setDuration] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    const toPersian = (num: string) =>
      num.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

    return `${toPersian(hours)}:${toPersian(minutes)}:${toPersian(secs)}`;
  };

  const progress = ((duration - time) / duration) * 100;

  return (
    <div
      className="timer-container relative w-full h-8"
      role="timer"
      aria-live="polite"
    >
      <div
        className="absolute top-0 left-0 h-1 bg-gray-300 w-full rounded-lg overflow-hidden"
        style={{
          width: `${100 - progress}%`,
        }}
      />
      <div
        className="absolute top-0 left-0 h-1 bg-red-600"
        style={{
          width: `${progress}%`,
        }}
      />
      <div className="timer-text text-sm text-end font-bold text-red-600 pt-2">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default TimerLine;
