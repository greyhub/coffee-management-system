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
description: string
supplierName: string
price: number
time: `dd-mm-yyyy`
```
> Response:<br>
```ruby
id: string
description: string
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
description: string
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
description: string
supplierName: string
price: number
time: `dd-mm-yyyy`
```
> Response:<br>
```ruby
id: string
description: string
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
  description: string
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
    2210000,
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
    price: number
  }
}: Thông tin của sản phẩm `productId`: số lượng bán được theo ngày (index 0 đại diện cho ngày bắt đầu), giá của sản phẩm: `price`
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
        26,
        0,
        0
      ],
      "price": 80001
    },
    "PD-000002": {
      "counts": [
        0,
        0,
        23,
        0,
        0
      ],
      "price": 90
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
  "start":"29-04-2021",
  "end":"03-05-2021"
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
    ]
  }
}: Thông tin của nhân viên `employeeId`: số lượng order được theo ngày (index 0 đại diện cho ngày bắt đầu), số tiền tổng cộng của các đơn hàng theo ngày
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
        0,
        4,
        0,
        0
      ],
      "money": [
        0,
        0,
        1210000,
        0,
        0
      ]
    },
    "CF-000002": {
      "counts": [
        0,
        0,
        2,
        1,
        0
      ],
      "money": [
        0,
        0,
        2000000,
        1000000,
        0
      ]
    }
  },
  "message": "OK"
}
```