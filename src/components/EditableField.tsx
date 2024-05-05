import { useState } from "react";

type EditableFieldProps = {
  defaultValue?: string;
  labelText: string;
  id: string;
  name: string;
  editingEnabled: boolean;
  type: string;
  step?: number;
};

export function EditableField({
  defaultValue,
  id,
  labelText,
  name,
  editingEnabled,
  type,
  step,
}: EditableFieldProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}: </label>
      {editingEnabled ? (
        <input
          type={type}
          name={name}
          id={id}
          defaultValue={defaultValue}
          step={step}
        />
      ) : (
        <span>{defaultValue}</span>
      )}
    </>
  );
}
