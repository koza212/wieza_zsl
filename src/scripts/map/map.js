export class Map {
    constructor(imagePath) {
        this.imagePath = imagePath;
        this.width = 0;
        this.height = 0;
        this.pixelGrid = [];
    }

    async load() {
        const imageData = await this.loadImageData(this.imagePath);
        this.width = imageData.width;
        this.height = imageData.height;
        this.pixelGrid = this.processImage(imageData);
    }


    draw(ctx, viewport) {
        const startRow = Math.max(0, Math.floor(viewport.y));
        const endRow = Math.min(this.pixelGrid.length, Math.ceil(viewport.y + viewport.height));
        const startCol = 0; 
        const endCol = Math.min(this.pixelGrid[0].length, Math.ceil(viewport.width));
        
        for (let row = startRow; row < endRow; row++) {
            for (let col = startCol; col < endCol; col++) {
                const surface = this.pixelGrid[row][col];
    
                if (surface.type === "empty") continue; 
                if (surface.type === "wall") ctx.fillStyle = "red";
                else if (surface.type === "platform") ctx.fillStyle = "blue";
                else if (surface.type === "slopeRight") ctx.fillStyle = "green";
                else if (surface.type === "slopeLeft") ctx.fillStyle = "yellow";
    
                ctx.fillRect(col, row - viewport.y, 1, 1); 
            }
        }
    }
    getSurfaceType(color) {
        if (color.r === 255 && color.g === 0 && color.b === 0) return { type: "wall", angle: 90 };
        if (color.r === 0 && color.g === 0 && color.b === 255) return { type: "platform", angle: 0 };
        if (color.r === 0 && color.g === 255 && color.b === 0) return { type: "slopeRight", angle: 45 };
        if (color.r === 255 && color.g === 255 && color.b === 0) return { type: "slopeLeft", angle: -45 };
        return { type: "empty", angle: null };
    }

    loadImageData(imagePath) {
        const img = new Image();
        img.src = imagePath;
        
        return new Promise((resolve, reject) => {
            img.onload = () => {
                // Temporary canvas used just to take data from image
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                resolve(ctx.getImageData(0, 0, img.width, img.height));
            };
            img.onerror = reject;
        });
    }

    processImage(imageData) {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;

        const grid = [];

        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;
                const color = { r: data[i], g: data[i + 1], b: data[i + 2] };
                row.push(this.getSurfaceType(color));
            }
            grid.push(row);
        }
        return grid;
    }
}
