/**
 * @param {string} url
 * @returns {Promise<JSON>}
 */
function fetchData(url) {
    return fetch(url).then((res) => res.json());
}

/**
 * @typedef {Object} Item
 * @property {string} day
 * @property {number} amount
 *
 * @param {Item[]} items
 */
function applyData(items) {
    // calculate 100% ≙ max amount
    const max = items.reduce((carry, item) => Math.max(carry, item.amount), 0);

    // get current day name
    const today = new Date()
        .toLocaleDateString("en-US", { weekday: "short" })
        .toLocaleLowerCase();

    // setting item values
    items.forEach((item) => {
        const amountFormatted = `$${item.amount}`;
        const percent = Math.round((item.amount / max) * 100);
        const el = document.querySelector(
            `.graph__day[data-label="${item.day}"]`
        );
        el.setAttribute("data-value", amountFormatted);
        el.toggleAttribute("data-current", item.day === today);
        el.style.setProperty("--amount-percent", `${percent}%`);
    });
}

/**
 * @param {string} url * @returns {Promise<void>}
 */
export default function loadData(url) {
    return new Promise((resolve, reject) => {
        fetchData(url)
            .then((res) => {
                applyData(res);
                resolve();
            })
            .catch((err) => reject(err));
    });
}
