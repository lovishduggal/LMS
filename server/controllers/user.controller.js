const handleRegister = (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        //! Tomorrow, I will begin from this point.
    }
};

const handleLogin = (req, res) => {};
const handleLogout = (req, res) => {};
const handleProfile = (req, res) => {};

export { handleRegister, handleLogin, handleLogout, handleProfile };
