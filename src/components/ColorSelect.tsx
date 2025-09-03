'use client'

import {useState} from 'react'
import {ChevronDown} from 'lucide-react'

export interface ColorOption {
    value: string
    label: string
    color: string
}

const colorOptions: ColorOption[] = [
    {value: '000', label: '000 (Rakı Beyazı)', color: '#F8F8FF'},
    {value: '001', label: '001', color: '#FFFEF7'},
    {value: '002', label: '002', color: '#FFF8DC'},
    {value: '003', label: '003', color: '#F5F5DC'},
    {value: '004', label: '004', color: '#FAF0E6'},
    {value: '005', label: '005', color: '#FDF5E6'},
    {value: '006', label: '006', color: '#FFEFD5'},
    {value: '007', label: '007', color: '#FFE4B5'},
    {value: '009', label: '009', color: '#FFDAB9'},
    {value: '010', label: '010', color: '#FFE4C4'},
    {value: '011', label: '011', color: '#FFEBCD'},
    {value: '013', label: '013', color: '#F5DEB3'},
    {value: '014', label: '014', color: '#DEB887'},
    {value: '015', label: '015', color: '#D2B48C'},
    {value: '016', label: '016', color: '#BC9A6A'},
    {value: '017', label: '017', color: '#A0826D'},
    {value: '018', label: '018', color: '#8B7355'},
    {value: '019', label: '019', color: '#696969'},
    {
        value: 'milky-white',
        label: 'Milky White (Kemik Beyazı)',
        color: '#FFF8DC'
    },
    {value: 'transparent', label: 'Transparent', color: 'transparent'},
    {value: 'white', label: 'White', color: '#FFFFFF'}
]

interface ColorSelectProps {
    onColorChange?: (color: ColorOption | null) => void
    selectedColor?: ColorOption | null
}

export default function ColorSelect({
    onColorChange,
    selectedColor
}: ColorSelectProps = {}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<ColorOption | null>(
        selectedColor || null
    )

    const handleSelect = (option: ColorOption) => {
        setSelectedOption(option)
        setIsOpen(false)
        onColorChange?.(option)
    }

    return (
        <div className="w-full flex items-center justify-between gap-2">
            <div className="relative w-full">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full h-9 px-3 rounded-md border bg-white flex items-center justify-between gap-2 text-left">
                    {selectedOption ? (
                        <div className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded border border-gray-300 flex-shrink-0"
                                style={{
                                    backgroundColor:
                                        selectedOption.color === 'transparent'
                                            ? '#fff'
                                            : selectedOption.color,
                                    backgroundImage:
                                        selectedOption.color === 'transparent'
                                            ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                                            : 'none',
                                    backgroundSize:
                                        selectedOption.color === 'transparent'
                                            ? '8px 8px'
                                            : 'auto',
                                    backgroundPosition:
                                        selectedOption.color === 'transparent'
                                            ? '0 0, 0 4px, 4px -4px, -4px 0px'
                                            : 'auto'
                                }}
                            />
                            <span className="text-sm truncate">
                                {selectedOption.label}
                            </span>
                        </div>
                    ) : (
                        <span className="text-gray-500 text-sm">
                            Numaranızı Seçiniz
                        </span>
                    )}
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                        {colorOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option)}
                                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm">
                                <div
                                    className="w-4 h-4 rounded border border-gray-300 flex-shrink-0"
                                    style={{
                                        backgroundColor:
                                            option.color === 'transparent'
                                                ? '#fff'
                                                : option.color,
                                        backgroundImage:
                                            option.color === 'transparent'
                                                ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                                                : 'none',
                                        backgroundSize:
                                            option.color === 'transparent'
                                                ? '8px 8px'
                                                : 'auto',
                                        backgroundPosition:
                                            option.color === 'transparent'
                                                ? '0 0, 0 4px, 4px -4px, -4px 0px'
                                                : 'auto'
                                    }}
                                />
                                <span className="truncate">{option.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
