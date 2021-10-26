import os
from image_generator.generator import RandomImageGenerator

if __name__ == '__main__':
    generator = RandomImageGenerator(os.listdir(os.path.join('images')))
    generator.generate(10) # Сonfiguring count of generated images

    generator.draw_images()