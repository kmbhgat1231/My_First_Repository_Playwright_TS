export interface LoginTestData {

    userName? : string;
    password? : string;
}

export const validUser:LoginTestData={
    userName:'Admin',
    password:'admin123'

}

export const missingUsername:LoginTestData={

    password:'admin123'
}

export const invalidUser:LoginTestData={
    userName:'kshor',
    password:'admin'
}

export const missingPassword:LoginTestData={
    userName:'Admin'
}