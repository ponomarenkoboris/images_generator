export const tokenMetadataTable = [
    {name: 'name', type: 'string', description: 'Название арта (изменяемое поле)'},
    {name: 'symbol', type: 'string', description: 'Символ арта (изменяемое поле)'},
    {name: 'seller_fee_basis_points', type: 'number', description: 'Роялтис отчисляемые создателям (5% - 500; 10% - 1000) (изменяемое поле)'},
    {name: 'image', type: 'string', description: 'URL картинки (неизменяемое поле)'},
    {name: 'collection', type: 'object', description: 'Содержит информацию о коллекции артов'},
    {name: 'properties', type: 'object', description: 'Содержит информацию о создателях, файлах и категории'}
]

export const tokenMetadataCollectTable = [
    {name: 'name', type: 'string', description: 'Название коллекции (изменяемое поле)'},
    {name: 'family', type: 'string', description: 'Название семейства коллекции (изменяемое поле)'}
]

export const tokenMetadatProperTable = [
    {name: 'files', type: 'array', description: 'Массив объектов, которые содержат адрес и тип изображения (генерируемое поле)'},
    {name: 'category', type: 'string', description: 'Один из валидных типов (изменяемое поле)'},
    {name: 'creators', type: 'array', description: 'Массив объектов, которые содержат адерсс кошелка создателя и процент от seller_fee_basis_points (50% - 50) (изменяемое поле)'}
]

export const algoConfTable = [
    {name: 'images_count', type: 'number', description: 'Колличество картинок, которое нужно сгенерировать'},
    {name: 'time_limit', type: 'number или boolean', description: 'Ограничение по времени на генерицию картинок в секундах (default false - нет ограничения)'},
    {name: 'sequences_is_unique', type: 'boolean', description: 'true - создается максимальное возможное количество уникальных артов в пределах images_count;\nfalse - генерируетя images_count колличество изображений'},
    {name: 'size', type: 'object', description: 'Размер арта'},
    {name: 'backgroud_color_rgba', type: 'string', description: 'Цвет фона арта (default rgba(0, 0, 0, 255), alpha 255 = 100%)'}
]