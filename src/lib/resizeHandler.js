import { useDebounce } from "./utilities";

export default function resizeHandler() {
    const attributionEl = document.querySelector(".attribution");
    if (!attributionEl) {
        console.warn(".attribution element not found");
    }

    const debounce = useDebounce();

    const updateAttributionHeight = function () {
        const height = Math.ceil(attributionEl.getBoundingClientRect().height);
        document.documentElement.style.setProperty(
            "--attribution-height",
            `${height}px`
        );
    };

    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            if (entry.target === attributionEl) {
                debounce(() => updateAttributionHeight());
            }
        }
    });

    resizeObserver.observe(attributionEl);
}
