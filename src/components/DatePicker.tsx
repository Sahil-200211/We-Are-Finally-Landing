interface DatePickerProps {
    date: string | undefined;
    onDateChange: (newDate: string) => void;
}

export const DatePicker = ({date, onDateChange}: DatePickerProps) => {
    return (
        <div className="flex justify-center mb-4 space-x-4">
            <input
             type="date"
             value={date ?? ' '}
             onChange={(e) => onDateChange(e.target.value)}
             className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
             max={new Date().toISOString().split('T')[0]}
            />
        </div>
    );
};