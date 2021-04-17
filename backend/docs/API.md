# API
Mặc định:
> Encytype:<br>
```ruby
application/json
```
> Tất cả các response trả về đều có<br>
```ruby
Http status
```
```ruby
error: ERR_CODE enum
message: string
```

> Nếu cần xác thực thì cần gắn Header:<br>
```ruby
Bearer token
```
# Đăng nhập
```ruby
multipart/form-data
```
> Request:<br>

Phần body
```ruby
account: string
password: string
```
> Response:<br>
```ruby
public token: string
  
public id: string
public firstName: string
public lastName: string
public birthday: Date
public address: string
public position: string
public joinDate: Date
public expireDate: Date
public cccd: string
public avatarUri: string
```
# Employee
## Xóa một danh sách nhân viên:
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>
Phần body:<br>
```ruby
ids: Array<id: int> - Danh sách những id nhân viên cần xóa
```
> Response<br>
```ruby
ids: Array<id: int> - Danh sách những id đã bị xóa
```
## Thêm một nhân viên mới:
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>

Phần body:<br>
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
joinDate: Ngày gia nhập, định dạng `dd/mm/yy`
expireDate: Ngày hết hạn hợp đồng, định dạng `dd/mm/yy`
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
> Response<br>
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
> Chỉ admin có quyền nên phải gắn Header:<br>
```ruby
Bearer token
```
> Request:<br>

> Response:<br>
```ruby
employees: Array[
  id: string
  firstName: string
  lastName: string
  address: string
  position: string
  avatarUri: string
  isActive: boolean
]
```