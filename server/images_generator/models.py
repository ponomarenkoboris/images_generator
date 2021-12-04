from django.db import models

# Token Metadata
class TokenMetadata(models.Model):
    name = models.TextField()
    symbol = models.TextField()
    description = models.TextField()
    seller_fee_basis_points = models.IntegerField()

class Collection(models.Model):
    metadata = models.OneToOneField(TokenMetadata, related_name='collection', on_delete=models.CASCADE, blank=False)
    name = models.TextField()
    family = models.TextField()

class Properties(models.Model):
    metadata = models.OneToOneField(TokenMetadata, related_name='properties', on_delete=models.CASCADE, blank=False)
    category = models.CharField(max_length=5)

class Creator(models.Model):
    property = models.ForeignKey(Properties, related_name='creators', on_delete=models.CASCADE, blank=False)
    address = models.TextField()
    share = models.IntegerField()

# Output config (Algorithm config)
class AlgorithmConfig(models.Model):
    images_count = models.IntegerField(default=1)
    time_limit = models.BooleanField(default=False)
    sequences_is_unique = models.BooleanField(default=False)
    backgroud_color_rgba = models.TextField(default='0, 0, 0, 255')

class SizeConfig(models.Model):
    conf = models.OneToOneField(AlgorithmConfig, related_name='size', on_delete=models.CASCADE, blank=False)
    width = models.IntegerField(default=50)
    height = models.IntegerField(default=50)

# Candy Machine
class CandyMachine(models.Model):
    solana_cluster = models.CharField(max_length=7, blank=True)
    candy_machine_id = models.TextField(blank=True)
    start_date = models.TextField(blank=True)
    config = models.TextField(blank=True)
    authority = models.TextField(blank=True)
    rpc_host = models.TextField(blank=True)