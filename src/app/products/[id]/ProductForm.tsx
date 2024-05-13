"use client";

import { createProduct, updateProduct } from "@/actions/products";
import { EditableField } from "@/components/EditableField";
import { Product } from "@prisma/client";
import { useState } from "react";

type ProductFormProps = {
  existingProduct: Product | null;
};

export function ProductForm({ existingProduct }: ProductFormProps) {
  const [editingMode, setEditingMode] = useState(existingProduct === null);
  //The editing mode is probably unnecessary complexity.
  //If the goal is to prevent accidental editing by the user,
  //that should not be a concern, because anyone granted access
  //to the data should be trusted to use the "save changes"
  //button responsibly.

  function submitAction(e: FormData) {
    if (!existingProduct) createProduct(e);
    else updateProduct(e, existingProduct.id);
    setEditingMode(false);
  }

  return (
    <>
      <h1>{existingProduct ? "Edit Product" : "Create Product"}</h1>
      {existingProduct && (
        <div>
          <label htmlFor="edit-mode">
            <input
              type="checkbox"
              name="edit-mode"
              id="edit-mode"
              onChange={(e) => setEditingMode(e.target.checked)}
              checked={editingMode}
            />
            Editing Mode
          </label>
        </div>
      )}
      <form action={submitAction}>
        <div>
          <EditableField
            type="text"
            name="name"
            id="name"
            labelText="Name"
            editingEnabled={editingMode}
            defaultValue={existingProduct ? existingProduct.name : undefined}
          />
        </div>
        <div>
          <EditableField
            type="number"
            name="price"
            id="price"
            step={0.01}
            defaultValue={
              existingProduct ? `${existingProduct.priceCents / 100}` : "0"
            }
            editingEnabled={editingMode}
            labelText="Price"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
}
