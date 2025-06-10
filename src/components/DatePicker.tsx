interface DatePickerProps {
  date: string | undefined;
  onDateChange: (newDate: string) => void;
}

export const DatePicker = ({ date, onDateChange }: DatePickerProps) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-800 p-1 rounded-xl shadow-lg shadow-purple-900/40 hover:shadow-indigo-500/50 transition duration-300">
        <input
          type="date"
          value={date ?? today}
          onChange={(e) => onDateChange(e.target.value)}
          max={today}
          className="px-4 py-2 rounded-lg bg-black/60 text-white border-purple-400 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-md transition-all duration-300 font-mono text-sm cursor-pointer"
        />
      </div>
    </div>
  );
};
