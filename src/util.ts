// Helper for avoiding races with browser startup
export function init_browser(x: any) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // Raced with DOMContentLoaded; just do it directly
        x();
    } else {
        document.addEventListener('DOMContentLoaded', x);
    }
}