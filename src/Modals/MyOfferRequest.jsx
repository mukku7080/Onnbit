class MyOfferRequest {
    constructor() {
        this.txn_type = 'sell';
        this.is_active = null;
        this.cryptocurrency = null;
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

export default MyOfferRequest;

