# Generated by Django 3.2.9 on 2021-11-24 15:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AlgorithmConfig',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images_count', models.IntegerField(default=1)),
                ('time_limit', models.BooleanField(default=False)),
                ('sequences_is_unique', models.BooleanField(default=False)),
                ('backgroud_color_rgba', models.TextField(default='0, 0, 0, 255')),
            ],
        ),
        migrations.CreateModel(
            name='CandyMachine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('solana_cluster', models.CharField(blank=True, max_length=7)),
                ('candy_machine_id', models.TextField(blank=True)),
                ('start_date', models.DateTimeField(blank=True)),
                ('config', models.TextField(blank=True)),
                ('authority', models.TextField(blank=True)),
                ('rpc_host', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='TokenMetadata',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('symbol', models.TextField()),
                ('description', models.TextField()),
                ('seller_fee_basis_points', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='SizeConfig',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('width', models.IntegerField(default=50)),
                ('height', models.IntegerField(default=50)),
                ('conf', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='size', to='images_generator.algorithmconfig')),
            ],
        ),
        migrations.CreateModel(
            name='Properties',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=5)),
                ('metadata', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='properties', to='images_generator.tokenmetadata')),
            ],
        ),
        migrations.CreateModel(
            name='Creator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.TextField()),
                ('share', models.IntegerField()),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creators', to='images_generator.properties')),
            ],
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('family', models.TextField()),
                ('metadata', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='collection', to='images_generator.tokenmetadata')),
            ],
        ),
    ]
