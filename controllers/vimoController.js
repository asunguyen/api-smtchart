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
    }
}
module.exports = vimoController;