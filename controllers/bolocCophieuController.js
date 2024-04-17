const axios = require('axios');
const bolocCophieuController = {
    GetDataByFilter: async (req, res) => {
        try {
            const response = await axios({
                method: "POST",
                url: "https://fwtapi3.fialda.com/api/services/app/Stock/GetDataByFilter",
                data: req.body
            });
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 502, error: err });
        }

    },
    thiTruongChuyenSauChiSo: async (req, res) => {
        try {
            const response = await axios({
                method: "GET",
                url: "https://market.fiintrade.vn/MarketInDepth/GetLatestIndices?language=vi&pageSize=999999&status=1",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEMEJGODU0MDk5ODBCNTcyQTNCN0ZFMUJFOTQwNjcxRkNCMUJEMkQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyUXY0VkFtWUMxY3FPM19odnBRR2NmeXh2UzAifQ.eyJuYmYiOjE3MTMzNjM3NDgsImV4cCI6MTcxMzM5MjM0OCwiaXNzIjoiaHR0cHM6Ly9hdXRoLmZpaW50cmFkZS52biIsImF1ZCI6WyJodHRwczovL2F1dGguZmlpbnRyYWRlLnZuL3Jlc291cmNlcyIsIkZpaW5UcmFkZS5NYXJrZXQiLCJGaWluVHJhZGUuQ29yZSIsIkZpaW5UcmFkZS5SZWFsdGltZSIsIkZpaW5UcmFkZS5GdW5kYW1lbnRhbCJdLCJjbGllbnRfaWQiOiJTdG94UGx1cy5GaWluVHJhZGUuU1BBIiwic3ViIjoiMjQwOTkxIiwiYXV0aF90aW1lIjoxNzEzMzYzNzQ4LCJpZHAiOiJsb2NhbCIsInVzZXJfaWQiOiIyNDA5OTEiLCJ1c2VyX25hbWUiOiJsYW1jYW8yMjA1QGdtYWlsLmNvbSIsIm5hbWUiOiIiLCJnaXZlbl9uYW1lIjoiTGFtIiwiZmFtaWx5X25hbWUiOiJDYW8iLCJtaWRkbGVfbmFtZSI6IiIsImVtYWlsIjoibGFtY2FvMjIwNUBnbWFpbC5jb20iLCJzZXJ2aWNlX3R5cGUiOiJGaWluR3JvdXAuRmlpblRyYWRlIiwibGlzdF9wYWNrYWdlIjoiRmlpblRyYWRlLlRyaWFsIiwibGlzdF9mZWF0dXJlIjoiIiwibGlzdF9hcGkiOiIiLCJyb2xlIjoiQ1VTVE9NRVIiLCJncm91cF9uYW1lIjoiSW5kaXZpZHVhbCIsInN0YXJ0X2RhdGUiOiIyNi8wMy8yMDI0IiwiZW5kX2RhdGUiOiIwOS8wNC8yMDI0IiwiaGl0Y291bnRfcGVybW9udGgiOiIwIiwiY29tZ3JvdXBfbGltaXQiOiIiLCJ0aWNrZXJfbGltaXQiOiIiLCJ0aW1lcmFuZ2VfbGltaXQiOiIwIiwiZGF0YXJhbmdlX2xpbWl0IjoiMCIsInBlcl9taW51dGUiOiIwIiwicGVyX2hvdXIiOiIwIiwicGVyX2RheSI6IjAiLCJwZXJfbW9udGgiOiIwIiwiZW5hYmxlZCI6IlRydWUiLCJsYXN0X2F0dGVtcHQiOiIyNi8wMy8yMDI0IDExOjIyOjI0IENIIiwibGFzdF9hdHRlbXB0X3N0YXR1cyI6IlNVQ0NFU1MiLCJmaW5nZXJwcmludCI6IjI5YTNmMmRjNDUyMzcwNTcxMmUwMzM2MzJhZjMxYjY2IiwiY2xpZW50dHlwZSI6IldFQkNMSUVOVCIsInNjb3BlIjpbIm9wZW5pZCIsIkZpaW5UcmFkZS5NYXJrZXQiLCJGaWluVHJhZGUuQ29yZSIsIkZpaW5UcmFkZS5SZWFsdGltZSIsIkZpaW5UcmFkZS5GdW5kYW1lbnRhbCJdLCJhbXIiOlsicHdkIl19.APuqpNv4si5l_HHpV17AAFJpXwF7IT6KV9NRdFBJIj6ZRplntdS1rUaFBwfURoq2b2vkbUGbEOOQESNe0Cie762_0nTI9dk7mgAvJQnCE3kh7GaE1_w37Pe1zEevYlFCdH5dzKXP6f82C6-1oALWskZFAxbJ7PcoRbgk9tJP4Of7z3RZCCbzFWsRSA4f5OeGuPrQr2Oh_wXjvfMwrxM6ckr3a6PsI1yfAZsrIjn3bZwmk5wodjh4-PcwcEAgcVZKYuapSG4mpJ9GjzMEOv1aa8cOKnqvlkH2cSn7XPWvQa7KGLtWXbi-UZAXJaQnT4Yv2-zAfPpDgNxWKyJq9e7rOA',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Host': 'tools.fiintrade.vn',
                    'Origin': "https://fiintrade.vn",
                    'Pragma': 'no-cache',
                    'Referer': 'https://fiintrade.vn/',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': "Windows",
                },
            });
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 502, error: err });
        }
    },
    thiTruongChuyenSauChiSoDetail: async (req, res) => {
        try {
            const response = await axios({
                method: "GET",
                url: `https://market.fiintrade.vn/MarketInDepth/GetIndexSeries?language=vi&ComGroupCode=${req.query.ComGroupCode}&TimeRange=${req.query.TimeRange}&id=1`,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEMEJGODU0MDk5ODBCNTcyQTNCN0ZFMUJFOTQwNjcxRkNCMUJEMkQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyUXY0VkFtWUMxY3FPM19odnBRR2NmeXh2UzAifQ.eyJuYmYiOjE3MTMzNjM3NDgsImV4cCI6MTcxMzM5MjM0OCwiaXNzIjoiaHR0cHM6Ly9hdXRoLmZpaW50cmFkZS52biIsImF1ZCI6WyJodHRwczovL2F1dGguZmlpbnRyYWRlLnZuL3Jlc291cmNlcyIsIkZpaW5UcmFkZS5NYXJrZXQiLCJGaWluVHJhZGUuQ29yZSIsIkZpaW5UcmFkZS5SZWFsdGltZSIsIkZpaW5UcmFkZS5GdW5kYW1lbnRhbCJdLCJjbGllbnRfaWQiOiJTdG94UGx1cy5GaWluVHJhZGUuU1BBIiwic3ViIjoiMjQwOTkxIiwiYXV0aF90aW1lIjoxNzEzMzYzNzQ4LCJpZHAiOiJsb2NhbCIsInVzZXJfaWQiOiIyNDA5OTEiLCJ1c2VyX25hbWUiOiJsYW1jYW8yMjA1QGdtYWlsLmNvbSIsIm5hbWUiOiIiLCJnaXZlbl9uYW1lIjoiTGFtIiwiZmFtaWx5X25hbWUiOiJDYW8iLCJtaWRkbGVfbmFtZSI6IiIsImVtYWlsIjoibGFtY2FvMjIwNUBnbWFpbC5jb20iLCJzZXJ2aWNlX3R5cGUiOiJGaWluR3JvdXAuRmlpblRyYWRlIiwibGlzdF9wYWNrYWdlIjoiRmlpblRyYWRlLlRyaWFsIiwibGlzdF9mZWF0dXJlIjoiIiwibGlzdF9hcGkiOiIiLCJyb2xlIjoiQ1VTVE9NRVIiLCJncm91cF9uYW1lIjoiSW5kaXZpZHVhbCIsInN0YXJ0X2RhdGUiOiIyNi8wMy8yMDI0IiwiZW5kX2RhdGUiOiIwOS8wNC8yMDI0IiwiaGl0Y291bnRfcGVybW9udGgiOiIwIiwiY29tZ3JvdXBfbGltaXQiOiIiLCJ0aWNrZXJfbGltaXQiOiIiLCJ0aW1lcmFuZ2VfbGltaXQiOiIwIiwiZGF0YXJhbmdlX2xpbWl0IjoiMCIsInBlcl9taW51dGUiOiIwIiwicGVyX2hvdXIiOiIwIiwicGVyX2RheSI6IjAiLCJwZXJfbW9udGgiOiIwIiwiZW5hYmxlZCI6IlRydWUiLCJsYXN0X2F0dGVtcHQiOiIyNi8wMy8yMDI0IDExOjIyOjI0IENIIiwibGFzdF9hdHRlbXB0X3N0YXR1cyI6IlNVQ0NFU1MiLCJmaW5nZXJwcmludCI6IjI5YTNmMmRjNDUyMzcwNTcxMmUwMzM2MzJhZjMxYjY2IiwiY2xpZW50dHlwZSI6IldFQkNMSUVOVCIsInNjb3BlIjpbIm9wZW5pZCIsIkZpaW5UcmFkZS5NYXJrZXQiLCJGaWluVHJhZGUuQ29yZSIsIkZpaW5UcmFkZS5SZWFsdGltZSIsIkZpaW5UcmFkZS5GdW5kYW1lbnRhbCJdLCJhbXIiOlsicHdkIl19.APuqpNv4si5l_HHpV17AAFJpXwF7IT6KV9NRdFBJIj6ZRplntdS1rUaFBwfURoq2b2vkbUGbEOOQESNe0Cie762_0nTI9dk7mgAvJQnCE3kh7GaE1_w37Pe1zEevYlFCdH5dzKXP6f82C6-1oALWskZFAxbJ7PcoRbgk9tJP4Of7z3RZCCbzFWsRSA4f5OeGuPrQr2Oh_wXjvfMwrxM6ckr3a6PsI1yfAZsrIjn3bZwmk5wodjh4-PcwcEAgcVZKYuapSG4mpJ9GjzMEOv1aa8cOKnqvlkH2cSn7XPWvQa7KGLtWXbi-UZAXJaQnT4Yv2-zAfPpDgNxWKyJq9e7rOA',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Host': 'tools.fiintrade.vn',
                    'Origin': "https://fiintrade.vn",
                    'Pragma': 'no-cache',
                    'Referer': 'https://fiintrade.vn/',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': "Windows",
                },
            });
            res.json({ code: 200, data: response.data });
        } catch (err) {
            res.json({ code: 502, error: err });
        }
    }
}
module.exports = bolocCophieuController;