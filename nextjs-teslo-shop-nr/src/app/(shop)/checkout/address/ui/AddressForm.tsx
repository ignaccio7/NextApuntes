"use client";

import { useForm } from "react-hook-form";
import switchStyle from "./switch.module.css";
import clsx from "clsx";
import { Address, Country } from "@/interfaces";
import { useAddressStore, useCartStore } from "@/store";
import { useEffect } from "react";
import { deleteUserAddress, setUserAddress } from "@/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  countries: Country[];
  userStoreAddress?: Partial<Address> | null;
}

interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress?: boolean;
}

export function AddressForm({ countries, userStoreAddress = {} }: Props) {
  const router = useRouter();  

  const { data: session } = useSession({
    required: true, // si la persona no esta autenticada ira al login
  });

  const address = useAddressStore((state) => state.address) || {};
  const setAddress = useAddressStore((state) => state.setAddress);  

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      // Todo: para leer la base de datos
      ...userStoreAddress,
      rememberAddress: false,
    },
  });

  useEffect(() => {
    console.log("useeffect");
    console.log({ address });
    if (address.firstName) reset(address);
  }, [address]);

  console.log(session?.user?.id);

  const onSubmit = async (data: FormInputs): Promise<void> => {
    console.log(data);
    // save in localstorage

    const { rememberAddress, ...rest } = data;
    setAddress(rest);

    // save to database
    if (session?.user?.id) {
      if (rememberAddress) {
        const response = await setUserAddress(rest, session.user.id);
        console.log(response);
      } else {
        // delete to database
        const response = await deleteUserAddress(session.user.id);
        console.log(response);
      }
    }

    router.push("/checkout");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row flex-wrap">
      <label
        htmlFor="firstName"
        className="flex-1 basis-full md:basis-1/2 pb-4"
      >
        Nombres
        <input
          {...register("firstName", { required: true })}
          type="text"
          name="firstName"
          id="firstName"
          className="block w-full md:w-11/12 p-2 bg-gray-400"
        />
      </label>
      <label htmlFor="lastName" className="flex-1 basis-full md:basis-1/2 pb-4">
        Apellidos
        <input
          {...register("lastName", { required: true })}
          type="text"
          name="lastName"
          id="lastName"
          className="block w-full md:w-11/12 p-2 bg-gray-400"
        />
      </label>
      <label htmlFor="address" className="flex-1 basis-full md:basis-1/2 pb-4">
        Direccion
        <input
          {...register("address", { required: true })}
          type="text"
          name="address"
          id="address"
          className="block w-full md:w-11/12 p-2 bg-gray-400"
        />
      </label>
      <label htmlFor="address2" className="flex-1 basis-full md:basis-1/2 pb-4">
        Direccion 2 (opcional)
        <input
          {...register("address2")}
          type="text"
          name="address2"
          id="address2"
          className="block w-full md:w-11/12 p-2 bg-gray-400"
        />
      </label>
      <label
        htmlFor="postalCode"
        className="flex-1 basis-full md:basis-1/2 pb-4"
      >
        Codigo postal
        <input
          {...register("postalCode", { required: true })}
          type="text"
          name="postalCode"
          id="postalCode"
          className="block w-full md:w-11/12 p-2 bg-gray-400"
        />
      </label>
      <label htmlFor="city" className="flex-1 basis-full md:basis-1/2 pb-4">
        Ciudad
        <input
          {...register("city", { required: true })}
          type="text"
          name="city"
          id="city"
          className="block w-full md:w-11/12 p-2 bg-gray-400"
        />
      </label>
      <label htmlFor="country" className="flex-1 basis-full md:basis-1/2 pb-4">
        Pais
        <select
          {...register("country", { required: true })}
          name="country"
          id="country"
          className="block w-full md:w-11/12 p-2 bg-gray-400"
        >
          <option value="">[Seleccione]</option>
          {/* <option value="uno">Pais 1</option>
          <option value="dos">Pais 2</option>
          <option value="tres">Pais 3</option> */}
          {countries.map((country) => {
            return (
              <option value={country.id} key={country.id}>
                {country.name}
              </option>
            );
          })}
        </select>
      </label>
      <label htmlFor="phone" className="flex-1 basis-full md:basis-1/2 pb-4">
        Telefono
        <input
          {...register("phone", { required: true })}
          type="text"
          name="phone"
          id="phone"
          className="block w-full md:w-11/12 p-2 bg-gray-400"
        />
      </label>
      {/* Switch checkbox */}
      <div className="basis-full flex-1">
        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            {...register("rememberAddress")}
            type="checkbox"
            name="rememberAddress"
            id="rememberAddress"
            className={`${switchStyle.toggleCheckbox} toggleCheckbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`}
          />
          <label
            htmlFor="rememberAddress"
            className="toggleLabel block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer"
          ></label>
        </div>
        <label
          htmlFor="rememberAddress"
          className="text-md text-gray-800 font-semibold"
        >
          ¿Recordar esta direccion?
        </label>
      </div>
      {/* Switch checkbox */}
      <button
        // href="/checkout"
        // disabled={!isValid}
        type="submit"
        className={clsx("mt-4 p-3 w-2/3 md:w-1/3", {
          "btn-primary": isValid,
          "btn-disabled": !isValid,
        })}
      >
        Siguiente
      </button>
    </form>
  );
}
