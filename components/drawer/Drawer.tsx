import * as React from 'react';
import { clsx } from '../../utils';
import Button from '../button';
import { CloseIcon, MenuIcon } from '../icons';

const common = 'fixed z-10';

const Drawer: React.FC<Props> = ({
    actions,
    children,
    open,
    title,
    toggle
}) => {
    return (
        <>
            <div
                className={clsx(
                    common,
                    'flex flex-col justify-between overflow-y-auto h-full p-5 w-full lg:w-1/3 bg-gray-100',
                    open ? 'right-0' : '-right-full -lg:right-1/3'
                )}
            >
                <h4 className="text-xl uppercase">{title}</h4>
                <div className="flex-1 mt-8">{children}</div>
                <div className="flex justify-end gap-2">{actions}</div>
            </div>
            <div className={clsx(common, 'm-3 right-0')}>
                <Button color="secondary" onClick={toggle}>
                    {open ? <CloseIcon /> : <MenuIcon />}
                </Button>
            </div>
        </>
    );
};

interface Props {
    actions?: React.ReactNode;
    children?: React.ReactNode;
    open?: boolean;
    title?: string;
    toggle?: () => void;
}

export default Drawer;
