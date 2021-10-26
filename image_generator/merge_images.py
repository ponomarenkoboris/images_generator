import os
from PIL import Image
# TODO Resize and crop images
# TODO add marking images logic

IMAGE_ROOT = os.path.join(os.path.abspath(os.path.join('images')))
find_item = lambda image_name, list: [image for image in list if image.split('.')[0].split('#')[0] == image_name][0]

default_conf = {
    'size': {
        'width': 1416,
        'height': 569
    },
    "mark-image": False,
    "backgroud-color-rgba": [255, 255, 255, 255] # alpha: 255 == 100%
}

def merge_images(filename=None, data=None, output=None, conf=None):

    if data is None or output is None or filename is None:
        raise Exception('There is no images')

    if conf is None:
        conf = default_conf

    images = []

    for section, value in data.items():
        images_list = os.listdir(os.path.join(IMAGE_ROOT, section))
        images.append([section, find_item(value, images_list)])

    new_image = Image.new(
        mode='RGBA',
        size=(conf['size']['width'], conf['size']['height']),
        color=tuple(conf['backgroud-color-rgba'])
    )

    for section, image in images:
        img = Image.open(os.path.join(IMAGE_ROOT, section, image))
        new_image.paste(img, (0, 0), img)

    new_image.save(f'{output}/{filename}.png', 'PNG')