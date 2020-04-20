export class ContextService {
    getToken() {
        return localStorage.getItem('access_token');
    }

    getUserId() {
        return localStorage.getItem('user_id');
    }
}