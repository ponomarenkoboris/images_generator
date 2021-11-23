from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from .generator.generator import RandomImageGenerator
from . import serializers
from . import models
import os, shutil, urllib.request, base64

PATH_ROOT = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../')

class TokenMetadata(APIView):
    """ Token Metadata API """

    def post(self, request):
        """
        Update server token_metadata

        :param request: token metadata to save
        :return: message of success or not success
        """

        token_metadata = request.data or None

        if token_metadata is not None:
            models.TokenMetadata.objects.all().delete()

            data = serializers.MetadataSerializer(data=token_metadata)
            if data.is_valid():
                data.save()
                return Response(
                    data={'message': 'Token metadata was successfully created'},
                    status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    data={'message': 'Token metadata is not valid!'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                data={'message': 'Token metadata is not passed!'},
                status=status.HTTP_403_FORBIDDEN
            )

class AlgorithmConfiguration(APIView):
    """ Algorithm configuration API """

    def post(self, request):
        """
        Create configuration

        :param request: algorithm configuration to save
        :return: message of success or not success
        """


        alg_conf = request.data or None

        if alg_conf is not None:
            models.AlgorithmConfig.objects.all().delete()

            conf = serializers.AlgorithmSerializer(data=alg_conf)
            if conf.is_valid():
                conf.save()
                return Response(
                    data={'message': 'Algorithm configuration was successfully created'},
                    status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    data={'message': 'Algorithm configuration is not valid!'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                data={'message': 'Algorithm configuration was not passed'},
                status=status.HTTP_403_FORBIDDEN
            )

class Collectables(APIView):
    """ Collections API """

    def post(self, request):
        """
        Create assets

        :param request: token metadata, algorithm setup and folders with assets slices
        :return: zip archive with created assets and metadata
        """

        images_dir = os.path.join(PATH_ROOT, 'images')
        if os.path.exists(images_dir) is True:
            shutil.rmtree(images_dir)
        os.mkdir(images_dir)

        token_metadata = request.data.get('metadata', None)
        algorithm_conf = request.data.get('outputConf', None)
        images_count = algorithm_conf.pop('images_count')
        is_uniques = algorithm_conf.pop('sequences_is_unique')
        time_limit = algorithm_conf.pop('time_limit')
        assets_slices = request.data.get('assetsSlices', None)

        token_metadata['attributes'] = []
        token_metadata['image'] = ''

        for folder in assets_slices:
            folder_name = folder['folderName']
            os.mkdir(os.path.join(images_dir, folder_name))

            for asset in folder['assets']:
                name, url = asset['name'], asset['url']
                response = urllib.request.urlopen(url)
                with open(os.path.join(images_dir, folder_name, name), 'wb') as file:
                    file.write(response.file.read())

        generator = RandomImageGenerator(
            images_dir_list=os.listdir(images_dir),
            token_metadata=token_metadata,
            output_config=algorithm_conf
        )

        generator.generate(images_count, is_uniques, time_limit)
        generator.draw_images()

        zip_archive_path = shutil.make_archive('assets', 'zip', os.path.join(PATH_ROOT, 'assets'))
        zip_archive = open(zip_archive_path, 'rb')

        shutil.rmtree(os.path.join(PATH_ROOT, 'assets'))
        response = HttpResponse(zip_archive, content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename=assets.zip'
        os.remove(os.path.join('assets.zip'))

        return response

class GetConf(APIView):
    def get(self, request):
        """
        Get all config in database

        :param request: empty
        :return: all saved data
        """

        response_data = {}

        token_metadata = models.TokenMetadata.objects.all()
        token_metadata = serializers.MetadataSerializer(token_metadata, many=True).data
        response_data['metadata'] = token_metadata[0] if len(token_metadata) != 0 else None

        conf = models.AlgorithmConfig.objects.all()
        conf = serializers.AlgorithmSerializer(conf, many=True).data
        response_data['outputConf'] = conf[0] if len(conf) != 0 else None

        folders = []
        images_folder_abs_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../', 'images')
        folders_names = os.path.exists(images_folder_abs_path) and os.listdir(images_folder_abs_path)

        if folders_names is False or len(folders_names) == 0:
            return Response(
                data=response_data,
                status=status.HTTP_200_OK
            )

        count = 0
        for folder_name in folders_names:
            folder = {'id': count + 1, 'folderName': folder_name}

            assets = []
            asset_count = 0
            for asset_name in os.listdir(os.path.join(images_folder_abs_path, folder_name)):
                encoded = base64.b64encode(open(os.path.join(images_folder_abs_path, folder_name, asset_name), 'rb').read()).decode('ascii')
                assets.append({
                    'id': asset_count + 1,
                    'url': 'data:image/png;base64,{}'.format(encoded),
                    'name': asset_name
                })
                asset_count += 1

            folder['assets'] = assets
            folders.append(folder)
            count += 1

        response_data['assetsSlices'] = folders

        return Response(
            data=response_data,
            status=status.HTTP_200_OK
        )

class CandyMachineConfig(APIView):
    """ Candy Machine configuration """

    def get(self, request):
        """
        Get candy saved configuration

        :param request: empty
        :return: candy_conf or empty
        """

        candy_conf = models.CandyMachine.object.all()
        candy_conf = serializers.CandyMachineSerializer(candy_conf, many=True).data

        if len(candy_conf) == 0:
            return Response(
                data={'message': 'There is no saved candy machine configuration'},
                status=status.HTTP_200_OK
            )

        return Response(
            data={'message': 'Candy machine configuration got successfully', 'candyConfig': candy_conf},
            status=status.HTTP_200_OK
        )

    def post(self, request):
        """
        Save candy machine configuration

        :param request: candy machine configuration
        :return: message about success or not success saving
        """

        candy_conf = request.data
        candy_conf = serializers.CandyMachineSerializer(data=candy_conf)

        if candy_conf.is_valid():
            candy_conf.save()
            return Response(
                data={'message': 'Candy configuration was successfully saved'},
                status=status.HTTP_201_CREATED
            )

        else:
            return Response(
                data={'message': 'Candy machine configuration is not valid'},
                status=status.HTTP_403_FORBIDDEN
            )