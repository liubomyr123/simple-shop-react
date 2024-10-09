import { useNavigate } from "react-router-dom";

export const useTypedNavigate = (): (path: PathUnion) => void => {
  const navigate = useNavigate();
  return (path: PathUnion): void => navigate(path);
};
