const users = [
    {
        id: 1,
        name: 'Tharindu Nimesh',
        email: 'tharindunimesh.abc@gmail.com'
    },
    {
        id: 2,
        name: 'Dilini Tharaka',
        email: 'ntdilinitha.123@gmail.com'
    }
];

export class UserController {
    getUser(email) {
        const user = users.find((user) => {
            return user.email == email;
        });

        return user;
    }
};