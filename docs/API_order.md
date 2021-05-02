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
## Lấy một danh sách order do 1 nhân viên tạo:
```ruby
/v1/order/getbyimporterid
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
{
	"id": "CF-000001"
}	
```

> Response:<br>
```ruby
Example:
{
    "error": 200,
    "orders": [
        {
            "id": "154a3917-ec62-4d52-8070-2693b527c9e0",
            "updateAt": "1999-05-01T14:34:23.000Z",
            "employee": {
                "id": "CF-000001",
                "firstName": "Bền",
                "lastName": "Bùi",
                "birthday": "1999-01-05",
                "address": "Hà Nội",
                "position": "quản trị",
                "joinDate": "2000-01-05",
                "expireDate": "2022-11-20",
                "roleCode": 2,
                "cccd": "712345678910",
                "avatarUri": "static\\f70d2740-aeed-435e-b1b5-6b6b0ee26391-anh_20172968.jpg",
                "salary": "0",
                "isActive": true,
                "account": "benbui7",
                "hashPassword": "$2b$10$97zQFQkzk8XMiqSKTFk1j.ER74W1co7e1xvuuEDiUrv4leUBY1dUK",
                "password": "123456"
            },
            "note": "haha",
            "money": 20000,
            "tableCode": 1
        },
        {
            "id": "1e020a5c-92f9-4ab8-8558-d59dfdad68c3",
            "updateAt": "1999-05-01T14:34:23.000Z",
            "employee": {
                "id": "CF-000001",
                "firstName": "Bền",
                "lastName": "Bùi",
                "birthday": "1999-01-05",
                "address": "Hà Nội",
                "position": "quản trị",
                "joinDate": "2000-01-05",
                "expireDate": "2022-11-20",
                "roleCode": 2,
                "cccd": "712345678910",
                "avatarUri": "static\\f70d2740-aeed-435e-b1b5-6b6b0ee26391-anh_20172968.jpg",
                "salary": "0",
                "isActive": true,
                "account": "benbui7",
                "hashPassword": "$2b$10$97zQFQkzk8XMiqSKTFk1j.ER74W1co7e1xvuuEDiUrv4leUBY1dUK",
                "password": "123456"
            },
            "note": "haha",
            "money": 20000,
            "tableCode": 1
        },...
    ],
    "message": "OK"
}
```

## Lấy hết tất cả oder(chỉ admin mới có quyền):
```ruby
/v1/order
`get`
```
>Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
không
```
> Response:<br>
```ruby
{
    "error": 200,
    "orders": [
        {
            "id": "154a3917-ec62-4d52-8070-2693b527c9e0",
            "updateAt": "1999-05-01T14:34:23.000Z",
            "employee": {
                "id": "CF-000001",
                "firstName": "Bền",
                "lastName": "Bùi",
                "birthday": "1999-01-05",
                "address": "Hà Nội",
                "position": "quản trị",
                "joinDate": "2000-01-05",
                "expireDate": "2022-11-20",
                "roleCode": 2,
                "cccd": "712345678910",
                "avatarUri": "static\\f70d2740-aeed-435e-b1b5-6b6b0ee26391-anh_20172968.jpg",
                "salary": "0",
                "isActive": true,
                "account": "benbui7",
                "hashPassword": "$2b$10$97zQFQkzk8XMiqSKTFk1j.ER74W1co7e1xvuuEDiUrv4leUBY1dUK",
                "password": "123456"
            },
            "note": "haha",
            "money": 20000,
            "tableCode": 1
        },
        {
            "id": "1e020a5c-92f9-4ab8-8558-d59dfdad68c3",
            "updateAt": "1999-05-01T14:34:23.000Z",
            "employee": {
                "id": "CF-000001",
                "firstName": "Bền",
                "lastName": "Bùi",
                "birthday": "1999-01-05",
                "address": "Hà Nội",
                "position": "quản trị",
                "joinDate": "2000-01-05",
                "expireDate": "2022-11-20",
                "roleCode": 2,
                "cccd": "712345678910",
                "avatarUri": "static\\f70d2740-aeed-435e-b1b5-6b6b0ee26391-anh_20172968.jpg",
                "salary": "0",
                "isActive": true,
                "account": "benbui7",
                "hashPassword": "$2b$10$97zQFQkzk8XMiqSKTFk1j.ER74W1co7e1xvuuEDiUrv4leUBY1dUK",
                "password": "123456"
            },
            "note": "haha",
            "money": 20000,
            "tableCode": 1
        },...
    ],
    "message": "OK"
}
```


## Tạo 1 order:
```ruby
/v1/order/create
`put`
```
>Header:<br>
```ruby
Bearer token
```
> Encytpe:
```ruby
application/json
```
> Request:<br>
```ruby
{
	"updateAt": "05-01-1999 21:34:23",
	"importerId":"CF-000001",
	"note":"haha",
	"money": 20000,
	"tableCode":1,
	"orderProducts": [{"product": "PD-000003","count": 4},
						{"product": "PD-000001","count": 1}
						]
}
```
> Response:<br>
```ruby
{
    "error": 200,
    "id": "ef965f3a-edeb-4fdc-9889-c3fd535d6eb0",
    "updateAt": "1999-05-01T14:34:23.000Z",
    "employee": {
        "id": "CF-000001",
        "firstName": "Bền",
        "lastName": "Bùi",
        "address": "Hà Nội",
        "position": "quản trị",
        "avatarUri": "localhost:8080/static\\f70d2740-aeed-435e-b1b5-6b6b0ee26391-anh_20172968.jpg",
        "isActive": true,
        "cccd": "712345678910"
    },
    "note": "haha",
    "money": 20000,
    "tableCode": 1,
    "orderProducts": [
        {
            "product": {
                "id": "PD-000003",
                "name": "Bạc u thêm đường",
                "price": 10000,
                "description": "",
                "previewUri": "./static/default-avatar.png",
                "isActive": true
            },
            "count": 4
        },
        {
            "product": {
                "id": "PD-000001",
                "name": "Bạc xỉu thêm đường",
                "price": 15000,
                "description": "",
                "previewUri": "./static/default-avatar.png",
                "isActive": true
            },
            "count": 1
        }
    ],
    "message": "OK"
}
```
> Example:<br>
```ruby

```

## Xóa một danh sách order:
```ruby
/v1/order/delete
`delete`
```
> Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
ids: Array<id: int> - Danh sách những id order cần xóa 
ex: 
{
	"ids":["e6f544c7-f109-49e7-a68c-36e6f1bc61dc","9be66576-c114-482d-8a18-1d8217dd0f31"]
}
```
> Response:<br>
```ruby
numberDel: int - số order đã xóa
{
    "error": 200,
    "numberDel": 0,
    "message": "OK"
}
```
## Cập nhật 1 order:
```ruby
/v1/order/upadte
`put`
```
>Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
{
	"id":"e6f544c7-f109-49e7-a68c-36e6f1bc61dc", 
	"updateAt": "05-01-2009 21:34:23",
	"importerId":"CF-000001",
	"note":"haha",
	"money": 20000,
	"tableCode":1,
	"orderProducts": [{"product": "PD-000001","count": 4}]
}
```

> Response:<br>
```ruby
{
    "error": 200,
    "id": "e6f544c7-f109-49e7-a68c-36e6f1bc61dc",
    "updateAt": "2009-05-01T14:34:23.000Z",
    "employee": {
        "id": "CF-000001",
        "firstName": "Bền",
        "lastName": "Bùi",
        "address": "Hà Nội",
        "position": "quản trị",
        "avatarUri": "localhost:8080/static\\f70d2740-aeed-435e-b1b5-6b6b0ee26391-anh_20172968.jpg",
        "isActive": true,
        "cccd": "712345678910"
    },
    "note": "haha",
    "money": 20000,
    "tableCode": 1,
    "orderProducts": [
        {
            "product": {
                "id": "PD-000001",
                "name": "Bạc xỉu thêm đường",
                "price": 15000,
                "description": "",
                "previewUri": "./static/default-avatar.png",
                "isActive": true
            },
            "count": 4
        }
    ],
    "message": "OK"
}
```
