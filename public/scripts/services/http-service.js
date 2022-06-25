export class HttpService {
  static ajax(method, url, data, headers) {
    const fetchHeaders = new Headers({
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      ...(headers || {}),
    });

    return fetch(url, {
      method,
      headers: fetchHeaders,
      body: JSON.stringify(data),
    }).then((x) => x.json());
  }
}

// export const httpService = new HttpService();
export default HttpService;

// export default TodoItemsController;
