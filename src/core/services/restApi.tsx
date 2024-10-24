import axios from 'axios';
import {API_URL} from '@env';

export const baseUrl = API_URL;

const defaultErrorMessage = 'Sistem down, mohon maaf atas ketidaknyamanannya';

// Define the API response type
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T; // Optional property
}

function handleApiError(error: any): ApiResponse {
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.message || defaultErrorMessage;

    switch (statusCode) {
      case 400:
        return {success: false, message: 'Bad Request: ' + message};
      case 401:
        return {success: false, message: 'Unauthorized: ' + message};
      case 403:
        return {success: false, message: 'Forbidden: ' + message};
      case 404:
        return {success: false, message: 'Not Found: ' + message};
      case 500:
        return {success: false, message: 'Internal Server Error: ' + message};
      default:
        return {success: false, message: message};
    }
  }

  return {success: false, message: defaultErrorMessage};
}

function setConfigAxios(method: string, url: string, data: any, token: string) {
  return {
    method,
    url: `${baseUrl}/${url}`,
    ...(method === 'GET' ? {params: data} : {data}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function postApi(config: any): Promise<ApiResponse> {
  return apiRequest('POST', config);
}

export async function getApi(config: any): Promise<ApiResponse> {
  return apiRequest('GET', config);
}

export async function putApi(config: any): Promise<ApiResponse> {
  return apiRequest('PUT', config);
}

export async function deleteApi(config: any): Promise<ApiResponse> {
  return apiRequest('DELETE', config);
}

async function apiRequest(method: string, config: any): Promise<ApiResponse> {
  const token = config?.token || '';
  const data = config?.data || {};
  const url = config?.url || '';

  try {
    const axiosConfig = setConfigAxios(method, url, data, token);
    const response = await axios(axiosConfig);

    // Return a successful response structure
    return {
      success: true,
      message: 'Success get data',
      data: response.data, // Adjust this if your API response structure differs
    };
  } catch (error) {
    return handleApiError(error);
  }
}
