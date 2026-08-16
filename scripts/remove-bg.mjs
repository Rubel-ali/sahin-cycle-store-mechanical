import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';

const directoryPath = path.join(process.cwd(), 'public', 'products');

async function removeBackground() {
  try {
    const files = fs.readdirSync(directoryPath);
    
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg')) {
        const filePath = path.join(directoryPath, file);
        console.log(`Processing ${file}...`);
        
        try {
          // Read the image
          const image = await Jimp.read(filePath);
          
          // Define the threshold for white (how close to pure white before it becomes transparent)
          const threshold = 230; // RGB values above this will be considered white
          
          // Scan all pixels
          image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            // idx is the index of the red channel for this pixel
            // idx+1 is green, idx+2 is blue, idx+3 is alpha
            
            const red = this.bitmap.data[idx];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];
            
            // If the pixel is close to white, make it transparent
            if (red > threshold && green > threshold && blue > threshold) {
              this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
            }
          });
          
          // Save over the original file (if PNG) or as a new PNG
          const outputPath = filePath.replace('.jpg', '.png');
          await image.write(outputPath);
          console.log(`Successfully processed ${file}`);
        } catch (err) {
          console.error(`Error processing ${file}:`, err);
        }
      }
    }
    console.log('Finished processing all images.');
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

removeBackground();
