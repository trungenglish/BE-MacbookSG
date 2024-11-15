const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
    operatingSystem: String,  // Hệ điều hành
    cpu: String,              // Chip xử lý (CPU)
    gpu: String,              // Chip đồ họa (GPU)
    ram: String,              // RAM
    storage: String,          // Dung lượng lưu trữ
    availableStorage: String, // Dung lượng còn lại (khả dụng)
    rearCameraResolution: String, // Độ phân giải camera sau
    rearCameraVideo: [String],    // Quay phim camera sau
    rearCameraFlash: String,      // Đèn flash camera sau
    rearCameraFeatures: [String], // Tính năng camera sau
    frontCameraResolution: String, // Độ phân giải camera trước
    frontCameraFeatures: [String], // Tính năng camera trước
    screenTechnology: String,      // Công nghệ màn hình
    screenResolution: String,      // Độ phân giải màn hình
    screenSize: String,            // Màn hình rộng
    maxBrightness: String,         // Độ sáng tối đa
    touchGlass: String,            // Mặt kính cảm ứng
    batteryCapacity: String,       // Dung lượng pin
    batteryType: String,           // Loại pin
    maxChargingSupport: String,    // Hỗ trợ sạc tối đa
    batteryTechnology: [String],   // Công nghệ pin
    advancedSecurity: String,      // Bảo mật nâng cao
    specialFeatures: [String],     // Tính năng đặc biệt
    waterResistance: String,       // Kháng nước, bụi
    mobileNetwork: String,         // Mạng di động
    sim: String,                   // SIM
    wifi: [String],                // WiFi
    gps: [String],                 // GPS
    bluetooth: String,             // Bluetooth
    chargingPort: String,          // Cổng kết nối/ sạc
    headphoneJack: String,         // Jack tai nghe
    otherConnections: [String],    // Kết nối khác (NFC, v.v.)
    design: String,                // Thiết kế
    material: String,              // Chất liệu
    dimensions: String,            // Kích thước
    weight: String,                // Khối lượng
    releaseDate: String            // Thời điểm ra mắt
}, { timestamps: true });

const ProductDetailModel = mongoose.model('ProductDetail', productDetailSchema);

module.exports = ProductDetailModel;
