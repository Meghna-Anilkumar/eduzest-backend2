import { Document, ObjectId, Decimal128 } from "mongoose";

export interface UserDoc extends Document {
  email: string;
  name: string;
  isVerified: boolean;
  profile?: {
    dob?: string;
    gender?: "Male" | "Female" | "Other";
    profilePic?: string;
  };
  updatedAt?: Date;
  role?: "Student" | "Instructor" | "Admin";
  createdAt?: Date;
  isBlocked?: boolean;
  password: string;
  phone?: number;
  qualification?:string;
  studentDetails?: {
    additionalEmail?: string;
    enrolledCourses?: {
      courseId: ObjectId;
      progress?: number;
      rating?: string;
    }[];
   
    socialMedia?: {
      linkedin?: string;
      github?: string;
    };
  };
  instructorDetails?: {
    createdCourses?: ObjectId[];
    profit?: Decimal128;
    rating?: Decimal128;
  };
  isGoogleAuth?: boolean;
  aboutMe?: string;
  cv?: string;
  isRequested?: boolean;
  isRejected?: boolean;
}
