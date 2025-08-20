import React from "react";

const PrintableIdeaPlan = ({ idea, plan }) => {
    if (!plan || !idea) return null;
}

return (
    <div className="p-6 text-black" style={{width: '21cm', minHeight: "29.7cm"}}>
        <h1 className="text-3xl font-extrabold mb-4 text-center">Idea Plan</h1>
        <h2 className="text-2xl"></h2>
    </div>
)