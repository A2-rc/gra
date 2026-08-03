const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Owner\\.gemini\\antigravity\\brain\\4c5758d5-2056-4ac5-95e8-ff4656ce2d90\\.user_uploaded';
const destDir = 'C:\\Users\\Owner\\.gemini\\antigravity\\scratch\\arc-editz-portfolio\\assets\\images';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const mapping = {
    'media__1785706844477.jpg': 'logo.jpg',
    'media__1785706844500.jpg': 'design1_birthday.jpg',
    'media__1785706844514.jpg': 'design2_terah_compliance.jpg',
    'media__1785706844547.jpg': 'design3_zion.jpg',
    'media__1785706844759.jpg': 'design4_terah_app.jpg'
};

for (const [srcName, destName] of Object.entries(mapping)) {
    const srcPath = path.join(srcDir, srcName);
    const destPath = path.join(destDir, destName);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${srcName} -> ${destName}`);
    } else {
        console.log(`Not found: ${srcPath}`);
    }
}
