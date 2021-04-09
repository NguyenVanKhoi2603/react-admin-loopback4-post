
const authProvider = {
    login: ({ username, password }) => {
        const request = new Request('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(token => {
                localStorage.setItem('token', JSON.stringify(token));
                //requestHeaders.set('Authorization', `Bearer ${token.token}`)
                //headers: new headers({ 'Authorization': 'Bearer ' + token.token })
                localStorage.setItem('permissions', JSON.stringify(token.info.role));
            })
            .catch(() => {

                throw new Error('Invalid email or password or Network error')
            });
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject({ message: false });
        }
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem('token')
        ? Promise.resolve()
        : Promise.reject({ message: false }),
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    getIdentity: () => {
        try {
            const { id, gmail } = JSON.parse(localStorage.getItem('token'));
            return Promise.resolve({ id, gmail });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};

export default authProvider;