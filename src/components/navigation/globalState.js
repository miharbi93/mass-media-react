let userRole = '';

const setUserRole = (role) => {
  userRole = role;
};

const getUserRole = () => {
  return userRole;
};

export { setUserRole, getUserRole };