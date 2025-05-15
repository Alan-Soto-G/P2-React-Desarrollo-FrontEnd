const API_URL = import.meta.env.VITE_BACKED_URL + "products";


export const EditProduct = async (id: string) => {
    await fetch(`${API_URL}${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
        // body: JSON.stringify(product)
    });
};

export const DeleteProduct = async (id: string) => {
    await fetch(`${import.meta.env.VITE_BACKED_URL}products/${id}`, {
        method: "DELETE"
    });
};