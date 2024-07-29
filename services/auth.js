let currentUser = null;

export const authenticateUser = async (user) => {
    // simulate saving the user session
    currentUser = user;
    return true;
};

export const getCurrentUser = () => {
    return currentUser;
};

export const signOutUser = async () => {
    currentUser = null;
    return true;
};