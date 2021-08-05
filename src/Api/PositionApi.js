import Api from "./Api";

const url = "/possitions";

const getAll = () => {
  return Api.get(url);
};

const PositionApi = { getAll };
export default PositionApi;
