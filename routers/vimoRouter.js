const vimoController = require("../controllers/vimoController");

const router = require("express").Router();

//get all
router.get("/market", vimoController.marketTotal);
router.get("/top-10", vimoController.topTen);
router.get("/dinh-gia", vimoController.dinhGia);
router.get("/do-rong-thi-truong", vimoController.doRongThiTruong);
router.post("/viet-stock/news-new-update-paging", vimoController.newsNewUpdatePaging);
router.get("/viet-stock/report-data-by-display", vimoController.reportdatabydisplay);
router.get("/get-html", vimoController.getHtml);

router.get("/get-cafef", vimoController.getDataCafef);
router.get("/chiso-thegioi", vimoController.tcttTheGioi);
router.get("/chiso-index-vn", vimoController.tcttVietNam);
router.get("/top-10-cophieu", vimoController.top10CoPhieu);
router.get("/dinh-gia-index", vimoController.dinhGiaIndex);
router.get("/khoi-ngoai", vimoController.khoiNgoai);
router.get("/dan-dat-thi-truong", vimoController.nhomDanDatThiTruong);
router.get("/top-10-truycap", vimoController.top10TruyCap);
router.get("/dienbien-khoingoai", vimoController.dienBienGiaoDichKhoiNgoai);
router.get("/thanhkhoan-thitruong", vimoController.thanhKhoanThiTruong);
router.get("/hang-hoa", vimoController.dataHangHoa);
router.get("/giaodich-tudoanh", vimoController.giaodichTuDoanh);
router.get("/top-tudoanh", vimoController.topTuDoanh);
router.get("/dorong-thitruong", vimoController.fDoRongThiTruong);
router.get("/bando-thitruong", vimoController.bandoThitruong);
router.get("/thitruong-ngoaihoi",vimoController.thitruongNgoaiHoi);
// lịch sử giá
router.get("/du-lieu-lich-su/thong-ke-dat-lenh", vimoController.dlLichSuTKDatLenh);
router.get("/du-lieu-lich-su/lich-su-gia", vimoController.dlLichSuGia);
router.get("/du-lieu-lich-su/khoi-ngoai", vimoController.dlLichSuKhoiNgoai);
router.get("/du-lieu-lich-su/tu-doanh", vimoController.dlLichSuTuDoanh);
router.get("/du-lieu-lich-su/theo-phien", vimoController.dlLichSuTheoPhien);
router.get("/du-lieu-lich-su/dien-bien-theo-phien", vimoController.dlLichSuDienBienTheoPhien);
router.get("/du-lieu-lich-su/co-dong-noi-bo", vimoController.dlLichSuCoDongNoiBo);
//vietstock
router.get("/vietstock/moi-cap-nhat", vimoController.tintucMoiCapNhat);
router.get("/vietstock/dulieu-vimo", vimoController.dulieuVimo);
router.get("/vietstock/dulieu-tigia", vimoController.dulieuTiGia);
router.get("/vietstock/thong-ke-gia", vimoController.thongKeGia);
router.get("/vietstock/chi-so-nganh", vimoController.chisoNganh);
router.get("/vietstock/ketqua-kinhdoanh", vimoController.ketquaKinhDoanh);
router.get("/vietstock/macrooverviewchart", vimoController.macrooverviewchart);
router.get("/vietstock/giao-dich-noi-bo", vimoController.giaodichNoiBo);
router.get("/vietstock/KQGDThongKeGiaStockPaging", vimoController.thongkegia2);
router.get("/vietstock/stocklist", vimoController.stockList);
module.exports = router;
