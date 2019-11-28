// Helper for avoiding races with browser startup
export function init_browser(x: any) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // Raced with DOMContentLoaded; just do it directly
        x();
    } else {
        document.addEventListener('DOMContentLoaded', x);
    }
}

export class Logger {
    startTime?: number;

    install(): Logger {
        let c = document.getElementById('console') as HTMLElement;
        let scroll = document.getElementById('scroll') as HTMLElement;

        let log = function() {
            return;
        };
        if ('console' in window && 'log' in window['console']) {
            log = console.log;
        }

        let append = (args: []) => {
            let elapsed = 0;
            if (this.startTime) {
                const millis = Date.now() - this.startTime;
                elapsed = millis;
            }
            let elapsedStr = elapsed.toString().padStart(4, '0');
            let elapsedSeconds = elapsedStr.substr(0, elapsedStr.length - 3);
            let elapsedMillis = elapsedStr.substr(elapsedStr.length - 3);
            c.textContent += `[${elapsedSeconds.padStart(3, ' ')}.${elapsedMillis}] `;

            for (let i = 0; i < args.length; i++) {
                c.textContent += args[i] + ' ';
            }
            c.textContent += '\n';
        };

        console.log = function(...args: []) {
            append(args);
            log.apply(this, args);
            scroll.scrollIntoView(false);
        };

        return this;
    }

    startTimer() {
        this.startTime = Date.now();
    }
}
