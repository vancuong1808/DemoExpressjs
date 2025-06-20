# Sử dụng image chính thức của Node.js phiên bản 22.1.0 làm image nền
FROM node:22.1.0

# Thiết lập thư mục làm việc bên trong container là /demoexpress
# Mọi lệnh sau đó sẽ được thực thi trong thư mục này
WORKDIR /demoexpress

# Sao chép 2 file package.json và package-lock.json (nếu có) vào container
# Điều này giúp tận dụng cache của Docker để không phải cài lại npm packages nếu không thay đổi
COPY package*.json .

# Cài đặt các dependencies được định nghĩa trong package.json
RUN npm install

# Sao chép toàn bộ nội dung thư mục hiện tại (trên máy host) vào thư mục làm việc của container
COPY . .

# Mở cổng 8000 để ứng dụng có thể lắng nghe (listen) từ bên ngoài container
# Tuy nhiên, để truy cập được bạn vẫn cần `-p` khi chạy container: ví dụ `docker run -p 8000:8000`
EXPOSE 8000

# Câu lệnh mặc định để khởi chạy ứng dụng khi container bắt đầu
# Ở đây là: npm run dev (ví dụ với nodemon hoặc script bạn đã định nghĩa trong package.json)
CMD [ "npm", "run", "dev" ]
