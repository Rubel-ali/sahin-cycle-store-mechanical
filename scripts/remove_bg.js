const { Jimp } = require('jimp');
const path = require('path');

async function processImage(filename) {
    const filePath = path.join(__dirname, '../public/products', filename);
    const outPath = filePath.replace('.jpg', '.png');
    
    try {
        console.log(`Processing ${filename}...`);
        const image = await Jimp.read(filePath);
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            // If it's very close to white
            if (r > 230 && g > 230 && b > 230) {
                this.bitmap.data[idx + 3] = 0; // Alpha to 0
            }
        });
        
        await image.write(outPath);
        console.log(`Saved ${outPath}`);
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    await processImage('vintage-city-classic.jpg');
    await processImage('urban-commuter-elite.jpg');
}

main();
