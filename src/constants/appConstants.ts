const token: string  = "Author-token";

export default  {
    USER_TOKEN:'Author-token',
}

export const removeToken = () => {
    return localStorage.removeItem(token);
  };
  