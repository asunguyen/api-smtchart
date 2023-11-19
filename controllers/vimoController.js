const axios = require('axios');
const vimoController = {
    marketTotal: async(req, res) => {
        try {
            const time = req.query.time || "1D";
            const url = `https://finfo-api.vndirect.com.vn/v4/change_prices?q=code:VNINDEX,HNX,UPCOM,VN30,VN30F1M~period:${time}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    topTen: async(req, res) => {
        try {   
            const index = req.query.index || "VNIndex";
            const sort = req.query.sort || "priceChgPctCr1D";
            const url = `https://finfo-api.vndirect.com.vn/v4/top_stocks?q=index:${index}~nmVolumeAvgCr20D:gte:10000~priceChgPctCr1D:gt:0&size=10&sort=${sort}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    dinhGia: async(req, res) => {
        try {
            const index = req.query.index || "VNINDEX";
            const dateReport = req.query.reportDate || "2022-12-31"
            const historyUrl = `https://finfo-api.vndirect.com.vn/v4/ratios/latest?order=reportDate&where=code:${index}~reportDate:lte:${dateReport}&filter=itemCode:81007,81008,81013,81014,81016,81017,82005,82006,82007,82008,81001,81002,81004,81005`
            const resHist = await axios.get(historyUrl);
            const nowUrl = `https://finfo-api.vndirect.com.vn/v4/ratios/latest?order=reportDate&where=code:${index}&filter=itemCode:81007,81008,81013,81014,81016,81017,82005,82006,82007,82008,81001,81002,81004,81005`
            const resNow = await axios.get(nowUrl);
            res.json({code: 200, data: resNow.data.data, dataHistory: resHist.data.data});
        } catch(err) {
            res.json({code: 500, error: err});
        }
    },
    doRongThiTruong: async(req, res) => {
        try {
            const index = req.query.index || "VNINDEX";
            const url = `https://mkw-socket-v2.vndirect.com.vn/mkwsocketv2/gainerslosers?index=${index}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    newsNewUpdatePaging: async (req, res) => {
        try {
            const item = req.body.item;
            const row = req.body.row;
            const response = await axios.post("https://vietstock.vn/_Partials/NewsNewUpdatePaging", {item: item, row: row});
            res.json({code: 200, data: response.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    reportdatabydisplay: async (req, res) => {
        try {
            console.log(1);
            const response = await fetch("https://finance.vietstock.vn/data/reportdatabydisplay", {
                "headers": {
                  "accept": "*/*",
                  "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                  "cache-control": "no-cache",
                  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "pragma": "no-cache",
                  "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Windows\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "x-requested-with": "XMLHttpRequest",
                  "cookie": "language=vi-VN; Theme=Light; AnonymousNotification=; ASP.NET_SessionId=vi43mf31yzc502kd44p3zwsj; __RequestVerificationToken=LEFBzpdwG2XSDMXApa3ihyzll-iMHzkkSTj5CNcTm2W3BkYz2a6r30SDrYsjFOgDCptJO0xS9-udgl1u8DbfCKHwP8EN5Wgzr4SPoap2JVY1; _gid=GA1.2.550632622.1699990809; _ga_EXMM0DKVEX=GS1.1.1699990808.5.1.1699991019.59.0.0; _ga=GA1.2.1632635605.1697998948; _gat_UA-1460625-2=1",
                  "Referer": "https://finance.vietstock.vn/du-lieu-vi-mo",
                  "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": "type=true&__RequestVerificationToken=-Pv-9cKy9pW70oyMtxfvIOLd2hQOfEjDzuQq94zixGkg86z0P-boFFPaSRFF32nXPJLMv3NAGyYI8XeA_cgxQ4yiQqiFfdlQXijccwE2erM1",
                "method": "POST"
              });
            console.log("response:: ", response)
            res.json({code: 200, data: response.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    }
}
module.exports = vimoController;