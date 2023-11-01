const { log, error } = console;
const axios = require('axios');
const supported_resolutions = ["1", "5", "10", "15", "30", "60", "120", "240", "D", "2D", "3D", "W", "3W", "M", "6M"]
//Tulind Functions
const cophieu = require("../public/data/co_phieu.json");
const chiso = require("../public/data/chi_so.json");
const chungchiquy = require("../public/data/chung_chi_quy.json");
const chungquyen = require("../public/data/chung_quyen.json");
const etf = require("../public/data/etf.json");
const hdtl = require("../public/data/hdtl.json");
const traiphieu = require("../public/data/trai_phieu.json");

const chartController = {
    getChart: async (req, res) => {
        try {

        } catch (err) {
            res.send(err);
        }
    },
    config: async (req, res) => {
        try {
            let config = {
                "supports_search": true,
                "supports_group_request": false,
                "supports_marks": true,
                "supports_timescale_marks": true,
                "supports_time": true,
                "exchanges": [
                    {
                        "value": "",
                        "name": "All Exchanges",
                        "desc": ""
                    },
                    {
                        "value": "HOSE",
                        "name": "HOSE",
                        "desc": "HOSE"
                    },
                    {
                        "value": "HNX",
                        "name": "HNX",
                        "desc": "HNX"
                    },
                    {
                        "value": "HNXBOND",
                        "name": "HNXBOND",
                        "desc": "HNXBOND"
                    },
                    {
                        "value": "UPCOM",
                        "name": "UPCOM",
                        "desc": "UPCOM"
                    },
                    {
                        "value": "DER",
                        "name": "DER",
                        "desc": "DER"
                    },
                ],
                "symbols_types": [
                    {
                        "name": "All types",
                        "value": ""
                    },
                    {
                        "name": "Stock",
                        "value": "Cổ phiếu"
                    },
                    {
                        "name": "Trái phiếu",
                        "value": "Trái phiếu"
                    },
                    {
                        "name": "Chỉ số",
                        "value": "Chỉ số"
                    },
                    {
                        "name": "Chứng chỉ quỹ",
                        "value": "Chứng chỉ quỹ"
                    },
                    {
                        "name": "Chứng quyền",
                        "value": "Chứng quyền"
                    },
                    {
                        "name": "ETF",
                        "value": "ETF"
                    },
                    {
                        "name": "HĐTL",
                        "value": "HĐTL"
                    }
                ], "supported_resolutions": supported_resolutions
            }
            res.json(config);
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    time: async (req, res) => {
        try {
            res.json(new Date().getTime());
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    symbols: async (req, res) => {
        try {
            let symbolsdata = req.query.symbol;
            let data = cophieu.concat(chiso, chungchiquy, chungquyen, etf, hdtl, traiphieu);
            let dataSym = data.find((x) => x.symbol == symbolsdata);
            if (dataSym && dataSym.short_name) {
                let data = {
                    "name": dataSym.short_name,
                    "exchange-traded": dataSym.exchange,
                    "exchange-listed": dataSym.exchange,
                    "minmov": 1,
                    "minmov2": 0,
                    "pointvalue": 1,
                    "session": "0930-1630",
                    "has_intraday": false,
                    "visible_plots_set": "ohlcv",
                    "description": dataSym.short_name + " - " + dataSym.full_name,
                    "type": "stock",
                    "supported_resolutions": supported_resolutions,
                    "pricescale": 100,
                    "ticker": dataSym.symbol,
                    "logo_urls": [""],
                    "exchange_logo": ""
                }
                res.json(data);
            } else {
                res.json({ code: 404, error: "404 not found symbol" });
            }
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    history: async (req, res) => {
        try {
            let timetampFrom = new Date();
            timetampFrom.setDate(timetampFrom.getDate() - 29);
            let dateFrom = (timetampFrom.getMonth() + 1) > 9 ? (timetampFrom.getMonth() + 1) : "0" + (timetampFrom.getMonth() + 1);
            let rqTimeFrom = timetampFrom.getDate() + "/" + dateFrom + "/" + timetampFrom.getFullYear();
            let timetampTo = new Date();
            let dateTo = (timetampTo.getMonth() + 1) > 9 ? (timetampTo.getMonth() + 1) : "0" + (timetampTo.getMonth() + 1);
            let rqTimetampTo = timetampTo.getDate() + "/" + dateTo + "/" + timetampTo.getFullYear();

            let symbol = req.query.symbol;
            let resolution = req.query.resolution; //time của nến
            let countback = req.query.countback; // số lượng
            if (countback > 10000) {
                countback = 10000 - 1;
            }
            const url = `https://dchart-api.vndirect.com.vn/dchart/history?symbol=${symbol}&resolution=${resolution}&from=0&to=${parseInt(req.query.to)}`;
            console.log(url);
            const response = await axios.get(url);
            if (response && response.data) {
                
                response.data["s"] = "ok"
                res.json(response.data);
            } else {
                res.json({ code: 500, error: "lỗi" });
            }

        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    search: async (req, res) => {
        try {
            let data = cophieu.concat(chiso, chungchiquy, chungquyen, etf, hdtl, traiphieu);
            const limit = req.params.limit || req.query.limit;
            const type = req.params.type || req.query.type;
            const query = req.params.query || req.query.query;
            const exchange = req.params.exchange || req.query.exchange;
            let listData = [];
            listData = data.filter((x) => x.type.search(type) >= 0 && (!query || x.symbol.search(query) >= 0) && (!exchange || x.exchange.search(exchange) >= 0));
            if (listData && listData.length > 0) {
                const datamap = listData.map((d) => ({
                    description: d.description,
                    exchange: d.exchange,
                    exchange_logo: "",
                    full_name: d.symbol,
                    logo_urls: [""],
                    symbol: d.symbol,
                    type: d.type
                }));
                res.json(datamap);
            } else {
                res.json([]);
            }
        } catch (err) {
            res.json({ code: 500, error: err });
        }
    },
    allExchanges: async(req, res) => {
        try{
            let symbolType = req.query.symbolType;
            let data = cophieu.concat(chiso, chungchiquy, chungquyen, etf, hdtl, traiphieu);
            let listData = [];
            listData = data.filter((x) => x.type.search(symbolType) >= 0);
            if (listData && listData.length > 0) {
                const datamap = listData.map((d) => ({
                    description: d.description,
                    exchange: d.exchange,
                    exchange_logo: "",
                    full_name: d.symbol,
                    logo_urls: [""],
                    symbol: d.symbol,
                    type: d.type
                }));
                res.json({code: 200, data: datamap});
            } else {
                res.json({code: 200, data: data});
            }
        }catch(err) {
            res.json({code: 500, error: err});
        }
    }
}

module.exports = chartController;