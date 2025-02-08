import { Request, Response, NextFunction } from "express";
import { UserService } from '../services/userServices'
import { Status } from "../utils/enums";
import { Cookie } from "../interfaces/IEnums";

class UserController {
    constructor(private _userService: UserService) {
        this._userService = _userService

    }

    async signupUser(req: Request, res: Response) {
        try {
            const result = await this._userService.signupUser(req.body);
            res.status(Status.CREATED).json({
                status: result.success,
                message: result.message,
                data: result.data,
            });
        } catch (error) {
            res.status(Status.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });
        }
    }

    async verifyOtp(req: Request, res: Response) {
        try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                return res.status(Status.BAD_REQUEST).json({
                    success: false,
                    message: "Email and OTP are required.",
                });
            }

            const result = await this._userService.verifyOtp({ email, otp }, res);

            res.status(result.success ? Status.OK : Status.BAD_REQUEST).json({
                success: result.success,
                message: result.message,
                token: result.token,
                refreshToken: result.refreshToken,
                userData: result.userData
            });

        } catch (error) {
            console.error("Error during OTP verification:", error);
            res.status(Status.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    async userLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(Status.BAD_REQUEST).json({
                    success: false,
                    message: "Email and password are required.",
                });
            }

            const result = await this._userService.userLogin({ email, password }, res);

            res.status(result.success ? Status.OK : Status.BAD_REQUEST).json({
                success: result.success,
                message: result.message,
                token: result.token,
                refreshToken: result.refreshToken,
                userData: result.userData
            });

        } catch (error) {
            console.error("Error during login:", error);
            res.status(Status.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }



    //get user data
    async getUser(req: Request, res: Response): Promise<void> {
        try {
            let token = req.headers.authorization;

            if (!token) {
                res.status(Status.UN_AUTHORISED).json({
                    success: false,
                    message: "Authorization token is required",
                });
                return;
            }

            token = token.split(" ")[1];

            const result = await this._userService.getUser(token);
            res.status(Status.OK).json(result);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(Status.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal server error",
            });
        }
    }


    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie(Cookie.userJWT, {
                httpOnly: true,
            });

            return res.status(Status.OK).json({
                status: "Success",
                message: "User logged out successfully",
            });
        } catch (error) {
            next(error);
        }
    }


    async resendOtp(req: Request, res: Response) {
        try {
            const { email } = req.body;
    
            if (!email) {
                return res.status(Status.BAD_REQUEST).json({
                    success: false,
                    message: "Email is required.",
                });
            }
    
            const result = await this._userService.resendOtp(email);
    
            res.status(result.success ? Status.OK : Status.BAD_REQUEST).json({
                success: result.success,
                message: result.message,
            });
    
        } catch (error) {
            console.error("Error resending OTP:", error);
            res.status(Status.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
    
}





export default UserController;