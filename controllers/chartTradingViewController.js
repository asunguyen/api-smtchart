const TradingView = require("@mathieuc/tradingview");
const vn30 = [
    {
        typespecs: [
            "continuous",
            "synthetic"
        ],
        exchange: "HNX",
        country: "VN",
        currency_code: "VND",
        description: "VN301! INDEX FUTURES",
        provider_id: "ice",
        symbol: "VN301!",
        type: "futures",
        "pro_name": "VN301!",
        "full_name": "HNX:VN301!",
        "id": "HNX:VN301!",
        "unitId": "HNX:VN301!",
        "fullExchange": "HNX",
        "currency_code": "HNX:VN301!",
        "extension": {
            "unitId": "HNX:VN301!",
            "currencyCode": "HNX:VN301!"
        }
    },
    {
        typespecs: [
            "continuous",
            "synthetic"
        ],
        exchange: "HNX",
        country: "VN",
        currency_code: "VND",
        description: "VN302! INDEX FUTURES",
        provider_id: "ice",
        symbol: "VN302!",
        type: "futures",
        "pro_name": "VN302!",
        "full_name": "HNX:VN302!",
        "id": "HNX:VN302!",
        "unitId": "HNX:VN302!",
        "fullExchange": "HNX",
        "currency_code": "HNX:VN302!",
        "extension": {
            "unitId": "HNX:VN302!",
            "currencyCode": "HNX:VN302!"
        }
    },
    {
        symbol: "VN30X2023",
        exchange: "HNX",
        country: "VN",
        currency_code: "VND",
        description: "VN30X2023 INDEX FUTURES",
        provider_id: "ice",
        type: "futures",
        "pro_name": "VN30X2023",
        "full_name": "HNX:VN30X2023",
        "id": "HNX:VN30X2023",
        "unitId": "HNX:VN30X2023",
        "fullExchange": "HNX",
        "currency_code": "HNX:VN30X2023",
        "extension": {
            "unitId": "HNX:VN30X2023",
            "currencyCode": "HNX:VN30X2023"
        }
    },
    {
        symbol: "VN30Z2023",
        exchange: "HNX",
        country: "VN",
        currency_code: "VND",
        description: "VN30 INDEX FUTURES DEC 2023",
        provider_id: "ice",
        type: "futures",
        "pro_name": "VN30Z2023",
        "full_name": "HNX:VN30Z2023",
        "id": "HNX:VN30Z2023",
        "unitId": "HNX:VN30Z2023",
        "fullExchange": "HNX",
        "currency_code": "HNX:VN30Z2023",
        "extension": {
            "unitId": "HNX:VN30Z2023",
            "currencyCode": "HNX:VN30Z2023"
        }
    },
    {
        symbol: "VN30H2024",
        description: "VN30H2024 INDEX FUTURES MAR 2024",
        exchange: "HNX",
        country: "VN",
        currency_code: "VND",
        provider_id: "ice",
        type: "futures",
        "pro_name": "VN30H2024",
        "full_name": "HNX:VN30H2024",
        "id": "HNX:VN30H2024",
        "unitId": "HNX:VN30H2024",
        "fullExchange": "HNX",
        "currency_code": "HNX:VN30H2024",
        "extension": {
            "unitId": "HNX:VN30H2024",
            "currencyCode": "HNX:VN30H2024"
        }
    },
    {
        symbol: "VN30M2024",
        description: "VN30M2024 INDEX FUTURES JUN 2024",
        exchange: "HNX",
        country: "VN",
        currency_code: "VND",
        provider_id: "ice",
        type: "futures",
        "pro_name": "VN30M2024",
        "full_name": "HNX:VN30M2024",
        "id": "HNX:VN30M2024",
        "unitId": "HNX:VN30M2024",
        "fullExchange": "HNX",
        "currency_code": "HNX:VN30M2024",
        "extension": {
            "unitId": "HNX:VN30M2024",
            "currencyCode": "HNX:VN30M2024"
        }
    },
   
]
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
                ranged = parseInt((toDate - fromDate) / 60);
            }
            const client = new TradingView.Client();
            const chart = new client.Session.Chart();
            chart.setTimezone('Asia/Ho_Chi_Minh');
            chart.setMarket(exchange+ ":" + symbol, {
                timeframe: resol,
                to: toDate * 1000,
                from: fromDate * 1000,
                range: ranged
            });
            chart.onUpdate(() => { // When price changes
                if (!chart.periods[0]) return;
                const data = chart.periods.reverse();
                res.json({ code: 200, data: data });
            });
            chart.onError((...err) => { // Listen for errors (can avoid crash)
                chart.setMarket(symbol, {
                    timeframe: resol,
                    to: toDate * 1000,
                    from: fromDate * 1000,
                    range: ranged
                });
                // Do something...
            });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    searchSymbol: async (req, res) => {
        try {
            let symbolName = req.query.symbol || "";
            if (symbolName.search(":") >= 0) {
                symbolName = symbolName.split(":")[1];
            }
            const listSb = vn30.filter(x => {
                const check = x.symbol.toLowerCase().search(symbolName.toLowerCase()) >= 0; 
                return check
            });
            TradingView.searchMarket(symbolName.toLowerCase()).then((rs) => {
                let allSymbols = [];
                let data = rs.concat(listSb);
                data.forEach(symbol => {
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



