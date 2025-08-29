class TransactionRequest {
    constructor() {
        this.txn_hash = '';
        this.cryptocurrency = '';
        this.start_date = '';
        this.end_date = '';
        this.status = '';
        this.per_page = 10;
        this.page = '';

    }
    toQueryString() {
        return Object.entries(this)
            .filter(([_, v]) => v !== null && v !== '') // skip null and empty
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&');
    }

}

export default TransactionRequest;
