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
    }, 
    getHtml: async(req, res) => {
        try {
            const url = req.query.url;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data})
        }catch (err) {
            res.json({code : 500, error: err});
        }
    },
    getDataCafef: async(req, res) => {
        try {
            const url = "https://msh-appdata.cafef.vn/rest-api/api/v1/OverviewOrgnizaztion/0/20231119/15?symbol=VNINDEX";
            const response = await axios.get(url);
            console.log(response.data);
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    tcttTheGioi: async (req, res) => {
        try {
            const type = req.query.type || "";
            const url = "https://s.cafef.vn/ajax/mobile/smart/ajaxchisothegioi.ashx?type="+type;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    tcttVietNam: async (req, res) => {
        try {
            const typeChart = req.query.typeChart || "";
            const index = req.query.index || "1;2;9;11;12";
            const type = req.query.type || "market";
            const floorCode = req.query.floorCode || "1";
            if (typeChart && typeChart.length > 0) {
                const urlTime = `https://s.cafef.vn/Ajax/Mobile/Smart/AjaxChartDataCenter.ashx?floorCode=${floorCode}&typeChart=${typeChart}`;
                const responseTime = await axios.get(urlTime);
                res.json({code: 200, data: responseTime.data.Data});
            } else {
                const url = `https://s.cafef.vn/Ajax/PageNew/RealtimeChartHeader.ashx?index=${index}&type=${type}`;
                const response = await axios.get(url);
                res.json({code: 200, data: response.data});
            }
        } catch (err) {
            res.json({code: 500, error: err});
        }
    },
    top10CoPhieu: async(req, res) => {
        try {
            const centerID = req.query.centerID || "HOSE";
            const type = req.query.type || "UP";
            const url = `https://s.cafef.vn/Ajax/Mobile/Smart/AjaxTop10CP.ashx?centerID=${centerID}&type=${type}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    dinhGiaIndex: async (req, res) => {
        try {
            const url = `https://s.cafef.vn/Ajax/PageNew/FinanceData/GetDataChartPE.ashx`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    khoiNgoai: async(req, res) => {
        try {
            const type = req.query.type || "buy";
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxkhoingoai.ashx?type=${type}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    nhomDanDatThiTruong: async(req, res) => {
        try {
            const centerId = req.query.centerId || 1;
            const url = `https://msh-appdata.cafef.vn/rest-api/api/v1/MarketLeaderGroup?centerId=${centerId}&take=10`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    top10TruyCap: async(req, res) => {
        try {
            const TypeGA = req.query.TypeGA || 7;
            const url = `https://s.cafef.vn/Ajax/Mobile/Smart/AjaxTop10TraCuu.ashx?TypeGA=${TypeGA}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    dienBienGiaoDichKhoiNgoai: async(req, res) => {
        try {
            const dataDate = new Date();
            const time = dataDate.getFullYear() + "" + (dataDate.getMonth() + 1) + "" + dataDate.getDate();
            const symbol = req.query.symbol || "VNINDEX";
            const url = `https://msh-appdata.cafef.vn/rest-api/api/v1/OverviewOrgnizaztion/0/${time}/15?symbol=${symbol}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    thanhKhoanThiTruong: async(req, res) => {
        try {
            const symbol = req.query.symbol || "HOSE"
            const url = `https://msh-appdata.cafef.vn/rest-api/api/v1/Liquidity/${symbol}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    dataHangHoa: async(req, res) => {
        try {
            const type = req.query.type || 1;
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxhanghoa.ashx?type=${type}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    giaodichTuDoanh: async(req, res) => {
        try {
            const symbol = req.query.symbol || "VNINDEX";
            const dataDate = new Date();
            const time = dataDate.getFullYear() + "" + (dataDate.getMonth() + 1) + "" + dataDate.getDate();
            const url = `https://s.cafef.vn/Ajax/PageNew/DataHistory/PriceHistory.ashx?Symbol=${symbol}&StartDate=&EndDate=&PageIndex=1&PageSize=20`;
            const response = await axios.get(url);
            const urlOver = `https://msh-appdata.cafef.vn/rest-api/api/v1/OverviewOrgnizaztion/1/${time}/20?symbol=${symbol}`
            const responseOver = await axios.get(urlOver);
            const dataRes = {
                priceHistory: response.data.Data,
                overView: responseOver.data
            }
            res.json({code: 200, data: dataRes});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    topTuDoanh: async(req, res) => {
        try {
            const type = req.query.type || "BUYVALUE";
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxgiaodichtudoanh.ashx?type=${type}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    fDoRongThiTruong: async(req, res) => {
        try {
            const centerID = req.query.centerID || "HOSE";
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxdorongthitruong.ashx?centerID=${centerID}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    bandoThitruong: async(req, res) => {
        try {
            const type = req.query.type || 1;
            const category = req.query.category || 0;
            const centerId = req.query.centerId || 1;
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxbandothitruong.ashx?type=${type}&category=${category}&centerId=${centerId}`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    },
    thitruongNgoaiHoi: async(req, res)=> {
        try {
            const url = `https://s.cafef.vn/ajax/mobile/smart/ajaxtygia.ashx`;
            const response = await axios.get(url);
            res.json({code: 200, data: response.data.Data});
        }catch(err) {
            res.json({code: 500, error: err});
        }
    }
    
}
module.exports = vimoController;