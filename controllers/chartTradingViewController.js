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
            let resolVN = "1";
            let resolFX = req.query.resolution || "1";
            let resolCoin = req.query.resolution + "m" || "1m";
            let ranged = parseInt((toDate - fromDate));
            const resolution = req.query.resolution || "D";
            if (parseFloat(resolution) >= 1) {
                resolFX = "1";
            }
            if (parseFloat(resolution) >= 5) {
                resolFX = "5";
            }
            if (parseFloat(resolution) >= 15) {
                resolFX = "15";
            }
            if (parseFloat(resolution) >= 30) {
                resolFX = "30";
                resolCoin = "30m"
            }
            if (parseFloat(resolution) >= 60) {
                resol = "H";
                resolVN = "1H";
                resolCoin = parseFloat(resolution)/60 + "h";
                resolFX = "30"
            }
            if (resolution.search("D") >= 0) {
                resol = "D"
                resolVN = "1D"
                resolFX = "D";
                resolCoin = "1d";
            }
            if (resolution.search("W") >= 0) {
                resol = "W"
                resolVN = "1D"
                resolFX = "D";
                resolCoin = "1w"
            }
            if (resolution.search("M") >= 0) {
                resol = "M"
                resolVN = "1D"
                resolFX = "D";
                resolCoin = "1w"
            }
            if (resol != "1") {
                ranged = parseInt((toDate - fromDate) / 60);
            }
            const url1 = `https://histdatafeed.vps.com.vn/tradingview/history?symbol=${symbol}&resolution=${resolFX}&from=${fromDate}&to=${toDate}`;
            if (symbol && (symbol == "VN30F1M" || symbol == "VN30F1Q" || symbol == "VN30F2M" || symbol == "VN30F2Q")) {
                const fromCustom = resol == "1" ? Math.round((new Date().getTime() - 15536000000) / 1000) : fromDate;
                const url = `https://services.entrade.com.vn/chart-api/v2/ohlcs/derivative?from=${fromCustom}&to=${toDate}&symbol=${symbol}&resolution=${resolVN}`;
                
                const response = await axios.get(url);
                let dataRP = response.data;
                res.json({ code: 200, data: dataRP });
                return;
            } else {
                if (exchange == "HNX" || exchange == "HOSE" || exchange == "UPCOM") {
                    const fromCustom = resol == "1" ? Math.round((new Date().getTime() - 15536000000) / 1000) : fromDate;
                    if (symbol == "VNINDEX") {
                        const url = `https://services.entrade.com.vn/chart-api/v2/ohlcs/index?from=${fromCustom}&to=${toDate}&symbol=${symbol}&resolution=${resolVN}`;
                        const response = await axios.get(url);
                        let dataRP = response.data;
                        res.json({ code: 200, data: dataRP });
                    } else {
                        const url = `https://services.entrade.com.vn/chart-api/v2/ohlcs/stock?from=${fromCustom}&to=${toDate}&symbol=${symbol}&resolution=${resolVN}`;
                        const response = await axios.get(url);
                        let dataRP = response.data;
                        res.json({ code: 200, data: dataRP });
                    }
                    return;
                } else {
                    if (resol == "1") {
                        if (type == "spot") {
                            const url = `https://api.binance.com/api/v3/klines?endTime=${toDate}999&symbol=${symbol}&interval=${resolCoin}&limit=1000`;
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
                        } else {
                            switch (symbol) {
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
                            const url = `https://my.litefinance.vn/vi/chart/get-history?symbol=${symbol}&resolution=${resolFX}&from=${fromDate}&to=${toDate}`;
                            const response = await axios.get(url);
                            let dataresponse = response.data.data;
                            let bars = [];
                            if (dataresponse && dataresponse.t) {
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
                            }
                            let data = chart.periods.reverse();
                            res.json({ code: 200, data: data });
                            console.log("history::: " + symbol);
                            client.end();
                            return;
                        });
                        chart.onError((...err) => { // Listen for errors (can avoid crash)
                            console.log("chart histor error:: ", err);
                            res.json({ code: 500, error: err });
                            client.end();
                            return;
                        });
                    }
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
                        ...symbol,
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
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "dashboard", idcustom: chart });
                if (chartTp && chartTp[0]) {
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
                } else {
                    res.json({
                        status: "ok",
                        id: 0
                    })
                }
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
                    res.json({ status: "ok", data: data })
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "dashboard", idcustom: chart });
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
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "pt1m", idcustom: chart });
                if (chartTp && chartTp[0]) {
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
                } else {
                    res.json({
                        status: "ok",
                        id: 0
                    })
                }
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
                    res.json({ status: "ok", data: data })
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "pt1m", idcustom: chart });
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
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "ai", idcustom: chart });
                if (chartTp && chartTp[0]) {
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
                } else {
                    res.json({
                        status: "ok",
                        id: 0
                    })
                }
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
                    res.json({ status: "ok", data: data })
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "ai", idcustom: chart });
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
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "pttrend", idcustom: chart });
                if (chartTp && chartTp[0]) {
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
                } else {
                    res.json({
                        status: "ok",
                        id: 0
                    })
                }
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
                    res.json({ status: "ok", data: data })
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "pttrend", idcustom: chart });
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
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "pt3m", idcustom: chart });
                if (chartTp && chartTp[0]) {
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
                } else {
                    res.json({
                        status: "ok",
                        id: 0
                    })
                }
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
                    res.json({ status: "ok", data: data })
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "pt3m", idcustom: chart });
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
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "csfree", idcustom: chart });
                if (chartTp && chartTp[0]) {
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
                } else {
                    res.json({
                        status: "ok",
                        id: 0
                    })
                }
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
                    res.json({ status: "ok", data: data })
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "csfree", idcustom: chart });
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
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "cstplus", idcustom: chart });
                if (chartTp && chartTp[0]) {
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
                } else {
                    res.json({
                        status: "ok",
                        id: 0
                    })
                }

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
                    res.json({ status: "ok", data: data })
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "cstplus", idcustom: chart });
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
                const chartTp = await ChartTemplateMD.find({ userID: userID, page: "cstrend", idcustom: chart });
                if (chartTp && chartTp[0]) {
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
                } else {
                    res.json({
                        status: "ok",
                        id: 0
                    })
                }
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
                    res.json({ status: "ok", data: data })
                } else {
                    const datares = await ChartTemplateMD.find({ userID: userID, page: "cstrend", idcustom: chart });
                    res.json({ status: "ok", data: { id: datares[0].idcustom, content: datares[0].content, name: datares[0].name, timestamp: parseInt((new Date().getTime()) / 1000) } });
                }
            } else {
                res.json({ code: 404, error: "lỗi load chart cstrend" });
            }
        } catch (err) {
            res.json({ code: 500, error: "lỗi load chart cstrend" });
        }
    },
    deleteChart: async (req, res) => {
        try {
            const userID = req.query.user.split("_")[0];
            const chartID = req.query.chart;
            const chartTp = await ChartTemplateMD.findOneAndDelete({ userID: userID, idcustom: chartID });
            res.json({ code: 200, data: chartTp });
        } catch (err) {
            res.json({ code: 500, error: "Lỗi xóa chart" });
        }
    },
    searchIndicator: async (req, res) => {
        try {
            const valueSearch = req.query.search;
            TradingView.searchIndicator(valueSearch).then((rs) => {
                res.json({ code: 200, data: rs });
            });
        } catch (err) {
            res.json({ code: 500, error: "Có lỗi xảy ra vui lòng thử lại" });
        }
    },
    getIndiCator: async (req, res) => {
        try {
            const url1 = `https://pine-facade.tradingview.com/pine-facade/translate/${req.query.idIndi}/1.0?user_name=smattrading`;
            const ress = await axios.get(url1);
            res.json({ code: 200, data: ress.data });
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    convertIndicator: async (req, res) => {
        try {
            const res = await fetch("https://pine-facade.tradingview.com/pine-facade/save/new_draft?user_name=smattrading&allow_use_existing_draft=true", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                    "cache-control": "no-cache",
                    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryS5L6AOk244YAXBRp",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "cookie": "cookiePrivacyPreferenceBannerProduction=notApplicable; _ga=GA1.1.706331468.1696968426; cookiesSettings={\"analytics\":true,\"advertising\":true}; _ga_1P588Q6QXH=GS1.1.1697733438.4.0.1697733439.0.0.0; device_t=ZGlMYUF3OjAsWkc2WkF3OjA.5XaqA4sWDTJXQ78PGOo2Svx2QgH5tKdeL5USToo4f1U; sessionid=w81h77kfb05a9lwrdeb8s3prpmrgn0zl; sessionid_sign=v2:lLPXKwSAqwxlpYGpdk+hDOIOAMjCC3KCXoU/O7+8DZ0=; tv_ecuid=e2093a95-6564-489d-b68f-5acbcb802722; _sp_ses.cf1a=*; _ga_R53B6WMR8T=GS1.1.1713798119.57.1.1713800287.0.0.0; _ga_53M0R0ZT9V=GS1.1.1713798119.57.1.1713800287.0.0.0; _sp_id.cf1a=ca63cf55-06cb-4019-a8c1-a4e48422b3ef.1696968425.57.1713801445.1713720273.fac93dc5-a445-40ff-aa07-bfd6aecd2cd6; _ga_YVVRYGL0E0=GS1.1.1713798372.65.1.1713801562.60.0.0",
                    "Referer": "https://www.tradingview.com/",
                    "Referrer-Policy": "origin-when-cross-origin"
                },
                "body": "------WebKitFormBoundaryS5L6AOk244YAXBRp\r\nContent-Disposition: form-data; name=\"source\"\r\n\r\n//@version=5\r\nindicator(title='[SMT] Buy & Sell Renko Based - Alerts', shorttitle='[SMT] B&S Renko', overlay=true)\r\n\r\n//INPUTS\r\nrenkoATRLength = input.int(10, minval=1, title='ATR Length')\r\n\r\n//CALCULATION\r\nparam = ticker.renko(syminfo.tickerid, 'ATR', renkoATRLength)\r\n\r\nrenkoClose = request.security(param, timeframe.period, close)\r\nrenkoOpen = request.security(param, timeframe.period, open)\r\n\r\nbuySignal = ta.crossunder(renkoOpen, renkoClose)\r\nsellSignal = ta.crossover(renkoOpen, renkoClose)\r\n\r\ncol = renkoClose < renkoOpen ? #F23645 : #089981\r\n\r\n//PLOTS\r\nplot(renkoOpen, title=\"Renko Open\", style=plot.style_line, linewidth=2, color=col)\r\nplotshape(buySignal, \"Buy\", shape.labelup, location.belowbar, #089981, 0, \"Buy\", color.white)\r\nplotshape(sellSignal, \"Sell\", shape.labeldown, location.abovebar, #F23645, 0, \"Sell\", color.white)\r\n\r\n// ALERTS\r\nalertcondition(buySignal, \"[SMT] B&S Renko: Buy!\", \"Buy!\")\r\nalertcondition(sellSignal, \"[SMT] B&S Renko: Sell!\", \"Sell!\")\r\nalertcondition(buySignal or sellSignal, \"[SMT] B&S Renko: Changed Direction!\", \"Changed Direction!\")\r\n------WebKitFormBoundaryS5L6AOk244YAXBRp--\r\n",
                "method": "POST"
            });
            let dataRP = res.data;
            res.json({ code: 200, data: dataRP });
        } catch (err) {
            res.json({ code: 500, error: "Có lỗi xảy ra vui lòng thử lại" });
        }
    }
}
module.exports = ChartTradingViewController;



