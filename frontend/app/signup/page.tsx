"use client"

import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import axios from "axios";
import { useReducer, useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
                <div className="flex-1 pt-20 px-4">
                    <div className="font-semibold text-3xl pb-4">
                        Join millions worldwide who automate their work using Zapier.
                    </div>
                    <div className="pb-6 pt-4">
                        <CheckFeature label={"Easy setup, no coding required"}/>
                    </div>
                    <div className="pb-6">
                        <CheckFeature label={"Free forever for core features"}/>
                    </div>
                    <CheckFeature label={"14-day trial of premium features and apps"}/>
                </div>

                <div className="flex-1 pt-6 pb-6 mt-12 px-4 border">
                    <Input label={"Name"} onChange={e => {
                        setName(e.target.value)
                    }} type="text" placeholder="Your name"></Input>
                    
                    <Input onChange={e => {
                        setEmail(e.target.value)
                    }} label={"Email"} type="text" placeholder="Your Email"></Input>
                    
                    <Input label={"Password"} onChange={e => {
                        setPassword(e.target.value)
                    }} type="password" placeholder="Your Password"></Input>
                    <div className="pt-4">
                        <PrimaryButton onClick={async () => {
    const payload = {
        username: email,
        password,
        name
    };
    
    console.log('Sending payload:', payload);
    console.log('Name length:', name.length);
    console.log('Email length:', email.length);
    console.log('Password length:', password.length);
    
    try {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, payload);
        router.push("/login");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
            alert(JSON.stringify(error.response?.data));
        }
    }
}} size="big">Signup</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}