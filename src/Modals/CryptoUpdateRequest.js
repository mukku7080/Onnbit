class CryptoUpdateRequest {
    constructor() {
        this.cryptoAd_id = null;
        this.min_trade_limit = null;
        this.max_trade_limit = null;
        this.offer_margin = null;
        this.offer_time_limit = null;
    }

    toJSON() {
        return {
            cryptoAd_id: this.cryptoAd_id,
            min_trade_limit: this.min_trade_limit,
            max_trade_limit: this.max_trade_limit,
            offer_margin: this.offer_margin,
            offer_time_limit: this.offer_time_limit,
        };
    }
}

export default CryptoUpdateRequest;
