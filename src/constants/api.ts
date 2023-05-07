export const API_CONFIG = {
  responseMessage: {
    errorMessage: "Có lỗi xảy ra!",
    createSuccess: "Tạo thành công!",
    deleteSuccess: "Xoá thành công!",
    updateSuccess: "Sửa thành công!",
    getListSuccess: "Lấy danh sách thành công!",
    getSuccess: "Lấy thành công!",
  },
};

class ApiResponse {
  private response_code;
  private message: string;
  private data;

  constructor(responseCode, message = null, data = null) {
    this.response_code = responseCode;
    this.message = message;
    this.data = data;
  }
}

export { ApiResponse };
