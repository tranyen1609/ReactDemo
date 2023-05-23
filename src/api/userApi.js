import axiosClient from './axiosClient';

const productApi = {
  getAll() {
    const url = '/user';
    return axiosClient.get(url);
  },
};
