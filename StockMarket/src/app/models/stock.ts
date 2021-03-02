export class Stock {
    constructor(
        public current: number,
        public last: number,
        public market: string,
        public price: number,
        public symbol: string
    ) { }
}
