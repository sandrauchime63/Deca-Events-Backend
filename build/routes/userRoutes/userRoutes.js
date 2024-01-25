"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegister_1 = require("../../controllers/userControllers/userRegister");
const userLogin_1 = require("../../controllers/userControllers/userLogin");
const changeProfilePic_1 = require("../../controllers/userControllers/changeProfilePic");
const authorization_1 = require("../../middleware/authorization");
const upload_1 = require("../../utilities/upload");
const userChangePassword_1 = require("../../controllers/userControllers/userChangePassword");
const updateProfile_1 = require("../../controllers/userControllers/updateProfile");
const deleteProfilePic_1 = require("../../controllers/userControllers/deleteProfilePic");
const resendVerification_1 = require("../../controllers/userControllers/resendVerification");
const verifyUser_1 = require("../../controllers/userControllers/verifyUser");
const getUserProfile_1 = require("../../controllers/userControllers/getUserProfile");
const createAccount_1 = require("../../controllers/accountControllers/createAccount");
const getAccount_1 = require("../../controllers/accountControllers/getAccount");
const editAccount_1 = require("../../controllers/accountControllers/editAccount");
const userEditProfile_1 = require("../../controllers/userControllers/userEditProfile");
const checkUserDetails_1 = require("../../controllers/userControllers/checkUserDetails");
const getTicketHistory_1 = require("../../controllers/userPayment/getTicketHistory");
const getUserEarnings_1 = require("../../controllers/userPayment/getUserEarnings");
const router = express_1.default.Router();
router.post("/signup", userRegister_1.registerUser);
router.post("/signin", userLogin_1.userLogin);
router.patch("/change_profile_picture", authorization_1.generalAuthoriser, upload_1.upload.single("profilePic"), changeProfilePic_1.changeProfilePicture);
router.patch("/change_password", authorization_1.generalAuthoriser, userChangePassword_1.changePassword);
router.patch("/update_profile", authorization_1.generalAuthoriser, upload_1.upload.single("identity_document"), updateProfile_1.updateProfile);
router.delete("/delete_profile_image", authorization_1.generalAuthoriser, deleteProfilePic_1.deleteProfileImage);
router.post("/resend-verification", resendVerification_1.resendVerification);
router.get("/verify/:token", verifyUser_1.verifyUser);
router.get("/get_profile", authorization_1.generalAuthoriser, getUserProfile_1.getUserProfile);
router.post("/add_account", authorization_1.generalAuthoriser, createAccount_1.addAccount);
router.get("/get_user_account", authorization_1.generalAuthoriser, getAccount_1.getUserBankAccount);
router.patch("/edit_account", authorization_1.generalAuthoriser, editAccount_1.userEditAccount);
router.patch("/edit_profile", authorization_1.generalAuthoriser, userEditProfile_1.userEditProfile);
router.post("/check", authorization_1.generalAuthoriser, checkUserDetails_1.userCheck);
router.get("/tickets", authorization_1.generalAuthoriser, getTicketHistory_1.getTicketHistory);
router.get("/earnings", authorization_1.generalAuthoriser, getUserEarnings_1.getUserEarnings);
exports.default = router;