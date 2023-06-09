import User from "../../models/users.js";

//buscamos un usuario a partir del mail y el rol ingresados en el login
const login = async (request, response) => {
	try {	const { email, rol } = request.body;
		const user = await User.findOne({ email: email, rol: rol });
		if (!user) {
			return response.status(403).json({ message: "User not authorized" });
		}
		return response.status(200).json(user);
	} catch(error) {
		next(error);
	}
};

export { login };