const TradingView = require("@mathieuc/tradingview");

const ChartTradingViewController = {
    historyChart: async (req, res) => {
        try {
            const exchange = req.query.exchange;
            const symbol = req.query.symbol || "SSI";
            const fromDate = req.query.from || 0;
            const toDate = req.query.to || new Date().getTime();
            let resol = "1";
            let ranged = parseInt((toDate - fromDate));
            const resolution = req.query.resolution || "D";
            if (parseFloat(resolution) >= 60) {
                resol = "H";
            }
            if (resolution.search("D") >= 0) {
                resol = "D"
            }
            if (resolution.search("W") >= 0) {
                resol = "W"
            }
            if (resolution.search("M") >= 0) {
                resol = "M"
            }
            if (resol != "1") {
                ranged = parseInt((toDate - fromDate)/60);
            } 
            const client = new TradingView.Client();
            const chart = new client.Session.Chart();
            chart.setTimezone('Asia/Ho_Chi_Minh');
            chart.setMarket(symbol, {
                timeframe: resol,
                to: toDate * 1000,
                from: fromDate * 1000,
                range: ranged
            });
            chart.onUpdate(() => { // When price changes
                if (!chart.periods[0]) return;
                const data = chart.periods.reverse();
                res.json({code: 200, data: data});
            });
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    searchSymbol: async (req, res) => {
        try {
            let symbolName = req.query.symbol || "";
            if (symbolName.search(":") >= 0) {
                symbolName = symbolName.split(":")[1];
            }
            TradingView.searchMarket(symbolName).then((rs) => {
                let allSymbols = [];
                rs.forEach(symbol => {
                    allSymbols = [...allSymbols, {
                        symbol: symbol.symbol,
                        pro_name: symbol.symbol,
                        full_name: symbol.id,
                        description: symbol.description,
                        exchange: symbol.exchange,
                        type: symbol.type,
                        pathRq: symbol.pathRq,
                        id: symbol.id,
                        unitId: symbol.id,
                        fullExchange: symbol.fullExchange,
                        getTA: symbol.getTA,
                        currency_code: symbol.id,
                        extension: {
                            unitId: symbol.id,
                            currencyCode: symbol.id
                        }
                    }];
                });
                res.json({ code: 200, data: allSymbols });
            });
        } catch (err) {
            res.json({ code: 500, error: err });
        }

    },
    getTemplate: async (req, res) => {
        try {

        } catch (err) {
            res.json({ code: 500, error: err });
        }
    }
}
module.exports = ChartTradingViewController;