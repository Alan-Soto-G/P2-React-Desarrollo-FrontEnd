import type { Address } from "../../model/Address";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Definimos la interfaz para los props
interface MyFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Address) => void;
    handleUpdate?: (values: Address) => void;
    address?: Address | null;
}



const AddressFormValidator: React.FC<MyFormProps> = ({ mode, handleCreate, handleUpdate, address }) => {

    const handleSubmit = (formattedValues: Address) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);  // Si `handleCreate` está definido, lo llamamos
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);  // Si `handleUpdate` está definido, lo llamamos
        } else {
            console.error('No function provided for the current mode');
        }
    };

    return (
        <Formik
            initialValues={address ? address :{
                street: "",
                city: "",
                state: "",
                postal_code: "",
                additional_info: "",
            }}
            validationSchema={Yup.object({
                street: Yup.string().required("La calle es obligatoria"),
                city: Yup.string().required("La ciudad es obligatoria"),
                state: Yup.string().required("El estado es obligatorio"),
                postal_code: Yup.string()
                    .matches(/^\d{6}$/, "El código postal debe tener 6 dígitos")
                    .required("El código postal es obligatorio"),
                additional_info: Yup.string()
            })}
            onSubmit={(values) => {
                const formattedValues = { ...values};  // Formateo adicional si es necesario
                handleSubmit(formattedValues);
            }}
            
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Calle */}
                    <div>
                        <label htmlFor="street" className="block text-lg font-medium text-gray-700">Calle</label>
                        <Field type="text" name="street" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="street" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Ciudad */}
                    <div>
                        <label htmlFor="city" className="block text-lg font-medium text-gray-700">Ciudad</label>
                        <Field type="text" name="city" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Estado */}
                    <div>
                        <label htmlFor="state" className="block text-lg font-medium text-gray-700">Estado</label>
                        <Field type="text" name="state" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="state" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Código postla */}
                    <div>
                        <label htmlFor="postal_code" className="block text-lg font-medium text-gray-700">Código postal</label>
                        <Field type="text" name="postal_code" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="postal_code" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Info adicional */}
                    <div>
                        <label htmlFor="additional_info" className="block text-lg font-medium text-gray-700">Información adicional</label>
                        <Field type="text" name="additional_info" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="additional_info" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className={`py-2 px-4 text-white rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear" : "Actualizar"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AddressFormValidator;