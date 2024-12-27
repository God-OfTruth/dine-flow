import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_HREF } from 'app/utils/base-url.service';
import {
    catchError,
    Observable,
    of,
    switchMap,
    throwError,
} from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private api_base = inject(API_BASE_HREF);
    private _inProgress: boolean = false;
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(form: any): Observable<any> {
        return this._httpClient.post(`${this.api_base}api/auth/reset-password`, form);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: {
        username: string;
        password: string;
        rememberme: boolean;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError(() => 'User is already logged in.');
        }
        return this._httpClient.post(`${this.api_base}api/auth/login`, credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;
                // this.refreshToken = response.data.refresh_token;
                // Set the authenticated flag to true
                this._authenticated = true;
                // Return a new observable with the response
                return of(response);
            })
        );
    }
    private authenticate(credentials: {
        username: string;
        password: string;
        rememberme: boolean;
        otp: string;
    }) {
        if (this._inProgress) {
            return of(null);
        }

        this._inProgress = true;
        return this._httpClient
            .post(this.api_base + 'api/auth/login', credentials, {
                withCredentials: true,
            })
            .pipe(
                switchMap(() => {
                    console.log('STARTER 1');
                    this._inProgress = false;
                    this._authenticated = true;
                    return this.signIn(credentials);
                }),
                catchError((err) => {
                    console.log('STARTER 2');
                    this._inProgress = false;
                    return of(err);
                })
            );
    }
    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient
            .post('api/auth/sign-in-with-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(redirect?: boolean): Observable<any> {
        this._httpClient
            .post(
                this.api_base + 'api/logout',
                {},
                { withCredentials: true }
            )
            .subscribe({
                next: () => {
                    localStorage.setItem('loginFlag', 'false');
                    sessionStorage.clear();
                },
                error: () => {
                    localStorage.setItem('loginFlag', 'false');
                    sessionStorage.clear();
                },
            });
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        username: string;
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post(`${this.api_base}api/auth/register`, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        return this._userService.get().pipe(
            catchError((_) => of({ error: true })),
            switchMap((d: any) => {
                if (d.error) {
                    return of(false);
                }
                this._authenticated = true;
                return of(true);
            })
        );
    }
}
