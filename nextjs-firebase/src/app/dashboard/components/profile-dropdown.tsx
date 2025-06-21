"use client";
import { convertImageToBase64 } from "@/actions/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { updateDocument, uploadImage } from "@/lib/firebase";
import {
  ArrowDownCircleIcon,
  DoorClosedIcon,
  File,
  ImagePlus,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ProfileDropdown() {
  const user = useUser();

  const [image, setImage] = useState("");

  // Choose a new image
  const choseImage = async (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(URL.createObjectURL(file));

    try {
      const base64 = await convertImageToBase64(file);
      console.log(base64);
      const imagePath = `${user?.uid}/profile`;
      // esto funcionaria si pagaramos firebase o actualizariamos la cuenta
      const imageUrl = await uploadImage(imagePath, base64);
      await updateDocument(`users/${user?.uid}`, {
        image: imageUrl,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al subir la imagen");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ArrowDownCircleIcon className="w-4 aspect-square object-contain" />
          Cuenta
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="flex flex-col items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="profile"
              className="w-8 rounded-full aspect-square object-contain"
            />
          ) : (
            <>
              <input
                type="file"
                name="profile"
                id="profile"
                className="hidden"
                onChange={choseImage}
                accept="image/*"
              />
              <label
                htmlFor="profile"
                className="inline-block mx-auto py-1 px-2 bg-gray-700 text-white rounded-full"
              >
                <ImagePlus className="w-4 aspect-square object-contain" />
              </label>
            </>
          )}
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="w-4 aspect-square object-contain" />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <File className="w-4 aspect-square object-contain" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DoorClosedIcon className="w-4 aspect-square object-contain" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
