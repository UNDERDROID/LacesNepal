import {
    getAllUsersService,
    createNewUserService,
    loginUserService,
    refreshTokenService,
    updateUserService
} from "../services/user.service.js";

export const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const users = await getAllUsersService(page, limit);
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData.name || !userData.email || !userData.password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newUser = await createNewUserService(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const { accessToken, refreshToken } = await loginUserService(email, password);
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        const { accessToken } = await refreshTokenService(refreshToken)
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        if (!userId || !userData) {
            return res.status(400).json({ message: "User ID and data are required" });
        }

        const updatedUser = await updateUserService(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const signInWithGoogleService = async (code) => {
    try {
        // Exchange the code for access token
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        });

        const { access_token } = tokenRes.data;

        // Fetch user info from Google
        const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const { email, name } = userInfoRes.data;

        // Check if user exists in DB
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Create user if not exists
            user = await prisma.user.create({
                data: {
                    email,
                    name,
                }
            });
        }

        // Generate JWT tokens
        const payload = { id: user.id, email: user.email, role: user.role };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });

        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        return { accessToken, refreshToken };

    } catch (err) {
        console.error("Google sign-in failed:", err.response?.data || err.message);
        throw new Error("Google authentication failed");
    }
};