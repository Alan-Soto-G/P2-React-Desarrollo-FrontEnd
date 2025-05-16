// components/emergentCrud.tsx
import React from "react";
import "../styles/emergentCrud.css";

interface EmergentCrudProps {
  Title: string;
  Fields: { [key: string]: { type: string; placeholder: string } };
  TextButton: string;
  Edit: (id: number, product: any) => void;
  Delete: (id: number) => void;
  handleBackgroundClick: (e: React.MouseEvent) => void;
  DefaultValues?: any;
}

const EmergentCrud: React.FC<EmergentCrudProps> = ({
  Title,
  Fields,
  TextButton,
  Edit,
  handleBackgroundClick,
  DefaultValues
}) => {
  return (
    <div id="emergent-crud" onClick={handleBackgroundClick}>
      <div id="card">
        <h1>{Title}</h1>
        {Object.entries(Fields).map(([key, field], index) => (
          <div key={index} className="fields">
            <input
              type={field.type}
              id={key}
              defaultValue={DefaultValues ? DefaultValues[key] : ""}
              placeholder={field.placeholder}
            />
          </div>
        ))}
        <button
          onClick={() => {
            const formData: any = {};
            Object.keys(Fields).forEach((key) => {
              const input = document.getElementById(key) as HTMLInputElement;
              formData[key] = input.value;
            });
            if (DefaultValues?.id) {
              Edit(DefaultValues.id, formData);
            }
          }}
        >
          {TextButton}
        </button>
      </div>
    </div>
  );
};

export default EmergentCrud;
