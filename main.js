const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Membuat instance client baru
const client = new Client();

// Ketika client siap, jalankan kode ini (hanya sekali)
client.once('ready', () => {
    console.log('Client is ready!');
});

// Ketika QR-Code diterima, tampilkan QR menggunakan qrcode-terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Menangani pesan dan mengubahnya menjadi stiker jika sesuai
client.on("message", async (msg) => {
    if (msg.body.startsWith("!sticker") && msg.hasMedia && msg.type === "image") {
        const sticker = await msg.downloadMedia();
        client.sendMessage(msg.from, sticker, { sendMediaAsSticker: true });
    }
});

// Mulai client
client.initialize();
