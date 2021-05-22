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
> Request:
```ruby
Date (thay vì new Date(`dd-mm-yyyy`)) => `dd-mm-yyyy`
Ví dụ:
joinDate: '22-10-2020'
```

> Nếu cần xác thực thì cần gắn Header:<br>
```ruby
Bearer token
```
> Danh sách cã mã quyền (roleCode)
```ruby
0: Khách (Chưa đăng nhập)
1: Employee (Nhân viên)
2: Admin (Quản lý)
3: Root (Tài khoản gốc)
```
# Đăng nhập:
```ruby
/v1/account/signin
`post`
```
> Encytpe:
```ruby
multipart/form-data
```
> Request:<br>
```ruby
account: string
password: string
```
> Response:<br>
```ruby
token: string
id: string
firstName: string
lastName: string
birthday: Date
address: string
position: string
joinDate: Date
expireDate: Date
cccd: string
avatarUri: string
roleCode: number
```
# Employee
## Lấy thông tin một nhân viên:
```ruby
/v1/employee/getbyid
`get`
```
> Gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: string
```

> Response:<br>
```ruby
id: string
firstName: string
lastName: string
birthday: Date
address: string
position: string
joinDate: Date
expireDate: Date
roleCode: number
cccd: string
avatarUri: string
isActive: boolean
account: string
salary: number
```
## Cập nhật thông tin một nhân viên:
```ruby
/v1/employee/update
`put`
```
> Encytpe:
```ruby
multipart/form-data
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: string
firstName: string
lastName: string
birthday: Date
address: string
position: string
joinDate: Date
expireDate: Date
roleCode: number
cccd: string
avatar: string (not require)
isActive: boolean (not require)
account: string
salary: number
```
> Response:<br>
```ruby
id: string
firstName: string
lastName: string
birthday: Date
address: string
position: string
joinDate: Date
expireDate: Date
roleCode: number
cccd: string
avatarUri: string
isActive: boolean
account: string
salary: number
```
## Xóa một danh sách nhân viên:
```ruby
/v1/employee/delete
`delete`
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
ids: Array<id: int> - Danh sách những id nhân viên cần xóa
```
> Response:<br>
```ruby
ids: Array<id: int> - Danh sách những id đã bị xóa
```
## Thêm một nhân viên mới:
```ruby
/v1/employee/createone
`put`
```
> Encytpe:
```ruby
multipart/form-data
```
> Chỉ admin có quyền nên phải gắn Header:<br>
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
firstName: string
lastName: string
birthday: Date
address: string
position: string
joinDate: Date
expireDate: Date
roleCode: number
cccd: string
avatar: string
isActive: boolean
account: string
password: string
salary: number
```
Điều kiện hợp lệ:<br>
```ruby
firstName: Độ dài >= 0
lastName: Độ dài > 0
birthday: < Ngày hiện tại
address: Độ dài > 0
position: Độ dài > 0
joinDate: Ngày gia nhập, định dạng `dd-mm-yyyy`
expireDate: Ngày hết hạn hợp đồng, định dạng `dd-mm-yyyy`
roleCode: Là 1 trong 2 giá trị
  1: Nhân viên
  2: Admin
cccd: Unique (12 chữ số)
avatar: .jpg, .jpeg, .png
isActive: bool - Nhân viên còn làm việc hay không
account: Độ dài >= 6 <= 20
password: Đồ dài >= 6 <= 20
salary: Mặc định = -1
```
> Response:<br>
```ruby
id: string
firstName: string
lastName: string
birthday: Date
address: string
position: string
joinDate: Date
expireDate: Date
roleCode: number
cccd: string
avatarUri: string
isActive: boolean
account: string
salary: number
```
## Lấy tất cả nhân viên:
```ruby
/v1/employee
`get`
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
Không
```

> Response:<br>
```ruby
employees: Array[{
  id: string
  firstName: string
  lastName: string
  address: string
  position: string
  avatarUri: string
  isActive: boolean
  cccd: string
}]
```
# Transaction
## Tạo một giao dịch:
```ruby
/v1/transaction/createone
`put`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
materialName: string
description: string
count: number
price: number
supplierName: string
time: `dd-mm-yyyy`
```
> Response:<br>
```ruby
id: string
materialName: string
description: string
count: number
price: number
supplierName: string
time: Date
employee: {
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  position: string,
  avatarUri: string,
  isActive: string,
  cccd: string
}
```
## Lấy thông tin một giao dịch:
```ruby
/v1/transaction/getbyid
`post`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: string
```
> Response:<br>
```ruby
id: string
materialName: string
description: string
count: number
price: number
supplierName: string
time: Date
employee: {
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  position: string,
  avatarUri: string,
  isActive: string,
  cccd: string
}
```
## Cập nhật thông tin một giao dịch:
```ruby
/v1/transaction/update
`put`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
id: string
materialName: string
description: string
count: number
price: number
supplierName: string
time: `dd-mm-yyyy`
```
> Response:<br>
```ruby
id: string
materialName: string
description: string
count: number
price: number
supplierName: string
time: Date
employee: {
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  position: string,
  avatarUri: string,
  isActive: string,
  cccd: string
}
```
## Xóa một giao dịch:
```ruby
/v1/transaction/delete
`delete`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
ids: Array<string>
```
> Response:<br>
```ruby
ids: Array<string>
```
## Lấy tất cả các giao dịch:
```ruby
/v1/transaction
`get`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
Không
```
> Response:<br>
```ruby
transactions: Array[{
  id: string
  materialName: string
  description: string
  count: number
  price: number
  supplierName: string
  time: Date
  employee: {
    id: string,
    firstName: string,
    lastName: string,
    address: string,
    position: string,
    avatarUri: string,
    isActive: string,
    cccd: string
  }
}]
```
# Thống kê
## Doanh thu theo thời gian (tính dựa theo trường money của đơn hàng):
```ruby
/v1/stat/revenue
`post`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
start: `dd-mm-yyyy`
end: `dd-mm-yyyy`
```
```ruby
Example:
{
    "start":"29-04-2021",
    "end":"03-05-2021"
}
Khoảng thời gian giữa start và end tối đa là 2 năm (tránh bị quá bộ nhớ)
```
> Response:<br>
```ruby
type: string,
revenue: Array<number>: Doanh thu theo ngày, index 0 đại diện cho ngày bắt đầu (start)
```
```ruby
Example:
{
    "error": 200,
    "type": "day",
    "revenue": [
        0,
        0,
        0,
        0,
        0
    ],
    "message": "OK"
}
```
## Số lượng sản phẩm bán được theo thời gian:
```ruby
/v1/stat/revenue/product
`post`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
start: `dd-mm-yyyy`
end: `dd-mm-yyyy`
```
```ruby
Example:
{
    "start":"29-04-2021",
    "end":"03-05-2021"
}
Khoảng thời gian giữa start và end tối đa là 2 năm (tránh bị quá bộ nhớ)
```
> Response:<br>
```ruby
type: string,
revenue: {
  [productId: string]: {
    counts: [
      number
    ],
    metadata: {
      id: string
      name: string
      price: string
      description: string
      previewUri: string (link to image file)
      isActive: boolean
    }
  }
}: Thông tin của sản phẩm `productId`: số lượng bán được theo ngày (index 0 đại diện cho ngày bắt đầu), thông tin thêm về sản phẩm
```
```ruby
Example:
{
    "error": 200,
    "type": "day",
    "revenue": {
        "PD-000001": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000001",
                "name": "abcdef",
                "price": 80000,
                "description": "123456kmnop",
                "previewUri": "public/default-product.jpg",
                "isActive": false
            }
        },
        "PD-000002": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000002",
                "name": "abcdef",
                "price": 80000,
                "description": "123456kmnop",
                "previewUri": "public/default-product.jpg",
                "isActive": false
            }
        },
        "PD-000003": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000003",
                "name": "abcdef",
                "price": 80001,
                "description": "123456kmnop",
                "previewUri": "public/default-product.jpg",
                "isActive": false
            }
        },
        "PD-000004": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000004",
                "name": "ca phe 16",
                "price": 30000,
                "description": "ca phe ngon nhat the gioi ",
                "previewUri": "static/4c30fbdf-d66d-4502-9ba7-65a55a06786b-anh-dep-ben-ly-cafe-den_110730392.jpg",
                "isActive": true
            }
        },
        "PD-000005": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000005",
                "name": "ca phe 11",
                "price": 50000,
                "description": "ok",
                "previewUri": "public/default-product.jpg",
                "isActive": false
            }
        },
        "PD-000006": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000006",
                "name": "ca phe 12",
                "price": 50000,
                "description": "ok ok ok",
                "previewUri": "static/f9bd0622-1240-492e-a8f9-fbc57050cad6-default-product.jpg",
                "isActive": true
            }
        },
        "PD-000007": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000007",
                "name": "nước chanh leo",
                "price": 50000,
                "description": "đc làm từ chanh leo",
                "previewUri": "static/0025dd9d-9a27-409f-8dc5-2af8f58817fb-default-product.jpg",
                "isActive": true
            }
        },
        "PD-000008": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000008",
                "name": "Trà",
                "price": 50000,
                "description": "Mới",
                "previewUri": "public/default-product.jpg",
                "isActive": true
            }
        },
        "PD-000009": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000009",
                "name": "ca phe 1",
                "price": 2000000,
                "description": "ca phe lam tu ca phe",
                "previewUri": "public/default-product.jpg",
                "isActive": false
            }
        },
        "PD-000010": {
            "counts": [
                0,
                0,
                0,
                0,
                0
            ],
            "metadata": {
                "id": "PD-000010",
                "name": "ca phe 2",
                "price": 300000,
                "description": "ca phe lam tu ca phe",
                "previewUri": "public/default-product.jpg",
                "isActive": false
            }
        }
    },
    "message": "OK"
}
```
## Số lượng đơn hàng mà nhân viên nhập theo thời gian:
```ruby
/v1/stat/employee/order
`post`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
start: `dd-mm-yyyy`
end: `dd-mm-yyyy`
```
```ruby
Example:
{
    "start":"30-04-2021",
    "end":"01-05-2021"
}
Khoảng thời gian giữa start và end tối đa là 2 năm (tránh bị quá bộ nhớ)
```
> Response:<br>
```ruby
type: string,
revenue: {
  [employeeId: string]: {
    counts: [
      number
    ],
    money: [
      number
    ],
    metadata: {
      id: string
      firstName: string
      lastName: string
      address: string
      position: string
      avatarUri: string
      isActive: boolean
      cccd: string
    }
  }
}: Thông tin của nhân viên `employeeId`: số lượng order được theo ngày (index 0 đại diện cho ngày bắt đầu), số tiền tổng cộng của các đơn hàng theo ngày, thông tin thêm về nhân viên
```
```ruby
Example:
{
    "error": 200,
    "type": "day",
    "revenue": {
        "CF-000001": {
            "counts": [
                0,
                0
            ],
            "money": [
                0,
                0
            ],
            "metadata": {
                "id": "CF-000001",
                "firstName": "VBN",
                "lastName": "Long",
                "address": "ADAIwjqpe",
                "position": "Quản lý",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/static/294daead-e423-405a-9c8a-4b150ef5b859-poster.jpg",
                "isActive": false,
                "cccd": "333010112821"
            }
        },
        "CF-000002": {
            "counts": [
                0,
                0
            ],
            "money": [
                0,
                0
            ],
            "metadata": {
                "id": "CF-000002",
                "firstName": "VBN",
                "lastName": "Long",
                "address": "ADAIwjqpe",
                "position": "Lễ Tân",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/static/27807b35-253b-40a4-8b06-bfb909023a08-king.jpg",
                "isActive": false,
                "cccd": "933010112821"
            }
        },
        "CF-000003": {
            "counts": [
                0,
                0
            ],
            "money": [
                0,
                0
            ],
            "metadata": {
                "id": "CF-000003",
                "firstName": "Viet",
                "lastName": "Long",
                "address": "Bac Ninh",
                "position": "Dau bep",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/static/ec365ebe-0274-4184-8fa5-45844bb6ce2a-poster2.jpg",
                "isActive": false,
                "cccd": "125671234599"
            }
        },
        "CF-000004": {
            "counts": [
                0,
                0
            ],
            "money": [
                0,
                0
            ],
            "metadata": {
                "id": "CF-000004",
                "firstName": "huy",
                "lastName": "vu",
                "address": "BK haf nooij",
                "position": "admin",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/static/fec58134-4a6f-4984-8314-265b0071c912-tkb.PNG",
                "isActive": false,
                "cccd": "123456789123"
            }
        },
        "CF-000005": {
            "counts": [
                0,
                0
            ],
            "money": [
                0,
                0
            ],
            "metadata": {
                "id": "CF-000005",
                "firstName": "1231235",
                "lastName": "12312312",
                "address": "Lang Son",
                "position": "nhan vien",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/static/45a9da24-5119-4378-aff6-0d3a3fb04248-server_information.jpg",
                "isActive": false,
                "cccd": "123456789012"
            }
        },
        "CF-000006": {
            "counts": [
                0,
                0
            ],
            "money": [
                0,
                0
            ],
            "metadata": {
                "id": "CF-000006",
                "firstName": "hung",
                "lastName": "ma",
                "address": "Lang Son",
                "position": "nhan vien",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/static/8a223379-e066-4726-90f2-de284a9e5493-7bf49cc8e519bcea2fdd87b00df971aa.jpg",
                "isActive": false,
                "cccd": "341234235673"
            }
        },
        "CF-000007": {
            "counts": [
                0,
                0
            ],
            "money": [
                0,
                0
            ],
            "metadata": {
                "id": "CF-000007",
                "firstName": "tung dz",
                "lastName": "ma",
                "address": "Lang Son",
                "position": "Nhan vien cot can",
                "avatarUri": "https://mighty-plains-90447.herokuapp.com/static/6aae43e1-8daa-4a76-8c05-4736734106aa-Screenshot from 2021-03-28 16-58-51.png",
                "isActive": false,
                "cccd": "082343996345"
            }
        }
    },
    "message": "OK"
}
```
## Doanh thu và chi phí đã bỏ ra trong tháng hiện tại
```ruby
/v1/stat/revenue/cost
`get`
```
> Encytpe:
```ruby
application/json
```
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
```ruby
Không
```
> Response:<br>
```ruby
revenue: number
cost: number
```
```ruby
Example:
{
    "error": 200,
    "revenue": "4900000",
    "cost": "100",
    "message": "OK"
}
```