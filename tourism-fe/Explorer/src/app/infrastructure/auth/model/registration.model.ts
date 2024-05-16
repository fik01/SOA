export interface Registration {
    user : user
}

export interface user {
  username: string,
  password: string,
  role: string,
  IsActive: boolean
  personalInfo: personalInfo,
}

export interface personalInfo{
  name: string,
  surname: string,
  email: string,
}
