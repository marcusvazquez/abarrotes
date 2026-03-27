"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

interface Product {
  id: string;
  name: string;
  details: string;
  value: string;
}

interface FormState {
  name: string;
  details: string;
  value: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  details: "",
  value: "",
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formValues, setFormValues] = useState<FormState>(EMPTY_FORM);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formValues.name.trim();
    const trimmedDetails = formValues.details.trim();
    const trimmedValue = formValues.value.trim();

    if (!trimmedName || !trimmedDetails || !trimmedValue) {
      setErrorMessage("Completa todos los campos antes de agregar el producto.");
      return;
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: trimmedName,
      details: trimmedDetails,
      value: trimmedValue,
    };

    setProducts((previous) => [newProduct, ...previous]);
    setFormValues(EMPTY_FORM);
    setErrorMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 px-6 py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3">
          <Image
            src="/logo-lince.png"
            alt="Logo Lince"
            width={44}
            height={44}
            className="h-11 w-11 rounded-md object-cover ring-1 ring-slate-300"
            priority
          />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            MiAppCatálogo
          </h1>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Registrar Producto</h2>
          <p className="mt-2 text-sm text-slate-500">
            Ingresa los detalles para añadir un nuevo artículo al catálogo.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleAddProduct}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-slate-900"
              >
                Nombre del producto
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ej. Computadora portátil"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="details"
                className="text-sm font-semibold text-slate-900"
              >
                Detalle
              </label>
              <textarea
                id="details"
                placeholder="Describe las características principales..."
                value={formValues.details}
                onChange={(event) =>
                  setFormValues((previous) => ({
                    ...previous,
                    details: event.target.value,
                  }))
                }
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="value"
                className="text-sm font-semibold text-slate-900"
              >
                Valor
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200">
                <span className="px-3 text-sm font-medium text-slate-500">$</span>
                <input
                  id="value"
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={formValues.value}
                  onChange={(event) =>
                    setFormValues((previous) => ({
                      ...previous,
                      value: event.target.value,
                    }))
                  }
                  className="w-full rounded-r-lg px-1 py-2 text-sm text-slate-900 outline-none"
                />
              </div>
            </div>

            {errorMessage ? (
              <p className="text-sm font-medium text-rose-800">{errorMessage}</p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-lg bg-rose-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-900"
            >
              + Agregar Producto
            </button>
          </form>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-slate-900">
              Vitrina de Productos
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
              {products.length} Artículos registrados
            </span>
          </div>

          {products.length === 0 ? (
            <div className="mt-8 flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-12 w-12 text-slate-400"
                aria-hidden="true"
              >
                <path d="M3.75 8.25 12 3.75l8.25 4.5M3.75 8.25V18l8.25 4.5M3.75 8.25 12 12m8.25-3.75V18L12 22.5M12 12v10.5" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Tu catálogo está vacío
              </h3>
              <p className="mt-2 max-w-md text-sm text-slate-500">
                Registra tu primer producto en el panel izquierdo para verlo
                aparecer aquí instantáneamente.
              </p>
            </div>
          ) : (
            <ul className="mt-6 space-y-4">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{product.details}</p>
                  <p className="mt-3 text-sm font-bold text-rose-800">
                    ${product.value}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="bg-slate-900 px-4 py-4 text-center text-sm text-white">
        Desarrollado por Marcus Alexis Vazquez Zavala - Grupo: 4DPGM
      </footer>
    </div>
  );
}
