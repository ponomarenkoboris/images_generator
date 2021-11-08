import random, os, shutil, json, time
from .merge_images import merge_images

PATH_ROOT = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../')

class RandomImageGenerator:
    __content = []
    __sequences = []
    __metadata = None
    __output_config = None

    def __choice(self, images, weights):
        result = random.choices(images, weights=weights)[0]
        return result, str(images.index(result))

    def __init__(self, images_dir_list, token_metadata, output_config):
        self.images_dir = images_dir_list
        self.__metadata = token_metadata
        self.__output_config = output_config

    @property
    def content(self):
        return self.__content

    def generate(self, count = 1, generator_time_limit = False):
        content = []

        timeout = time.time() + generator_time_limit if generator_time_limit != False else None

        while count > 0:
            if timeout is not None and timeout - time.time() <= 0:
                break

            image = {}
            sequence = ''

            for dir_name in self.images_dir:
                content_list = os.listdir(os.path.join('images', dir_name))
                names = []
                percents = []

                for filename in content_list:
                    name, percent = filename.split('.')[0].split('#')
                    names.append(name)
                    percents.append(int(percent))

                result, index = self.__choice(names, percents)
                image[dir_name] = result
                sequence += index

            if sequence not in self.__sequences:
                self.__sequences.append(sequence)
                content.append(image)
                count -= 1

        self.__content = content
        return content

    def draw_images(self):
        if len(self.__content) == 0:
            raise ValueError(f'You have not generate images: len(self.content) = {len(self.__content)}')

        dist_dir = os.path.join(PATH_ROOT, 'assets')
        if os.path.exists(dist_dir) is True:
            shutil.rmtree(dist_dir)

        os.mkdir(dist_dir)

        counter = 0
        output_path = os.path.join(PATH_ROOT, 'assets')

        if self.__metadata is None:
            raise Exception(f'Missing token metadata. {os.path.join(PATH_ROOT, "root_configuration.json")}')

        for image_settings in self.__content:
            settings = {}

            merge_images(
                filename=counter,
                data=image_settings,
                output=output_path,
                conf=self.__output_config
            )

            for section, value in self.__metadata.items():
                settings[section] = value
                if section == 'symbol':
                    settings[section] = f'{value}-{counter}'

                if section == 'name':
                    settings[section] += f' #{counter}'

                if section == "image":
                    settings[section] = f'{counter}.png'

                if section == 'properties':
                    settings[section]["files"] = [{"uri": f'{counter}.png', "type": "image/png"}]

                if section == 'attributes':
                    settings[section] = [
                        {'trait_type': trait_type, 'value': value} for trait_type, value in image_settings.items()
                    ]

            try:
                with open(os.path.join(output_path, f'{counter}.json'), 'w') as fs:
                    json.dump(settings, fs, indent=4)
            except:
                raise Exception('Something went wrong while trying to write .json file for an image.')

            counter += 1

        return 'Success!'