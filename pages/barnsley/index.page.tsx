import * as React from 'react';
import { HexColorPicker } from 'react-colorful';
import type { NextPage } from 'next';
import Drawer from '../../components/drawer';
import Slider from '../../components/slider';
import { render, setup, setCameraZ, setSceneBg, Z_MAX } from './canvas';
import { getVertices } from './math';

const ITERATIONS_MIN = 0;
const ITERATIONS_MAX = 1000000;
const ITERATIONS_STEP = 100000;
const ITERATIONS_INIT = ITERATIONS_MAX / 2;

const ALPHA_MIN = 0.1;
const ALPHA_MAX = 1;
const ALPHA_STEP = 0.1;
const ALPHA_INIT = ALPHA_MAX / 2;

const ZOOM_MIN = 1;
const ZOOM_MAX = 100;
const ZOOM_STEP = 1;
const ZOOM_INIT = ZOOM_MAX / 2;

interface State {
    alpha: number;
    bgColor: string;
    color: string;
    iterations: number;
    open: boolean;
    zoom: number;
}

type Actions =
    | { type: 'alpha'; payload: number }
    | { type: 'bgColor'; payload: string }
    | { type: 'color'; payload: string }
    | { type: 'iterations'; payload: number }
    | { type: 'toggle' }
    | { type: 'zoom'; payload: number };

const initialState: State = {
    alpha: ALPHA_INIT,
    bgColor: '#ffffff',
    color: '#8b5cf6',
    iterations: ITERATIONS_INIT,
    open: false,
    zoom: ZOOM_INIT
};

const reducer = (state: State, action: Actions) => {
    switch (action.type) {
        case 'alpha':
            return { ...state, alpha: action.payload };
        case 'bgColor':
            return { ...state, bgColor: action.payload };
        case 'color':
            return { ...state, color: action.payload };
        case 'iterations':
            return { ...state, iterations: action.payload };
        case 'toggle':
            return { ...state, open: !state.open };
        case 'zoom':
            return { ...state, zoom: action.payload };
        default:
            throw new Error();
    }
};

const Barnsley: NextPage = () => {
    const [isPending, startTransition] = React.useTransition();
    const [container, setContainer] = React.useState<HTMLDivElement | null>(
        null
    );
    const [{ alpha, bgColor, color, iterations, open, zoom }, dispatch] =
        React.useReducer(reducer, initialState);

    const changeAlpha = (alpha: string) => {
        startTransition(() => {
            dispatch({ type: 'alpha', payload: parseFloat(alpha) });
        });
    };

    const changeBgColor = (color: string) => {
        startTransition(() => {
            dispatch({ type: 'bgColor', payload: color });
        });
    };

    const changeColor = (color: string) => {
        startTransition(() => {
            dispatch({ type: 'color', payload: color });
        });
    };

    const changeIterations = (nextIterations: string) => {
        startTransition(() => {
            dispatch({ type: 'iterations', payload: parseInt(nextIterations) });
        });
    };

    const changeZoom = (perc: string) => {
        startTransition(() => {
            dispatch({
                type: 'zoom',
                payload: parseInt(perc)
            });
        });
    };

    const toggle = () => {
        dispatch({ type: 'toggle' });
    };

    const iters = React.useDeferredValue(iterations);

    const vertices = React.useMemo(() => {
        return getVertices(iters);
    }, [iters]);

    const three = React.useMemo(() => {
        if (typeof window === 'undefined') {
            return;
        }
        return setup();
    }, []);

    React.useEffect(() => {
        if (!three || isPending) {
            return;
        }
        setCameraZ(three.camera, ((100 - zoom) / 100) * Z_MAX);
    }, [isPending, three, zoom]);

    React.useEffect(() => {
        if (!three || isPending) {
            return;
        }
        setSceneBg(three.scene, bgColor);
    }, [isPending, three, bgColor]);

    React.useEffect(() => {
        if (!three || isPending) {
            return;
        }
        const cleanup = render({ ...three, alpha, color, vertices });
        return () => {
            cleanup();
        };
    }, [alpha, color, container, isPending, three, vertices]);

    React.useEffect(() => {
        if (!container || !three) {
            return;
        }
        const element = three.renderer.domElement;
        container.appendChild(element);
        return () => {
            container.removeChild(element);
        };
    }, [container, three]);

    return (
        <div>
            <Drawer open={open} title={'Settings'} toggle={toggle}>
                <div className="mb-5">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xl">{'Iterations'}</h4>
                        <span>{iterations}</span>
                    </div>
                    <Slider
                        initValue={ITERATIONS_INIT}
                        max={ITERATIONS_MAX}
                        min={ITERATIONS_MIN}
                        onChange={changeIterations}
                        step={ITERATIONS_STEP}
                    />
                </div>
                <div className="mb-5">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xl">{'Alpha'}</h4>
                        <span>{alpha}</span>
                    </div>
                    <Slider
                        initValue={ALPHA_INIT}
                        max={ALPHA_MAX}
                        min={ALPHA_MIN}
                        onChange={changeAlpha}
                        step={ALPHA_STEP}
                    />
                </div>
                <div className="mb-5">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xl">{'Zoom'}</h4>
                        <span>{zoom}%</span>
                    </div>
                    <Slider
                        initValue={ZOOM_INIT}
                        max={ZOOM_MAX}
                        min={ZOOM_MIN}
                        onChange={changeZoom}
                        step={ZOOM_STEP}
                    />
                </div>
                <div className="flex justify-between mb-5">
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-xl">{'Fill Color'}</h4>
                        </div>
                        <HexColorPicker color={color} onChange={changeColor} />
                        <div>{color}</div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-xl">{'Background Color'}</h4>
                        </div>
                        <HexColorPicker
                            color={bgColor}
                            onChange={changeBgColor}
                        />
                        <div>{bgColor}</div>
                    </div>
                </div>
            </Drawer>
            <div ref={setContainer} />
        </div>
    );
};

export default Barnsley;
