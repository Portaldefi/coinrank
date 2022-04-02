import http from '../http-common';

class ListDataService {
  getAll() {
    return http.get("/lists");
  }
  get(id) {
    return http.get(`/lists?chainId=${id}`);
  }
  findByText(text) {
    return ;
  }
}

export default new ListDataService();