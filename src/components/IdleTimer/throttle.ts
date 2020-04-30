export const throttle = (callback: () => void, limit: number) => {
    let tick = false;
    return function() {
        if (!tick) {
            callback();
            tick = true;
            setTimeout(function() {
                tick = false;
            }, limit);
        }
    };
};
