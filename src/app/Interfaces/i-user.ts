export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    userGroupId: number;
    userCategoryId: number;
    company: string;
    imagePath: string;
    userRoleIds: Array<number>;
    password: string;
    roles: Array<any>;
}
