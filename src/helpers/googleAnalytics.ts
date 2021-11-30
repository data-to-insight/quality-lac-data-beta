export const analyticsInit = () => {
    const measurementID = process.env.REACT_APP_GA_MEASUREMENT_ID;
    if (!measurementID) {
        return;
    }

    const id = `ga-script-include`;
    const existing = document.getElementById(id);
    if (!existing) {
        const script = document.createElement('script');
        script.id = id;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementID}`
        document.head.append(script);
        const dlScript = document.createElement('script');
        dlScript.innerHTML = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementID}')`
        document.head.append(dlScript);
    }
}

export const gtag = (...args: any[]) => {
    window.gtag && window.gtag(...args);
}

export const pageview = () => {
    gtag('pageview');
}

export const event = (action: string, event_category: string, event_label?: string, value?: bigint) => {
    gtag('event', action, {event_category, event_label, value});
}