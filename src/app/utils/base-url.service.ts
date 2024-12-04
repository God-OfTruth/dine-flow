import { InjectionToken } from '@angular/core';
import { environment } from 'environments/environment.development';

export const API_BASE_HREF = new InjectionToken<string>('/');

export function getBaseLocation(locale: string): string {
    const path = new URL(document.baseURI);
    if (environment.pathBasedRouting) {
        const segs = path.pathname.split('/');
        const tenant = segs[1];
        const lang = segs[2];
        return '/' + tenant + '/' + lang + '/';
    } else {
        return path.pathname;
    }
}

// /tttt/nnn/ = 4 segs
export function getApiBase(locale: string): string {
    const path = new URL(document.baseURI);
    const segs = path.pathname.split('/');
    if (environment.pathBasedRouting) {
        const tenant = segs[1];
        return '/' + tenant + '/';
    } else {
        if (segs.length <= 3) {
            return '/';
        } else {
            console.log('Here: ', segs);
            const tenant = segs[1];
            return '/' + tenant + '/';
        }
    }
}
