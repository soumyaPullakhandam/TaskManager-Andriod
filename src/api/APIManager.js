export default function APIManager(method, path, payload, token) {
  return new Promise(function (fnResolve, fnReject) {
    const oUrl = 'http://iampac.de';

    if (payload === undefined) {
      payload = {};
    }
    if (method === undefined) {
      method = 'GET';
    }

    let fetchData = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (method !== 'GET' && method !== 'DELETE') {
      fetchData.body = JSON.stringify(payload);
    }

    if (token && token !== '') {
      fetchData.headers.Authorization = `Token ${token}`;
    }

    try {
      fetch(`${oUrl}${path}`, fetchData)
        .then((res) => {
          if (res.status === 403 || res.status === 401) {
            return fnReject(res);
          }
          return res.json();
        })
        .then(function (oResponse) {
          fnResolve(oResponse);
        })
        .catch(function (err) {
          fnReject(err);
        });
    } catch (e) {
      fnReject(e);
    }
  });
}
