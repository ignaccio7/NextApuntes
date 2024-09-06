'use server';
 
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    await sleep(1)

    console.log("Las credenciales son")
    console.log(Object.fromEntries(formData))

    // await signIn('credentials', Object.fromEntries(formData));   esto sirve
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    });  

    revalidatePath("/")

    return 'Success'

  } catch (error) {
    console.log("ESTO ES DE LADO DEL SERVIDOR")
    console.log(error)
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.';
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }
    // throw error;
    return "CredentialsSignin"
  }
}

export async function login(email:string, password:string) {
  try {
    await signIn('credentials', {email, password})
    return {
      ok:true
    }
  } catch (error) {
    console.log(error)
    return {
      ok:false,
      message:'Nose pudo iniciar la sesion'
    }
  }
}