interface ChoiceChipsProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

// Deretan pilihan yang bisa diketuk. Pilihan yang aktif berwarna hijau.
const ChoiceChips = ({ options, value, onChange }: ChoiceChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <div
          key={option}
          onClick={() => onChange(option)}
          className={`cursor-pointer rounded-full px-4 py-1.5 text-xs ${
            value === option
              ? 'bg-emerald-700 text-white'
              : 'border border-gray-200 bg-white text-gray-600'
          }`}
        >
          {option}
        </div>
      ))}
    </div>
  )
}

export default ChoiceChips