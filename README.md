# DemoExpressjs

## Docker Usage

### Flow

- Flow đơn giản để có thể làm việc và đóng gòi container
<br>

- __dockerfile -> build image -> docker image -> Run -> docker container__
<br>

- Docker compose nhằm chạy các container 1 cùng lúc nên sẽ tiện hơn là việc chạy từng cái một. Docker-compose sẽ tự pull image và tự build, tự chạy cho mình luôn. Có thể dùng image của app mình vừa build ra hoặc dùng dockerfile để docker-compose có thể tự build image cho app và tự chạy

- __docker-compose -> run -> chạy multi container__
<br>

### Build Image
- Lệnh docker build này với __tag_name__ tên image bạn tự đặt và sau __:__ là phiên bản image của bạn. __Nếu 0 để gì thì mặc định là latest__
 
- Dấu . ở cuối là để chỉ rằng dockerfile đang ở cùng chỗ chúng ta viết bash command. Nếu không hãy chỉ rõ nơi chứa dockerfile để có thể build được 

- __```bash docker build -t <tag_name:version> .```__
<br>

- Để thay đổi tag của docker sau khi đã build

- __```bash docker tag <old_tag> <new_tag> ```__
<br>

- Để tiện cho việc push lên dockerhub vì nó cần tên của __docker_name__ và __tag_name__ thì nên đặt __tag_name__ như sau:

- __```bash docker build -t <dockerhub_name\tag_name:version> .```__
<br>

- ví dụ:

- __```bash docker build -t cunity1808\demoexpress:latest .```__
<br>

### Push Image
- Lệnh docker push để đưa image chúng ta vừa build lên dockerhub. __Nhớ login vào docker desktop__

- __```bash docker push cunity1808\demoexpress:latest ```__
<br>

### Run Container
- Lệnh docker run để nhằm việc chúng ta run container để chạy app trong __docker_host__.

- Lưu ý: Bắt buộc chúng ta cần phải có ___-p <docker_host_port:container_post>___ tại vì nếu 0 có dòng này thì app chúng ta 0 biết public ra cổng nào để mà có thể truy cập được.

- Cái cổng __docker_host_port__ này là cổng để __docker_host__ dùng tức là máy của mình. Tức là khi chúng ta truy cập từ máy mình qua cổng này thì mới có thể đi vào đúng cổng app đang chạy thực sự trong docker.

- Cái cổng __container_port__ này là cổng để app chúng ta chạy. Giả sử server nodejs chạy cổng 8000 thì cái này chính là __container_port__. Nhớ là map cho đúng.

- Ví dụ: __3000:8000__ thì khi chúng ta truy cập __localhost:3000__ ở bên ngoài mới thực sự vào server nodejs với __localhost:8000__.

- Vì localhost của máy mình và localhost của container trong docker là 2 thằng hoàn toàn khác nhau

- __```bash docker run -d --name <container_name> -p <docker_host_port:container_post> cunity1808\demoexpress:latest```__
<br>

- Sau khi chạy xong rồi thử ra chạy __localhost:<docker_host_port>__ để xem có chạy được chưa

### Docker-Compose
- Đây là thằng giúp chúng ta chạy được nhiều container cùng 1 lúc.

- Lệnh này để chạy docker-compose từ file __docker-compose.yml__ đó

- __```bash docker compose up -d```__
<br>

- Hoặc

- __```bash docker-compose up -d```__
<br>

- Lệnh này để ngừng chạy docker-compose đi

- __```bash docker-compose down```__
<br>

- Lưu ý: 
    - Các Container là hoàn toàn độc lập với nhau. Nếu muốn chúng nó liên kết với nhau hay connect tới các cổng với nhau thì cần phải setup chúng chung 1 network. Với __docker-compose__ thì mặc định chúng đã có chung 1 network là __bridge__ rồi còn để chắc chắn hay custom thì sửa lại phần network trong file __docker-compose.yml__ là được.

    - Volume là nơi mà docker quản lí các file cố định nhằm dễ dàng cho việc backup nếu như mọi người lỡ xóa các container. Đặc biệt là các container như CSDL : MySQL, Redis, MongoDb,... Vì trong đó chứa các file data của chúng ta. Việc chúng ta lưu trữ data vào db của container thì nó sẽ tự map sang Volumes của Docker để quản lí. Nếu như xóa container DB đi và build lại với cùng setup Volumes thì sẽ đảm bảo các dữ liệu trước vẫn còn // MAYBE =>>>








