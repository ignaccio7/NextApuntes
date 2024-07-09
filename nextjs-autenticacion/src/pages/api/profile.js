import jwt from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;
  //console.log(myTokenName);

  if (!myTokenName) {
    return res.status(401).json({ error:'Token no encotrado' })
  }

  try {
    const user = jwt.verify(myTokenName, "secretWord");
    console.log(user);

    return res.json({
      email: user.email,
      username: user.username
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: 'Invalid token' })
  }
}
