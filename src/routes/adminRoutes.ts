import { RequestHandler, Router } from "express";
import AdminController from "../controllers/adminController";
import UserRepository from "../repositories/userRepository";
import {AdminService} from "../services/adminServices";
import { ADMIN_ROUTES } from "../constants/routes_constants";
import AdminRepository from "../repositories/adminRepository";


const userRepository = new UserRepository();
const adminRepository=new AdminRepository()

const adminService = new AdminService(userRepository,adminRepository);
const adminController = new AdminController(adminService);


const adminRouter = Router();

adminRouter.get(ADMIN_ROUTES.FETCHALL_STUDENTS,adminController.fetchAllStudents.bind(adminController) as RequestHandler)
adminRouter.post(ADMIN_ROUTES.LOGIN,adminController.adminLogin.bind(adminController) as RequestHandler)
adminRouter.put(ADMIN_ROUTES.BLOCK_UNBLOCK_USER,adminController.blockUnblockUser.bind(adminController))
adminRouter.post(ADMIN_ROUTES.LOGOUT,adminController.logout.bind(adminController) as RequestHandler)
adminRouter.get(ADMIN_ROUTES.FETCH_REQUESTS,adminController.fetchAllRequestedUsers.bind(adminController))
adminRouter.patch(ADMIN_ROUTES.APPROVE_INSTRUCTOR,adminController.approveInstructor.bind(adminController))
adminRouter.patch(ADMIN_ROUTES.REJECT_INSTRUCTOR,adminController.rejectInstructor.bind(adminController))


export default adminRouter