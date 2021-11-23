import random, os, shutil, json, time
from .merge_images import merge_images

PATH_ROOT = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../../')

class RandomImageGenerator:
    __content = []
    __sequences = []
    __metadata = None
    __output_config = None

    def __choice(self, images, weights):
        result = random.choices(images, weights=weights)[0]
        return result, str(images.index(result))

    def __calculate_max_sequences_count(self):
        total_sequence_amount = 0
        for image_dir in self.images_dir_list:
            variants_count = len(os.listdir(os.path.join(PATH_ROOT, 'images', image_dir)))
            total_sequence_amount = total_sequence_amount * variants_count if total_sequence_amount != 0 else variants_count

        return total_sequence_amount

    def __init__(self, images_dir_list, token_metadata, output_config):
        self.images_dir_list = images_dir_list
        self.__metadata = token_metadata
        self.__output_config = output_config
        self.__max_sequences_count = self.__calculate_max_sequences_count()

    @property
    def content(self):
        return self.__content

    def generate(self, count = 1, sequences_is_unique = True, generator_time_limit = False):
        content = []
        timeout = time.time() + generator_time_limit if generator_time_limit != False else None

        while count > 0:
            if len(self.__sequences) >= self.__max_sequences_count and sequences_is_unique:
                print(f'The maximum possible number of sequences was generated: {self.__max_sequences_count}')
                break

            if timeout is not None and timeout - time.time() <= 0:
                break

            image = {}
            sequence = ''

            for dir_name in self.images_dir_list:
                content_list = os.listdir(os.path.join(PATH_ROOT, 'images', dir_name))
                names = []
                percents = []

                for filename in content_list:
                    name, percent = filename.split('.')[0].split('#')
                    names.append(name)
                    percents.append(int(percent))

                result, index = self.__choice(names, percents)
                image[dir_name] = result
                sequence += index

            if sequences_is_unique:
                if sequence not in self.__sequences:
                    self.__sequences.append(sequence)
                    content.append(image)
                    count -= 1
            else:
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

        if self.__metadata is None:
            raise Exception(f'Missing token metadata. {os.path.join("root_configuration.json")}')

        for image_settings in self.__content:
            settings = {}
            merge_images(
                filename=counter,
                data=image_settings,
                output=dist_dir,
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
                with open(os.path.join(dist_dir, f'{counter}.json'), 'w') as fs:
                    json.dump(settings, fs, indent=4)
            except:
                raise Exception('Something went wrong while trying to write .json file for an image.')

            counter += 1

        return 'Success!'