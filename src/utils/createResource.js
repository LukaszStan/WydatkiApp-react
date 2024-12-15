'use client';

export function createResource(promise) {
    let status = 'pending';
    let result;

    const suspender = promise
        .then((data) => {
            status = 'success';
            result = data;
        })
        .catch((error) => {
            status = 'error';
            result = error;
        });

    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        },
    };
}
