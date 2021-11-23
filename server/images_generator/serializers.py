from rest_framework import serializers
from .models import *

# Token Metadata serializers
class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['name', 'family']


class CreatorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creator
        fields = ['address', 'share']

class PropertySerializer(serializers.ModelSerializer):
    creators = CreatorsSerializer(many=True)

    class Meta:
        model = Properties
        fields = ['category', 'creators']

class MetadataSerializer(serializers.ModelSerializer):
    """ Serializing metadata """
    collection = CollectionSerializer()
    properties = PropertySerializer()

    class Meta:
        model = TokenMetadata
        fields = [
            'name',
            'symbol',
            'description',
            'seller_fee_basis_points',
            'collection',
            'properties'
        ]

    def create(self, validated_data):
        properties = validated_data.pop('properties')
        collection = validated_data.pop('collection')
        metadata_instance = TokenMetadata.objects.create(**validated_data)
        Collection.objects.create(metadata=metadata_instance, name=collection['name'], family=collection['family'])

        for creator in properties['creators']:
            address = list(creator.items())[0][1]
            share = list(creator.items())[1][1]
            properties_instance = Properties.objects.create(metadata=metadata_instance, category=properties['category'])
            Creator.objects.create(property=properties_instance, address=address, share=share)

        return metadata_instance

# Output config serializer (Algorithm config serializer)
class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SizeConfig
        fields = ['width', 'height']

class AlgorithmSerializer(serializers.ModelSerializer):
    size = SizeSerializer()

    class Meta:
        model = AlgorithmConfig
        fields = [
            'images_count',
            'time_limit',
            'sequences_is_unique',
            'backgroud_color_rgba',
            'size'
        ]

    def create(self, validated_data):
        size = validated_data.pop('size')
        conf_instance = AlgorithmConfig.objects.create(**validated_data)
        SizeConfig.objects.create(conf=conf_instance, height=size['height'], width=size['width'])
        return conf_instance

# Candy Machine Setup
class CandyMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandyMachine
        fields = [
            'solana_cluster',
            'candy_machine_id',
            'start_date',
            'config',
            'authority',
            'rpc_host'
        ]