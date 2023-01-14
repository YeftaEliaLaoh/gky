import http from "../config/http-common";

class FileUploadService {
  upload(file,token, onUploadProgress) {
    let formData = new FormData();

    formData.append("image", file);

    return http.post("/upload_image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new FileUploadService();