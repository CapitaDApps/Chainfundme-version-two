// Backend Controller Updates - Add these methods to your accountController.js

// Add this new method to generate invitation links
exports.generateInviteLink = async (req, res) => {
  try {
    const { email, role } = req.body;
    
    if (!email || !role) {
      return res.status(400).json({
        success: false,
        message: "Email and role are required",
      });
    }

    // Check if user is admin
    const isAdmin = req.user?.role === "admin";
    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can generate invite links",
      });
    }

    // Check if role is valid and if user can create that role
    if (role === "admin" && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can create admin accounts",
      });
    }

    // Generate invitation token
    const invitationToken = jwt.sign(
      { email, role, type: 'invitation' },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const invitationLink = `${frontendUrl}/account-management?token=${invitationToken}`;

    res.status(200).json({
      success: true,
      message: "Invitation link generated successfully",
      invitationLink,
      invitationToken,
      expiresIn: "24 hours"
    });
  } catch (error) {
    console.error("Error generating invite link:", error);
    res.status(500).json({
      success: false,
      message: "Server error while generating invite link",
      error: error.message,
    });
  }
};

// Add this new method for invited user signup
exports.signupWithInvitation = async (req, res) => {
  try {
    const {
      name,
      username,
      telephone,
      emergencyContact,
      email,
      address,
      password,
      startDate,
      images = [],
      invitationToken,
    } = req.body;

    if (!invitationToken) {
      return res.status(400).json({
        success: false,
        message: "Invitation token is required",
      });
    }

    // Verify invitation token
    let decoded;
    try {
      decoded = jwt.verify(invitationToken, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired invitation token",
      });
    }

    // Check if token is for invitation and email matches
    if (decoded.type !== 'invitation' || decoded.email !== email) {
      return res.status(401).json({
        success: false,
        message: "Invalid invitation token",
      });
    }

    // Validate required fields
    if (!name || !username || !telephone || !emergencyContact || !email || !address || !startDate || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if username or email already exists
    const existingUser = await Account.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 13);
    const newAccount = new Account({
      name,
      username,
      telephone,
      emergencyContact,
      email,
      address,
      password: hashedPassword,
      startDate,
      images: Array.isArray(images) ? images : [images],
      role: decoded.role || "fieldAgent",
    });

    const savedAccount = await newAccount.save();

    // Remove password from response
    const accountResponse = savedAccount.toObject();
    delete accountResponse.password;

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      account: accountResponse,
    });
  } catch (error) {
    console.error("Error creating account from invitation:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while creating account",
      error: error.message,
    });
  }
};

// Update the validateInvitation method to include role
exports.validateInvitation = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if it's an invitation token
    if (decoded.type !== 'invitation') {
      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid invitation token",
        });
    }

    res
      .status(200)
      .json({
        success: true,
        email: decoded.email,
        role: decoded.role,
      });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired invitation token" });
  }
};
