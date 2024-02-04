const TradingView = require("@mathieuc/tradingview");
const authMiddl = require("../middlewares/authmidd");
const ChartTemplateMD = require("../models/chartTemplateModel");
const formidable = require('formidable');

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
            console.log("get history " + req.query.symbol + " -----------------::: " + new Date());
            const exchange = req.query.exchange;
            let symbol = req.query.symbol || "SSI";
            let fromDate = req.query.from || 0;
            let toDate = req.query.to || new Date().getTime();
            let type = req.query.type;
            let resol = "1";
            let ranged = parseInt((toDate - fromDate));
            const resolution = req.query.resolution || "D";
            console.log("exchange:: ", exchange);
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
                const fromCustom = resol == "1" ? Math.round((new Date().getTime() - 15536000000) / 1000) : fromDate;
                const url = `https://services.entrade.com.vn/chart-api/v2/ohlcs/derivative?from=${fromCustom}&to=${toDate}&symbol=${symbol}&resolution=${resolution}`;
                const response = await axios.get(url);
                let dataRP = response.data;
                res.json({ code: 200, data: dataRP });
                return;

            } else {
                if (exchange == "HNX" || exchange == "HOSE" || exchange == "UPCOM") {
                    const fromCustom = resol == "1" ? Math.round((new Date().getTime() - 15536000000) / 1000) : fromDate;
                    if (symbol == "VNINDEX") {
                        const url = `https://services.entrade.com.vn/chart-api/v2/ohlcs/index?from=${fromCustom}&to=${toDate}&symbol=${symbol}&resolution=${resolution}`;
                        const response = await axios.get(url);
                        let dataRP = response.data;
                        res.json({ code: 200, data: dataRP });
                    } else {
                        const url = `https://services.entrade.com.vn/chart-api/v2/ohlcs/stock?from=${fromCustom}&to=${toDate}&symbol=${symbol}&resolution=${resolution}`;
                        const response = await axios.get(url);
                        let dataRP = response.data;
                        res.json({ code: 200, data: dataRP });
                    }
                    return;
                } else {
                    if (resol == "1") {
                        if (type == "spot") {
                            const url = `https://api.binance.com/api/v3/klines?endTime=${toDate}999&symbol=${symbol}&interval=1m&limit=1000`;
                            const response = await axios.get(url);
                            let dataresponse = response.data;

                            const dataR = dataresponse.map((d) => ({
                                time: d[0] / 1000,
                                min: d[3],
                                max: d[2],
                                close: d[4],
                                open: d[1],
                                volume: d[5]
                            }))
                            res.json({ code: 200, data: dataR });
                            // tradingview coin
                            // let client = new TradingView.Client();
                            // let chart = new client.Session.Chart();
                            // chart.setTimezone('Asia/Ho_Chi_Minh');
                            // chart.setMarket(symbol, {
                            //     timeframe: resol,
                            //     to: toDate * 1000,
                            //     from: fromDate * 1000,
                            //     range: 100000
                            // });
                            // chart.onUpdate(async () => { // When price changes
                            //     if (!chart.periods[0]) {
                            //         res.json({ code: 200, data: [] });
                            //         client.end();
                            //         return;
                            //     }
                            //     console.log()
                            //     let data = chart.periods.reverse();
                            //     res.json({ code: 200, data: data });
                            //     client.end();
                            // });
                            // chart.onError((...err) => { // Listen for errors (can avoid crash)
                            //     console.log("chart histor error:: ", err);
                            //     res.json({ code: 500, error: err });
                            //     client.end();
                            // });
                        } else {
                            switch(symbol) {
                                case "SP500":
                                    symbol = "SPX";
                                break;
                                case "US30":
                                    symbol = "YM";
                                break;
                                case "US100":
                                    symbol = "NQ";
                                break;
                                case "SXP500":
                                    symbol = "SXP";
                                break;
                            }
                            const url = `https://my.litefinance.vn/vi/chart/get-history?symbol=${symbol}&resolution=1&from=${fromDate}&to=${toDate}`;
                            const response = await axios.get(url);
                            let dataresponse = response.data.data;
                            let bars = [];
                            for (var i = 0; i < dataresponse.t.length; i++) {
                                bars = [...bars, {
                                    close: dataresponse.c[i],
                                    max: dataresponse.h[i],
                                    min: dataresponse.l[i],
                                    open: dataresponse.o[i],
                                    time: dataresponse.t[i],
                                    volume: dataresponse.v[i]
                                }]
                            }
                            res.json({ code: 200, data: bars });
                        }
                    } else {
                        let client = new TradingView.Client();
                        let chart = new client.Session.Chart();
                        chart.setTimezone('Asia/Ho_Chi_Minh');
                        chart.setMarket(symbol, {
                            timeframe: resol,
                            to: toDate * 1000,
                            from: fromDate * 1000,
                            range: 100000
                        });
                        chart.onUpdate(async () => { // When price changes
                            if (!chart.periods[0]) {
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
                    // let client = new TradingView.Client();
                    //     let chart = new client.Session.Chart();
                    //     chart.setTimezone('Asia/Ho_Chi_Minh');
                    //     chart.setMarket(symbol, {
                    //         timeframe: resol,
                    //         to: toDate * 1000,
                    //         from: fromDate * 1000,
                    //         range: ranged
                    //     });
                    //     chart.onUpdate(async () => { // When price changes
                    //         if (!chart.periods[0]){
                    //             res.json({ code: 200, data: [] });
                    //             client.end();
                    //             return;
                    //         }
                    //         console.log()
                    //         let data = chart.periods.reverse();
                    //         res.json({ code: 200, data: data });
                    //         client.end();
                    //     });
                    //     chart.onError((...err) => { // Listen for errors (can avoid crash)
                    //         console.log("chart histor error:: ", err);
                    //         res.json({ code: 500, error: err });
                    //         client.end();
                    //     });
                }

            }

        } catch (err) {
            res.json({ code: 200, data: [] });
            console.log("history error:: ", err);
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
    getBotTemplate: async (req, res) => {
        try {
            const url = "https://smarttrading.vn/api/bot?act=stg_get&bid=2&name=template";
            let response = await axios.get(url);
            response.data.status = "ok";
            res.json(response.data);
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    //dashboard
    saveChartDashboard: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const counter = await ChartTemplateMD.countDocuments();
            const chart = req.query.chart;
            const form = new formidable.IncomingForm();//({ multiples: true });
            if (!chart) {
                form.parse(req, async (err, fields, files) => {
                    const newChart = await new ChartTemplateMD({
                        userID: userID,
                        name: fields.name[0],
                        content: fields.content[0],
                        page: "dashboard",
                        idcustom: counter + 1000
                    }).save();
                    res.json({
                        status: "ok",
                        id: newChart.idcustom
                    })
                })
                
            } else {
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "dashboard", idcustom:chart });
                form.parse(req, async (err, fields, files) => {
                    const updateChart = await ChartTemplateMD.findByIdAndUpdate(chartTp[0]._id, {
                        name: fields.name[0],
                        content: fields.content[0],
                    });
                    res.json({
                        status: "ok",
                        id: updateChart.idcustom
                    })
                });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi save chart" });
        }
    },
    getChartDashboard: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const chartTp = await ChartTemplateMD.find({ userID: userID, page: "dashboard" });
            if (chartTp && chartTp[0]) {
                const chart = req.query.chart;
                if (!chart) {
                    let data = [];
                    for (var i = 0; i < chartTp.length; i++) {
                        let contentpars = JSON.parse(chartTp[i].content);
                        let item = {
                            id: chartTp[i].idcustom,
                            name: chartTp[i].name,
                            timestamp: parseInt((new Date().getTime()) / 1000),
                            resolution: contentpars.resolution,
                            symbol: contentpars.symbol
                        }
                        data.push(item);
                    }
                    res.json({status: "ok", data: data})
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "dashboard", idcustom:chart });
                    res.json({ status: "ok", data: { id: datares[0].idcustom, content: datares[0].content, name: datares[0].name, timestamp: parseInt((new Date().getTime()) / 1000) } });
                }
            } else {
                res.json({ code: 404, error: "lỗi load chart dashboard" });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi load chart dashboard" });
        }
    },
    //pt1m
    saveChartpt1m: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const counter = await ChartTemplateMD.countDocuments();
            const chart = req.query.chart;
            const form = new formidable.IncomingForm();//({ multiples: true });
            if (!chart) {
                form.parse(req, async (err, fields, files) => {
                    const newChart = await new ChartTemplateMD({
                        userID: userID,
                        name: fields.name[0],
                        content: fields.content[0],
                        page: "pt1m",
                        idcustom: counter + 1000
                    }).save();
                    res.json({
                        status: "ok",
                        id: newChart.idcustom
                    })
                })
                
            } else {
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "pt1m", idcustom:chart });
                form.parse(req, async (err, fields, files) => {
                    const updateChart = await ChartTemplateMD.findByIdAndUpdate(chartTp[0]._id, {
                        name: fields.name[0],
                        content: fields.content[0],
                    });
                    res.json({
                        status: "ok",
                        id: updateChart.idcustom
                    })
                });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi save chart pt1m" });
        }
    },
    getChartpt1m: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const chartTp = await ChartTemplateMD.find({ userID: userID, page: "pt1m" });
            if (chartTp && chartTp[0]) {
                const chart = req.query.chart;
                if (!chart) {
                    
                    let data = [];
                    for (var i = 0; i < chartTp.length; i++) {
                        let contentpars = JSON.parse(chartTp[i].content);
                        let item = {
                            id: chartTp[i].idcustom,
                            name: chartTp[i].name,
                            timestamp: parseInt((new Date().getTime()) / 1000),
                            resolution: contentpars.resolution,
                            symbol: contentpars.symbol
                        }
                        data.push(item);
                    }
                    res.json({status: "ok", data: data})
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "pt1m", idcustom:chart });
                    res.json({ status: "ok", data: { id: datares[0].idcustom, content: datares[0].content, name: datares[0].name, timestamp: parseInt((new Date().getTime()) / 1000) } });
                }
            } else {
                res.json({ code: 404, error: "lỗi load chart pt1m" });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi load chart pt1m" });
        }
    },
    //ai
    saveChartai: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const counter = await ChartTemplateMD.countDocuments();
            const chart = req.query.chart;
            const form = new formidable.IncomingForm();//({ multiples: true });
            if (!chart) {
                form.parse(req, async (err, fields, files) => {
                    const newChart = await new ChartTemplateMD({
                        userID: userID,
                        name: fields.name[0],
                        content: fields.content[0],
                        page: "ai",
                        idcustom: counter + 1000
                    }).save();
                    res.json({
                        status: "ok",
                        id: newChart.idcustom
                    })
                })
                
            } else {
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "ai", idcustom:chart });
                form.parse(req, async (err, fields, files) => {
                    const updateChart = await ChartTemplateMD.findByIdAndUpdate(chartTp[0]._id, {
                        name: fields.name[0],
                        content: fields.content[0],
                    });
                    res.json({
                        status: "ok",
                        id: updateChart.idcustom
                    })
                });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi save chart ai" });
        }
    },
    getChartai: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const chartTp = await ChartTemplateMD.find({ userID: userID, page: "ai" });
            if (chartTp && chartTp[0]) {
                const chart = req.query.chart;
                if (!chart) {
                    
                    let data = [];
                    for (var i = 0; i < chartTp.length; i++) {
                        let contentpars = JSON.parse(chartTp[i].content);
                        let item = {
                            id: chartTp[i].idcustom,
                            name: chartTp[i].name,
                            timestamp: parseInt((new Date().getTime()) / 1000),
                            resolution: contentpars.resolution,
                            symbol: contentpars.symbol
                        }
                        data.push(item);
                    }
                    res.json({status: "ok", data: data})
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "ai", idcustom:chart });
                    res.json({ status: "ok", data: { id: datares[0].idcustom, content: datares[0].content, name: datares[0].name, timestamp: parseInt((new Date().getTime()) / 1000) } });
                }
            } else {
                res.json({ code: 404, error: "lỗi load chart ai" });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi load chart ai" });
        }
    },
    //pttrend
    saveChartpttrend: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const counter = await ChartTemplateMD.countDocuments();
            const chart = req.query.chart;
            const form = new formidable.IncomingForm();//({ multiples: true });
            if (!chart) {
                form.parse(req, async (err, fields, files) => {
                    const newChart = await new ChartTemplateMD({
                        userID: userID,
                        name: fields.name[0],
                        content: fields.content[0],
                        page: "pttrend",
                        idcustom: counter + 1000
                    }).save();
                    res.json({
                        status: "ok",
                        id: newChart.idcustom
                    })
                })
                
            } else {
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "pttrend", idcustom:chart });
                form.parse(req, async (err, fields, files) => {
                    const updateChart = await ChartTemplateMD.findByIdAndUpdate(chartTp[0]._id, {
                        name: fields.name[0],
                        content: fields.content[0],
                    });
                    res.json({
                        status: "ok",
                        id: updateChart.idcustom
                    })
                });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi save chart pttrend" });
        }
    },
    getChartpttrend: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const chartTp = await ChartTemplateMD.find({ userID: userID, page: "pttrend" });
            if (chartTp && chartTp[0]) {
                const chart = req.query.chart;
                if (!chart) {
                    
                    let data = [];
                    for (var i = 0; i < chartTp.length; i++) {
                        let contentpars = JSON.parse(chartTp[i].content);
                        let item = {
                            id: chartTp[i].idcustom,
                            name: chartTp[i].name,
                            timestamp: parseInt((new Date().getTime()) / 1000),
                            resolution: contentpars.resolution,
                            symbol: contentpars.symbol
                        }
                        data.push(item);
                    }
                    res.json({status: "ok", data: data})
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "pttrend", idcustom:chart });
                    res.json({ status: "ok", data: { id: datares[0].idcustom, content: datares[0].content, name: datares[0].name, timestamp: parseInt((new Date().getTime()) / 1000) } });
                }
            } else {
                res.json({ code: 404, error: "lỗi load chart pttrend" });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi load chart pttrend" });
        }
    },
    //pt3m
    saveChart_pt3m: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const counter = await ChartTemplateMD.countDocuments();
            const chart = req.query.chart;
            const form = new formidable.IncomingForm();//({ multiples: true });
            if (!chart) {
                form.parse(req, async (err, fields, files) => {
                    const newChart = await new ChartTemplateMD({
                        userID: userID,
                        name: fields.name[0],
                        content: fields.content[0],
                        page: "pt3m",
                        idcustom: counter + 1000
                    }).save();
                    res.json({
                        status: "ok",
                        id: newChart.idcustom
                    })
                })
                
            } else {
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "pt3m", idcustom:chart });
                form.parse(req, async (err, fields, files) => {
                    const updateChart = await ChartTemplateMD.findByIdAndUpdate(chartTp[0]._id, {
                        name: fields.name[0],
                        content: fields.content[0],
                    });
                    res.json({
                        status: "ok",
                        id: updateChart.idcustom
                    })
                });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi save chart pt3m" });
        }
    },
    getChart_pt3m: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const chartTp = await ChartTemplateMD.find({ userID: userID, page: "pt3m" });
            if (chartTp && chartTp[0]) {
                const chart = req.query.chart;
                if (!chart) {
                    
                    let data = [];
                    for (var i = 0; i < chartTp.length; i++) {
                        let contentpars = JSON.parse(chartTp[i].content);
                        let item = {
                            id: chartTp[i].idcustom,
                            name: chartTp[i].name,
                            timestamp: parseInt((new Date().getTime()) / 1000),
                            resolution: contentpars.resolution,
                            symbol: contentpars.symbol
                        }
                        data.push(item);
                    }
                    res.json({status: "ok", data: data})
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "pt3m", idcustom:chart });
                    res.json({ status: "ok", data: { id: datares[0].idcustom, content: datares[0].content, name: datares[0].name, timestamp: parseInt((new Date().getTime()) / 1000) } });
                }
            } else {
                res.json({ code: 404, error: "lỗi load chart pt3m" });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi load chart pt3m" });
        }
    },
    //csfree
    saveChart_csfree: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const counter = await ChartTemplateMD.countDocuments();
            const chart = req.query.chart;
            const form = new formidable.IncomingForm();//({ multiples: true });
            if (!chart) {
                form.parse(req, async (err, fields, files) => {
                    const newChart = await new ChartTemplateMD({
                        userID: userID,
                        name: fields.name[0],
                        content: fields.content[0],
                        page: "csfree",
                        idcustom: counter + 1000
                    }).save();
                    res.json({
                        status: "ok",
                        id: newChart.idcustom
                    })
                })
                
            } else {
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "csfree", idcustom:chart });
                form.parse(req, async (err, fields, files) => {
                    const updateChart = await ChartTemplateMD.findByIdAndUpdate(chartTp[0]._id, {
                        name: fields.name[0],
                        content: fields.content[0],
                    });
                    res.json({
                        status: "ok",
                        id: updateChart.idcustom
                    })
                });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi save chart csfree" });
        }
    },
    getChart_csfree: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const chartTp = await ChartTemplateMD.find({ userID: userID, page: "csfree" });
            if (chartTp && chartTp[0]) {
                const chart = req.query.chart;
                if (!chart) {
                    
                    let data = [];
                    for (var i = 0; i < chartTp.length; i++) {
                        let contentpars = JSON.parse(chartTp[i].content);
                        let item = {
                            id: chartTp[i].idcustom,
                            name: chartTp[i].name,
                            timestamp: parseInt((new Date().getTime()) / 1000),
                            resolution: contentpars.resolution,
                            symbol: contentpars.symbol
                        }
                        data.push(item);
                    }
                    res.json({status: "ok", data: data})
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "csfree", idcustom:chart });
                    res.json({ status: "ok", data: { id: datares[0].idcustom, content: datares[0].content, name: datares[0].name, timestamp: parseInt((new Date().getTime()) / 1000) } });
                }
            } else {
                res.json({ code: 404, error: "lỗi load chart csfree" });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi load chart csfree" });
        }
    },
    //cstplus
    saveChart_cstplus: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const counter = await ChartTemplateMD.countDocuments();
            const chart = req.query.chart;
            const form = new formidable.IncomingForm();//({ multiples: true });
            if (!chart) {
                form.parse(req, async (err, fields, files) => {
                    const newChart = await new ChartTemplateMD({
                        userID: userID,
                        name: fields.name[0],
                        content: fields.content[0],
                        page: "cstplus",
                        idcustom: counter + 1000
                    }).save();
                    res.json({
                        status: "ok",
                        id: newChart.idcustom
                    })
                })
                
            } else {
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "cstplus", idcustom:chart });
                form.parse(req, async (err, fields, files) => {
                    const updateChart = await ChartTemplateMD.findByIdAndUpdate(chartTp[0]._id, {
                        name: fields.name[0],
                        content: fields.content[0],
                    });
                    res.json({
                        status: "ok",
                        id: updateChart.idcustom
                    })
                });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi save chart cstplus" });
        }
    },
    getChart_cstplus: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const chartTp = await ChartTemplateMD.find({ userID: userID, page: "cstplus" });
            if (chartTp && chartTp[0]) {
                const chart = req.query.chart;
                if (!chart) {
                    
                    let data = [];
                    for (var i = 0; i < chartTp.length; i++) {
                        let contentpars = JSON.parse(chartTp[i].content);
                        let item = {
                            id: chartTp[i].idcustom,
                            name: chartTp[i].name,
                            timestamp: parseInt((new Date().getTime()) / 1000),
                            resolution: contentpars.resolution,
                            symbol: contentpars.symbol
                        }
                        data.push(item);
                    }
                    res.json({status: "ok", data: data})
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "cstplus", idcustom:chart });
                    res.json({ status: "ok", data: { id: datares[0].idcustom, content: datares[0].content, name: datares[0].name, timestamp: parseInt((new Date().getTime()) / 1000) } });
                }
            } else {
                res.json({ code: 404, error: "lỗi load chart cstplus" });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi load chart cstplus" });
        }
    },
    //cstrend
    saveChart_cstrend: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const counter = await ChartTemplateMD.countDocuments();
            const chart = req.query.chart;
            const form = new formidable.IncomingForm();//({ multiples: true });
            if (!chart) {
                form.parse(req, async (err, fields, files) => {
                    const newChart = await new ChartTemplateMD({
                        userID: userID,
                        name: fields.name[0],
                        content: fields.content[0],
                        page: "cstrend",
                        idcustom: counter + 1000
                    }).save();
                    res.json({
                        status: "ok",
                        id: newChart.idcustom
                    })
                })
                
            } else {
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "cstrend", idcustom:chart });
                form.parse(req, async (err, fields, files) => {
                    const updateChart = await ChartTemplateMD.findByIdAndUpdate(chartTp[0]._id, {
                        name: fields.name[0],
                        content: fields.content[0],
                    });
                    res.json({
                        status: "ok",
                        id: updateChart.idcustom
                    })
                });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi save chart cstrend" });
        }
    },
    getChart_cstrend: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const chartTp = await ChartTemplateMD.find({ userID: userID, page: "cstrend" });
            if (chartTp && chartTp[0]) {
                const chart = req.query.chart;
                if (!chart) {
                    
                    let data = [];
                    for (var i = 0; i < chartTp.length; i++) {
                        let contentpars = JSON.parse(chartTp[i].content);
                        let item = {
                            id: chartTp[i].idcustom,
                            name: chartTp[i].name,
                            timestamp: parseInt((new Date().getTime()) / 1000),
                            resolution: contentpars.resolution,
                            symbol: contentpars.symbol
                        }
                        data.push(item);
                    }
                    res.json({status: "ok", data: data})
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "cstrend", idcustom:chart });
                    res.json({ status: "ok", data: { id: datares[0].idcustom, content: datares[0].content, name: datares[0].name, timestamp: parseInt((new Date().getTime()) / 1000) } });
                }
            } else {
                res.json({ code: 404, error: "lỗi load chart cstrend" });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi load chart cstrend" });
        }
    },
}
module.exports = ChartTradingViewController;



