import { useState } from 'react';

export default function QuizQuestionCard({ questionData, onOptionSelect }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = questionData.options;
    const question = questionData.text;

    const handleOptionClick = (optionIndex) => {
        if (selectedOption === optionIndex) {
            setSelectedOption(null);
            onOptionSelect(null);
        } else {
            // Otherwise, select the clicked option
            setSelectedOption(optionIndex);
            onOptionSelect(optionIndex);
        }        
    };

    return (
        <div className="bg-blue-300 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 bg-blue-400 px-4 py-2 rounded-lg">
                {question}
            </h2>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        className={`w-full px-4 py-2 rounded-lg transition-colors duration-300 ${
                            selectedOption === index
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-blue-200 hover:text-blue-700'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
