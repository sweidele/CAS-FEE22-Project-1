export class HttpService {
  ajax(method, url, data, headers) {
    const fetchHeaders = new Headers({
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      ...(headers || {}),
    });

    return fetch(url, {
      method: method,
      headers: fetchHeaders,
      body: JSON.stringify(data),
    }).then((x) => {
      return x.json();
    });
  }
}

export const httpService = new HttpService();
