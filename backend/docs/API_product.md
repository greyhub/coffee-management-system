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
```

> Response:<br>
```ruby
id: string
name: string
price: string
description: string
previewUri: string (link to image file)
isActive: boolean
```
> Example:<br>
```ruby
{
	"id": "PD-000001"
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
```
> Response:<br>
```ruby
id: string
name: string
price: string
description: string
previewUri: string (link to image file)
isActive: boolean
```
> Example:<br>
```ruby
{
	"id": "PD-000002",
	"name": "Bạc xỉu gốc",
    "price": 12000,
    "description": "Loại caffe hơi ngon",
    "isActive": 1
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
```
> Example:<br>
```ruby

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
ids: Array<id: int> - Danh sách những id product cần xóa ex: {"ids": ["PD-000001"]}
```
> Response:<br>
```ruby
ids: Array<id: int> - Danh sách những id đã bị xóa
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
> Cheat thêm một nhân viên mới (không cần authentication, authorization):<br>
```ruby
/v1/cheat/employee/createone
`all`
```
> Request:<br>
```ruby
name: string
price: string
description: string
isActive: boolean
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
```