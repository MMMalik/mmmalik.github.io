import * as React from 'react';

const Slider: React.FC<Props> = ({ initValue, max, min, onChange, step }) => {
    const [value, setValue] = React.useState(String(initValue));

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = evt.currentTarget.value;
        setValue(nextValue);
        onChange(nextValue);
    };

    return (
        <input
            className="w-full h-2 bg-blue-100 appearance-none cursor-pointer"
            type="range"
            min={min}
            max={max}
            onChange={handleChange}
            step={step}
            value={value}
        />
    );
};

interface Props {
    initValue: number;
    max: number;
    min: number;
    onChange: (value: string) => void;
    step: number;
}

export default Slider;
