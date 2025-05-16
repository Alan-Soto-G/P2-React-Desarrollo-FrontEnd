const API_URL = import.meta.env.VITE_BACKEND_API + "products";

export const GetProducts = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // data es el array de productos
        console.log("Data recibida:", data);

        const mappedContent = data.map((product: any) => [
            product.id.toString(),
            product.name,
            product.category,
            product.price.toString(),
            product.description,
            new Date(product.created_at).toLocaleString()
        ]);
        return(mappedContent);
    } catch (error) {
        console.error("Error al cargar productos:", error);
        alert(":C")
    }
};

export const CreateProduct = async (product: any) => {
    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
};

export const EditProduct = async (id: string, product: any) => {
    await fetch(`${API_URL}${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
};

export const DeleteProduct = async (id: string) => {
    await fetch(`${import.meta.env.VITE_BACKED_URL}products/${id}`, {
        method: "DELETE"
    });
};