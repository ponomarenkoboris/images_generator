import os, json
from image_generator.generator import RandomImageGenerator

if __name__ == '__main__':
    try:
        with open(os.path.join('root_configuration.json'), 'r') as fs:
            root_conf = json.load(fs)
            metadata = root_conf.pop('token_metadata', None)
            output_conf = root_conf.pop('output_image_configuration', None)
            images_count = output_conf.pop('images_count')
            is_uniques = output_conf.pop('sequences_is_unique')
            time_limit = output_conf.pop('time_limit')
    except:
        raise Exception('Something went wrong while trying to read configuration file')

    images_dir_list = os.listdir(os.path.join('images'))
    generator = RandomImageGenerator(
        images_dir_list=images_dir_list,
        token_metadata=metadata,
        output_config=output_conf
    )
    generator.generate(images_count, is_uniques, time_limit)
    generator.draw_images()