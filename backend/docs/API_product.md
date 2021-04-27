# API
Mặc định:
> Prefix Url:<br>
```ruby
localhost:${.env.PORT}/
ví dụ: localhost:8080/
# Nếu có đường link ảnh (ví dụ: avatar) thì thêm tiền tố trên
```
> Encytype:<br>
```ruby
application/json
```
> Tất cả các response trả về đều có:<br>
```ruby
Http status
```
```ruby
error: ERR_CODE enum
message: string
```

> Nếu cần xác thực thì cần gắn Header:<br>
```ruby
Bearer <token>
```

# Product
## Lấy thông tin một product:
```ruby
/v1/product/getbyid
`post`
```
> Encytype:<br>
```ruby
application/json
```
> Gắn Header:<br>
```ruby
Bearer <token>
```
> Request:<br>
```ruby
id: string
{
	"id": "PD-000001"
}	
```

> Response:<br>
```ruby
id: string
name: string
price: string
description: string
previewUri: string (link to image file)
isActive: boolean
{
    "error": 200,
    "id": "PD-000001",
    "name": "Bạc xỉu thêm đường",
    "price": 15000,
    "description": "Loại caffe ngon nhất thế giới song song",
    "previewUri": "localhost:8080/./static/default-avatar.png",
    "isActive": true,
    "message": "OK"
}
```
## Lấy tất cả product:
```ruby
/v1/product
`get`
```
> Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
Không
```

> Response:<br>
```ruby
products: Array[
  id: string
  name: string
  price: string
  description: string
  previewUri: string (link to image file)
  isActive: boolean
]
{
    "error": 200,
    "products": [
        {
            "id": "PD-000001",
            "name": "Bạc xỉu thêm đường",
            "price": 15000,
            "description": "Loại caffe ngon nhất thế giới song song",
            "previewUri": "localhost:8080/./static/default-avatar.png",
            "isActive": true
        },
        {
            "id": "PD-000002",
            "name": "Bạc u thêm đường",
            "price": 10000,
            "description": "Loại caffe ngon nhất thếg",
            "previewUri": "localhost:8080/./static/default-avatar.png",
            "isActive": true
        },
        {
            "id": "PD-000003",
            "name": "Bạc u thêm đường",
            "price": 10000,
            "description": "Loại caffe ngonấdsfgnc nhất thếg",
            "previewUri": "localhost:8080/./static/default-avatar.png",
            "isActive": true
        }
    ],
    "message": "OK"
}
```
## Thêm một product mới:
```ruby
/v1/product/createone
`put`
```
>Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
name: string
price: string
description: string
isActive: boolean
{
	"name": "Bạc u thêm đường",
	"price": "10000",
	"description": "Loại caffe ngonấdsfgnc nhất thếg",
	"isActive": 1
}	
```
Điều kiện hợp lệ:<br>
```ruby
name: string Độ dài >= 0
price: Mặc định = 0
description: string  0<= độ dài <= 3000
isActive: bool - product còn bán hay không
```
> Response:<br>
```ruby
id: string
name: string
price: string
description: string
previewUri: string (link to image file)
isActive: boolean
{
    "error": 200,
    "id": "PD-000003",
    "name": "Bạc u thêm đường",
    "price": 10000,
    "description": "Loại caffe ngonấdsfgnc nhất thếg",
    "previewUri": "localhost:8080/./static/default-avatar.png",
    "isActive": true,
    "message": "OK"
}
```
## Cập nhật thông tin một product(chưa có ảnh preview):
```ruby
/v1/product/update
`put`
```
>Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: string
name: string
price: string
description: string
isActive: boolean
{
	"id": "PD-000002",
	"name": "Bạc xỉu gốc",
    "price": 12000,
    "description": "Loại caffe hơi ngon",
    "isActive": 1
}
```
> Response:<br>
```ruby
id: string
name: string
price: string
description: string
previewUri: string (link to image file)
isActive: boolean
{
    "error": 200,
    "id": "PD-000002",
    "name": "Bạc xỉu gốc",
    "price": 12000,
    "description": "Loại caffe hơi ngon",
    "previewUri": "localhost:8080/./static/default-avatar.png",
    "isActive": true,
    "message": "OK"
}
```
## Cập nhật ảnh preview một product:
```ruby
/v1/product/updateprev
`put`
```
>Header:<br>
```ruby
Bearer token
```
> Encytpe:
```ruby
multipart/form-data
```
> Request:<br>
```ruby
id: text
preview: file <image file>
```
> Response:<br>
```ruby
id: string
name: string
price: string
description: string
previewUri: string (link to image file)
isActive: boolean
{
    "error": 200,
    "id": "PD-000002",
    "name": "Bạc xỉu gốc",
    "price": 12000,
    "description": "Loại caffe hơi ngon",
    "previewUri": "localhost:8080/static\\bf389003-87d8-4cdf-ae3a-9a9056a1ce04-anh_20172968.jpg",
    "isActive": true,
    "message": "OK"
}
```

## Xóa một danh sách product:
```ruby
/v1/product/delete
`delete`
```
> Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
ids: Array<id: int> - Danh sách những id product cần xóa 
ex: 
{
	"ids":["PD-000001","PD-000002"]
}
```
> Response:<br>
```ruby
ids: Array<id: int> - Danh sách những id đã bị xóa
{
    "error": 200,
    "ids": [
        "PD-000001",
        "PD-000002"
    ],
    "message": "OK"
}
```

