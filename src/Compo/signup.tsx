import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios"

function googleOauth() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"; // Corrected URL

    const options = {
        redirect_uri: "http://localhost:1301/api/v1/oauth/google",
        client_id: "523137783564-2ppv0qcq9555pqjgdv0ea74kn0nfrbup.apps.googleusercontent.com",
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/gmail.readonly",  // Read emails
            "https://www.googleapis.com/auth/gmail.modify"  // Changed to userinfo.email for proper scope
        ].join(" "),
    };

    const qs = new URLSearchParams(options);
    console.log("qs: " + qs)

    return `${rootUrl}?${qs.toString()}`;
}

const formSchema = z.object({
    userName: z.string().min(2, {
        message: "Username must be atleast 2 characters"
    }),
    email: z.string().email(),
    password: z.string().min(8, {
        message: "The password must be a minimum of 8 characters Nigga!"
    })
})
export default function SignUp() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    const handleGoogleButton = async () => {
        window.location.href = googleOauth();
    }


    return (
        <div className="bg-black flex justify-center items-center h-dvh">

            <div className="bg-zinc-950 dark:bg-white px-9 py-9 rounded-2xl w-1/2  ">
                {/* <a href={googleOauth()}>Login</a> */}

                {/* <GoogleButton onClick={handleGoogleButton} /> */}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Email Id</FormLabel>
                                    <FormControl>
                                        <Input placeholder="helloCutie@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="A7jUZssQ" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
                <Button className="my-4 w-full" onClick={handleGoogleButton} >Login with Google</Button>
            </div>
        </div>

    );
}
