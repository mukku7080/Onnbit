class NotificationRequest {
    constructor() {
        this.status = null;
        this.start_date = null;
        this.end_date = null;
        this.per_page = 10;
        this.page = '';
    }

    toQueryString() {
        return Object.entries(this)
            .filter(([_, v]) => v !== null && v !== '') // remove null or empty
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&');
    }
}

export default NotificationRequest;
