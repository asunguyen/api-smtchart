const TradingView = require("@mathieuc/tradingview");
const axios = require('axios');
const vn30 = [
    // {
    //     typespecs: [
    //         "continuous",
    //         "synthetic"
    //     ],
    //     exchange: "HNX",
    //     country: "VN",
    //     currency_code: "VND",
    //     description: "VN301! INDEX FUTURES",
    //     provider_id: "ice",
    //     symbol: "VN301!",
    //     type: "futures",
    //     "pro_name": "VN301!",
    //     "full_name": "HNX:VN301!",
    //     "id": "HNX:VN301!",
    //     "unitId": "HNX:VN301!",
    //     "fullExchange": "HNX",
    //     "extension": {
    //         "unitId": "HNX:VN301!",
    //         "currencyCode": "HNX:VN301!"
    //     }
    // },
    // {
    //     typespecs: [
    //         "continuous",
    //         "synthetic"
    //     ],
    //     exchange: "HNX",
    //     country: "VN",
    //     currency_code: "VND",
    //     description: "VN302! INDEX FUTURES",
    //     provider_id: "ice",
    //     symbol: "VN302!",
    //     type: "futures",
    //     "pro_name": "VN302!",
    //     "full_name": "HNX:VN302!",
    //     "id": "HNX:VN302!",
    //     "unitId": "HNX:VN302!",
    //     "fullExchange": "HNX",
    //     "extension": {
    //         "unitId": "HNX:VN302!",
    //         "currencyCode": "HNX:VN302!"
    //     }
    // },
    // {
    //     symbol: "VN30X2023",
    //     exchange: "HNX",
    //     country: "VN",
    //     currency_code: "VND",
    //     description: "VN30X2023 INDEX FUTURES",
    //     provider_id: "ice",
    //     type: "futures",
    //     "pro_name": "VN30X2023",
    //     "full_name": "HNX:VN30X2023",
    //     "id": "HNX:VN30X2023",
    //     "unitId": "HNX:VN30X2023",
    //     "fullExchange": "HNX",
    //     "extension": {
    //         "unitId": "HNX:VN30X2023",
    //         "currencyCode": "HNX:VN30X2023"
    //     }
    // },
    // {
    //     symbol: "VN30Z2023",
    //     exchange: "HNX",
    //     country: "VN",
    //     currency_code: "VND",
    //     description: "VN30 INDEX FUTURES DEC 2023",
    //     provider_id: "ice",
    //     type: "futures",
    //     "pro_name": "VN30Z2023",
    //     "full_name": "HNX:VN30Z2023",
    //     "id": "HNX:VN30Z2023",
    //     "unitId": "HNX:VN30Z2023",
    //     "fullExchange": "HNX",
    //     "extension": {
    //         "unitId": "HNX:VN30Z2023",
    //         "currencyCode": "HNX:VN30Z2023"
    //     }
    // },
    // {
    //     symbol: "VN30H2024",
    //     description: "VN30H2024 INDEX FUTURES MAR 2024",
    //     exchange: "HNX",
    //     country: "VN",
    //     currency_code: "VND",
    //     provider_id: "ice",
    //     type: "futures",
    //     "pro_name": "VN30H2024",
    //     "full_name": "HNX:VN30H2024",
    //     "id": "HNX:VN30H2024",
    //     "unitId": "HNX:VN30H2024",
    //     "fullExchange": "HNX",
    //     "extension": {
    //         "unitId": "HNX:VN30H2024",
    //         "currencyCode": "HNX:VN30H2024"
    //     }
    // },
    // {
    //     symbol: "VN30M2024",
    //     description: "VN30M2024 INDEX FUTURES JUN 2024",
    //     exchange: "HNX",
    //     country: "VN",
    //     currency_code: "VND",
    //     provider_id: "ice",
    //     type: "futures",
    //     "pro_name": "VN30M2024",
    //     "full_name": "HNX:VN30M2024",
    //     "id": "HNX:VN30M2024",
    //     "unitId": "HNX:VN30M2024",
    //     "fullExchange": "HNX",
    //     "extension": {
    //         "unitId": "HNX:VN30M2024",
    //         "currencyCode": "HNX:VN30M2024"
    //     }
    // },
    {
        "symbol": "VN30F1M",
        "full_name": "VN30F1M",
        "short_name": "VN30F1M",
        "description": "VN30F1M",
        "exchange": "HNX",
        "type": "futures",
        country: "VN",
        currency_code: "VND",
        provider_id: "ice",
        "pro_name": "VN30F1M",
        "full_name": "HNX:VN30F1M",
        "id": "HNX:VN30F1M",
        "unitId": "HNX:VN30F1M",
        "fullExchange": "HNX",
        "extension": {
            "unitId": "HNX:VN30F1M",
            "currencyCode": "HNX:VN30F1M"
        },
    },
    {
        "symbol": "VN30F1Q",
        "full_name": "VN30F1Q",
        "short_name": "VN30F1Q",
        "description": "VN30F1Q",
        "exchange": "HNX",
        "type": "futures",
        country: "VN",
        currency_code: "VND",
        provider_id: "ice",
        "pro_name": "VN30F1Q",
        "full_name": "HNX:VN30F1Q",
        "id": "HNX:VN30F1Q",
        "unitId": "HNX:VN30F1Q",
        "fullExchange": "HNX",
        "extension": {
            "unitId": "HNX:VN30F1Q",
            "currencyCode": "HNX:VN30F1Q"
        },
    },
    {
        "symbol": "VN30F2M",
        "full_name": "VN30F2M",
        "short_name": "VN30F2M",
        "description": "VN30F2M",
        "exchange": "HNX",
        "type": "futures",
        country: "VN",
        currency_code: "VND",
        provider_id: "ice",
        "pro_name": "VN30F2M",
        "full_name": "HNX:VN30F2M",
        "id": "HNX:VN30F2M",
        "unitId": "HNX:VN30F2M",
        "fullExchange": "HNX",
        "extension": {
            "unitId": "HNX:VN30F2M",
            "currencyCode": "HNX:VN30F2M"
        },
    },
    {
        "symbol": "VN30F2Q",
        "full_name": "VN30F2Q",
        "short_name": "VN30F2Q",
        "description": "VN30F2Q",
        "exchange": "HNX",
        "type": "futures",
        country: "VN",
        currency_code: "VND",
        provider_id: "ice",
        "pro_name": "VN30F2Q",
        "full_name": "HNX:VN30F2Q",
        "id": "HNX:VN30F2Q",
        "unitId": "HNX:VN30F2Q",
        "fullExchange": "HNX",
        "extension": {
            "unitId": "HNX:VN30F2Q",
            "currencyCode": "HNX:VN30F2Q"
        },
    }

]
const ChartTradingViewController = {
    historyChart: async (req, res) => {
        try {
            console.log("get history "+req.query.symbol+ " -----------------::: " + new Date());
            const exchange = req.query.exchange;
            const symbol = req.query.symbol || "SSI";
            let fromDate = req.query.from || 0;
            let toDate = req.query.to || new Date().getTime();
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
            if (symbol && (symbol == "VN30F1M" || symbol == "VN30F1Q" || symbol == "VN30F2M" || symbol == "VN30F2Q")) {
                const fromCustom = resol == "1" ? Math.round((new Date().getTime() - 15536000000)/1000) : fromDate;
                const url = `https://services.entrade.com.vn/chart-api/v2/ohlcs/derivative?from=${fromCustom}&to=${toDate}&symbol=${symbol}&resolution=${resolution}`;
                const response = await axios.get(url);
                let dataRP = response.data;
                res.json({code: 200, data: dataRP});
                return;

            } else {
                if (exchange == "HNX" || exchange == "HOSE" || exchange == "UPCOM") {
                    const fromCustom = resol == "1" ? Math.round((new Date().getTime() - 15536000000)/1000) : fromDate;
                    if (symbol == "VNINDEX") {
                        const url = `https://services.entrade.com.vn/chart-api/v2/ohlcs/index?from=${fromCustom}&to=${toDate}&symbol=${symbol}&resolution=${resolution}`;
                        const response = await axios.get(url);
                        let dataRP = response.data;
                        res.json({code: 200, data: dataRP});
                    } else {
                        const url = `https://services.entrade.com.vn/chart-api/v2/ohlcs/stock?from=${fromCustom}&to=${toDate}&symbol=${symbol}&resolution=${resolution}`;
                        const response = await axios.get(url);
                        let dataRP = response.data;
                        res.json({code: 200, data: dataRP});
                    }
                    return;
                } else {
                    let client = new TradingView.Client();
                    let chart = new client.Session.Chart();
                    chart.setTimezone('Asia/Ho_Chi_Minh');
                    chart.setMarket(symbol, {
                        timeframe: resol,
                        to: toDate * 1000,
                        from: fromDate * 1000,
                        range: ranged
                    });
                    chart.onUpdate(async () => { // When price changes
                        if (!chart.periods[0]){
                            res.json({ code: 200, data: [] });
                            client.end();
                            return;
                        }
                        console.log()
                        let data = chart.periods.reverse();
                        res.json({ code: 200, data: data });
                        client.end();
                    });
                    chart.onError((...err) => { // Listen for errors (can avoid crash)
                        console.log("chart histor error:: ", err);
                        res.json({ code: 500, error: err });
                        client.end();
                    });
                }
                
            }
            
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
    },
    getBotTemplate: async(req, res) => {
        try {
            const url = "https://smarttrading.vn/api/bot?act=stg_get&bid=2&name=template";
            let response = await axios.get(url);
            response.data.status = "ok";
            res.json(response.data);
        }catch(err) {
            res.json({code: 500, error: err});
        }
    }
}
module.exports = ChartTradingViewController;



