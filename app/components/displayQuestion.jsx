function Question({ questionData }) {
    const options = questionData[0];
    const question = questionData[1];

    return (
        <div>
            <h2>{question}</h2>
            {options.map((option, index) => (
                <div key={index}>
                    <input type="radio" id={`option-${index}`} name="option" value={option} />
                    <label htmlFor={`option-${index}`}>{option}</label>
                </div>
            ))}
        </div>
    );
}