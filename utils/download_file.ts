import axios, { AxiosResponse, AxiosError } from 'axios';

export default async function downloadFile(url: string, cookie: string): Promise<String> {
  // Download the file
  return await axios.get(url, {
    headers : {
      "COOKIE" : cookie
    }
  })
  .then(function (input: AxiosResponse) {
    return input.data;
  })
  .catch(handleAxiosError);
}

function handleAxiosError(error: AxiosError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}