import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ACCESS_CODES } from '../data/content';

import Card from '../components/Card';
import Layout from '../components/Layout';

const AccessCode = () => {
    const { grantAccess } = useGame();
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ACCESS_CODES.includes(code)) {
            grantAccess();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <Layout>
            <Card className="relative overflow-hidden flex flex-col items-center text-center p-0">
                <div className="absolute inset-0 bg-[url('/images/brugis.png')] bg-cover bg-center opacity-90 pointer-events-none" />
                <div className="relative z-10 w-full flex flex-col items-center py-8 px-0">
                    <div
                        className="relative w-full max-w-[400px] bg-cover bg-center flex justify-center items-center mb-4 text-black"
                        style={{
                            aspectRatio: '2492 / 1170',
                            backgroundImage: "url('/images/Title_paper.png')"
                        }}
                    >
                        <h1
                            className="font-medieval font-bold text-center px-6 leading-tight select-none"
                            style={{ fontSize: '40px' }}
                        >
                            Domkapitula
                            <br />
                            mīkla
                        </h1>
                    </div>
                    <div
                        className="w-full max-w-[500px] bg-center bg-no-repeat bg-[length:100%_100%] flex flex-col items-center justify-center text-center py-8 px-6 mb-6"
                        style={{ backgroundImage: "url('/images/papirs_horizontali.png')" }}
                    >
                        <p className="text-lg font-bold text-black">
                            Lūdzu ievadiet piekļuves kodu, ko saņēmāt muzejā.
                            <br />
                            <br />
                            Please enter the access code you received at the museum.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full max-w-sm px-4 flex flex-col gap-4">
                        <input
                            type="text" // numeric keyboard better but pattern helps
                            inputMode="numeric"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="kods/code"
                            className="w-[100%] mx-auto block py-6 px-3 text-center bg-[length:100%_100%] bg-center bg-no-repeat border-none text-2xl text-gray-900 focus:outline-none"
                            style={{ backgroundImage: "url('/images/Scroll.png')" }}
                        />

                        {error && (
                            <div
                                className="w-[60%] mx-auto py-3 px-6 flex justify-center items-center bg-[length:100%_100%] bg-center bg-no-repeat"
                                style={{ backgroundImage: "url('/images/papirs_horizontali_2.png')" }}
                            >
                                <p className="text-red-600 text-sm font-bold animate-pulse text-center">
                                    Nepareizs kods<br />Invalid code
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full text-white py-4 text-3xl font-medieval transition-transform shadow-xl active:scale-95 duration-100 bg-[length:100%_100%] bg-center bg-no-repeat drop-shadow-2xl [-webkit-text-stroke:_0.9px_black] [text-shadow:_2px_2px_2px_rgba(0,0,0,0.5)]"
                            style={{ backgroundImage: "url('/images/Delis.png')" }}
                        >
                            Ievadīt / Submit
                        </button>
                    </form>
                </div>
            </Card>
        </Layout>
    );
};

export default AccessCode;
