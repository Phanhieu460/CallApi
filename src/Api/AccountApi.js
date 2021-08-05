import Api from "./Api";

const url = "/accounts";

const getAll = () => {
  return Api.get(url);
};
const create = (body) => {
  return Api.post(url, body);
};
const updateById = (id, body) => {
  return Api.put(`${url}/${id}`, body);
};
const deleteById = (id) => {
  return Api.delete(`${url}/${id}`);
};

const AccountApi = { getAll, create, updateById, deleteById };
export default AccountApi;
