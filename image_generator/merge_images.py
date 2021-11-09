import os
from PIL import Image

IMAGE_ROOT = os.path.join(os.path.abspath(os.path.join('images')))
find_item = lambda image_name, list: [image for image in list if image.split('.')[0].split('#')[0] == image_name][0]

default_conf = {
    'size': {
        'width': 1416,
        'height': 672
    },
    "backgroud_color_rgba": [255, 255, 255, 255] # alpha: 255 == 100%
}

def merge_images(filename=None, data=None, output=None, conf=None):

    if data is None:
        raise Exception('Images data cannot be None')

    if output is None:
        raise Exception('Output path cannot be None')

    if filename is None:
        raise Exception('Output filename cannot be None')

    if conf is None:
        conf = default_conf

    images = []

    for section, value in data.items():
        images_list = os.listdir(os.path.join(IMAGE_ROOT, section))
        images.append([section, find_item(value, images_list)])

    new_image = Image.new(
        mode='RGBA',
        size=(conf['size']['width'], conf['size']['height']),
        color=tuple(conf['backgroud_color_rgba'])
    )

    for section, image in images:
        img = Image.open(os.path.join(IMAGE_ROOT, section, image))
        new_image.paste(img, (0, 0), img)

    new_image.save(f'{output}/{filename}.png', 'PNG')