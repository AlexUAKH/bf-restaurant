import del from "del";

export const cleanDist = () => {
  return del(app.path.clean);
};
