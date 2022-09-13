const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://139.162.154.108:8000';

export function getApi(params) {
  const param = params ? `/${params}` : '';
  return `${API_URL}${param}`;
}
