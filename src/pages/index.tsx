import { useRouter } from "next/router";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const { push } = useRouter();
    useEffect(() => {
        push(`/${uuidv4()}`);
    }, [push]);
    return <></>;
}
