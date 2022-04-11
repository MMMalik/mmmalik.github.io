import * as React from 'react';
import { clsx } from '../../utils';

const colors = {
    primary: 'bg-violet-500 hover:bg-violet-600 text-gray-100',
    secondary: 'bg-gray-100 hover:bg-gray-200'
};

const Button: React.FC<Props> = ({ children, color = 'primary', ...props }) => {
    return (
        <button
            className={clsx(
                'transition-colors rounded-md p-2 uppercase h-10',
                colors[color]
            )}
            {...props}
        >
            {children}
        </button>
    );
};

type ReactBtnProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

interface Props extends ReactBtnProps {
    children: React.ReactNode;
    color?: keyof typeof colors;
}

export default Button;
