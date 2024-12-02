
export interface User {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    profileImage: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfileUpdateDTO {
    email: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    profileImage?: File; // Optional field for profile image upload
}