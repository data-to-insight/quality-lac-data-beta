import * as Sentry from "@sentry/react";

const _init = () => {
    const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
    if (!SENTRY_DSN) {
        return;
    }
    Sentry.init({
        dsn: SENTRY_DSN,
    });
}

export const init = () => {
    try {
        _init()
    } catch {
        console.error("Failed to initialise Sentry")
    }
}

export const captureException = (err, context) => {
    try {
        Sentry.captureException(err, context);
    } catch {
    }
}