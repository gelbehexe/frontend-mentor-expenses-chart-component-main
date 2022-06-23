/**
 * @param {number} [timeout=300]
 * @returns {(function(function, ...[*]): void)|*}
 */
export default function useDebounce(timeout = 300) {
    let timer;
    return (cb, ...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            cb.apply(this, args);
        }, timeout);
    };
}
