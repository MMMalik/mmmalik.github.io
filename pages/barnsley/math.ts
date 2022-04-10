const f1 = (_: number, y: number): [number, number] => [0, 0.16 * y];

const f2 = (x: number, y: number): [number, number] => [
    0.85 * x + 0.04 * y,
    -0.04 * x + 0.85 * y + 1.6
];

const f3 = (x: number, y: number): [number, number] => [
    0.2 * x - 0.26 * y,
    0.23 * x + 0.22 * y + 1.6
];

const f4 = (x: number, y: number): [number, number] => [
    -0.15 * x + 0.28 * y,
    0.26 * x + 0.24 * y + 0.44
];

const random = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

const next = (x: number, y: number) => {
    const r = random(1, 100);

    if (r === 1) {
        return f1(x, y);
    } else if (r > 1 && r <= 86) {
        return f2(x, y);
    } else if (r > 86 && r <= 93) {
        return f3(x, y);
    }

    return f4(x, y);
};

export const getVertices = (iterations: number) => {
    const vertices = [];

    let x = 0;
    let y = 0;

    const n = 200;
    const n2 = n / 2;

    for (let i = 0; i < iterations; i++) {
        let [nextX, nextY] = next(x, y);

        vertices.push(nextX * n - n2, nextY * n - n2, 0);

        x = nextX;
        y = nextY;
    }

    return vertices;
};
