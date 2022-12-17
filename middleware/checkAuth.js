/**
 * Check auth middleware
 * @author Joshua Lazar
 */
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.JWT_SECRET;

// Check auth
exports.checkAuth = (req, res, next) => {
  // Get token from Header
  const header = req.get("Authorization");

  // Check if not token
  if (!header || !header.startsWith("Bearer")) {
    return res.status(403).json({
      success: false,
      message: "No token found, Authorization denied",
    });
  }

  try {
    // Decrypting token
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, tokenSecret);

    if (!decoded.user) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }

    req.user = decoded.user;

    // If user authenticated
    res.set("cache-control", "no-cache, no-store, private, must-revalidate, post-check=0, pre-check=0");

    // Done
    next();
  } catch (err) {
    // If not
    res.status(403).json({ success: false, message: "Your session has been expired" });
  }
};
