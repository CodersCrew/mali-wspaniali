export const throttle = (callback: () => void, limit: number) => {
    let tick = false;
    return () => {
        if (!tick) {
            callback();
            tick = true;
            setTimeout(() => {
                tick = false;
            }, limit);
        }
    };
};
