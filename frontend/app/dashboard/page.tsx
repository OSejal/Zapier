"use client"

import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/DarkButton";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
        } 
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": "webhook",
            "name": "Webhook"
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zaps`, {
            headers: {
                "Authorisation": localStorage.getItem("token")
            }
        })
        .then(res => {
           setZaps(res.data.zaps); 
           setLoading(false);
        })
    }, []);

    return {
        loading, zaps
    }
}
export default function() {
    const { loading, zaps } = useZaps();

    return <div>
        <Appbar />
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
            <div className="flex justify-between pr-8">
                <div className="text-2xl font-bold">
                    My Zaps
                </div>
                <DarkButton onClick={() => {

                }}>
                    Create
                </DarkButton>
            </div>
            </div>
        </div>
        {loading ? "Loading..." : <ZapTable zaps={zaps} />}
    </div>
} 

function ZapTable({ zaps }: {zaps: Zap[]}) {
    const router = useRouter();
    return <table className="table-auto">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Last Edit</th>
                <th>Running</th>
            </tr>
        </thead>
        <tbody>
            {zaps.map(z => <div>
                <td>{z.trigger.type.name} { z.actions.map(x => x.type.name + " " )}</td>
                <td>{z.id}</td>
                <td>Nov 13, 2003</td>
                <td><LinkButton onClick={() => {
                    router.push("/zap/" + z.id)
                }}>Go</LinkButton></td>
                <td>1961</td>
            </div>)}
        </tbody>
    </table>
}