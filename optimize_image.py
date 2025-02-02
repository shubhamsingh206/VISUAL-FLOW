from PIL import Image
import os

def optimize_image(input_path, output_path=None, quality=85, max_size=(1920, 1080)):
    """
    Optimize an image by:
    1. Resizing to max dimensions
    2. Compressing with specified quality
    3. Converting to WebP for better compression
    """
    if output_path is None:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}_optimized.webp"
    
    with Image.open(input_path) as img:
        # Resize image maintaining aspect ratio
        img.thumbnail(max_size, Image.LANCZOS)
        
        # Convert to RGB mode if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Save as WebP with compression
        img.save(output_path, 'WEBP', quality=quality, method=6)
    
    # Print file sizes for comparison
    original_size = os.path.getsize(input_path)
    optimized_size = os.path.getsize(output_path)
    print(f"Original size: {original_size/1024:.2f} KB")
    print(f"Optimized size: {optimized_size/1024:.2f} KB")
    print(f"Compression ratio: {original_size/optimized_size:.2f}x")

# Optimize the specific image
optimize_image(
    'inca-mayan-design-sculpted-stones.jpg', 
    'inca-mayan-design-sculpted-stones.webp'
)
