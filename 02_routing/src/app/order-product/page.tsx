"use client";
import { useRouter } from "next/navigation";

export default function orderProduct() {
    const router = useRouter();
    const handleOrder = () => {
        // Simulate an order request
        console.log("Order placed successfully");
        router.push("/"); // navigate to "/"
        // router.replace("/"); // Replace "/" with the current path
        // router.back(); // navigate back
        // router.forward(); // navigate forward
    };
    return (
        <>
            <h1>Order Product Page</h1>
            <button onClick={handleOrder}>Order place</button>
        </>
    );
}
