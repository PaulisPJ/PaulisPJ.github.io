import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/Card';
import Layout from '../components/Layout';

const Victory = () => {
    const { gameState, navigateTo } = useGame();
    const { language } = useLanguage();
    const [playerName, setPlayerName] = useState('');
    if (!gameState.riddleSolved) {
        navigateTo('riddle');
        return null;
    }

    const generatePDF = async () => {
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

        try {
            const fontUrl = '/fonts/Caveat/static/Caveat-Regular.ttf';
            const response = await fetch(fontUrl);
            const fontBuffer = await response.arrayBuffer();
            const fontUint8Array = new Uint8Array(fontBuffer);
            
            let binaryString = '';
            const len = fontUint8Array.byteLength;
            for (let i = 0; i < len; i++) {
                binaryString += String.fromCharCode(fontUint8Array[i]);
            }
            const fontBase64 = btoa(binaryString);
            
            doc.addFileToVFS('Caveat-Regular.ttf', fontBase64);
            doc.addFont('Caveat-Regular.ttf', 'Caveat', 'normal');
            doc.setFont('Caveat', 'normal');
        } catch (error) {
            console.error('Failed to load Caveat font:', error);
            doc.setFont('serif', 'italic');
        }

        const img = new Image();
        img.src = language === 'lv' ? '/images/Sertifikats_lv.jpg' : '/images/Sertifikats_en.jpg';
        img.onload = () => {
            doc.addImage(img, 'JPEG', 0, 0, 210, 297);
            doc.setFontSize(30);
            const text = playerName.trim() || (language === 'lv' ? 'Vārds Uzvārds' : 'Name Surname');
            if (language === 'lv') {
                doc.text(text, 105, 113, { align: 'center' });
            } else {
                doc.text(text, 105, 119, { align: 'center' });
            }
            doc.save('Sertifikats.pdf');
        };
    };

    return (
        <Layout>
            <Card className="flex flex-col items-center justify-center p-6 min-h-[85vh] bg-[#FF6B00] relative overflow-hidden">
                {/* Background Image Container */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage: "url('/images_4/skaists_papirs.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.8
                    }}
                />

                <div
                    className="relative z-10 flex-1 flex flex-col items-center justify-center w-[120%] md:w-[100%] -mx-4 mb-4 pt-15 px-8 md:px-12 bg-center bg-no-repeat bg-[length:100%_100%]"
                    style={{ backgroundImage: "url('/images/Papirs_vertikali.png')" }}
                >
                    <p className="text-2xl font-serif leading-relaxed text-center text-black italic w-[70%] mx-auto pt-6 mt-9">
                        {language === 'lv'
                            ? "Jūs atminējāt Domkapitula šifrēto mīklu! Rīgas arhibīskaps ir izdevis ziņojumu, ka jūs esat Domkapitula vietas cienīgs! Dodieties uz kasi, kur saņemsiet savu sertifikātu par “Domkapitula sapulces vērtīgu cilvēku”!\n\nVai lejuplādējiet to savā telefonā spiežot pogu “saņemt ziņojumu”"
                            : "You have solved the encrypted Cathedral Chapter riddle! The Archbishop of Riga has issued a proclamation that you are worthy of a place in the Cathedral Chapter! Proceed to the ticket office, where you will receive your certificate as a “Person of value of the Cathedral Chapter Assembly”!\n\nOr download it by pressing the button “Receive the proclamation”"
                        }
                    </p>

                    {/* Decorative seal/stamp */}
                    <div className="mt-3 flex justify-center opacity-100 pb-25 mb-10">
                        <img
                            src="/images_4/zimogs_2.png"
                            alt="Seal"
                            className="w-24 h-24 object-contain"
                        />
                    </div>
                </div>

                <div className="relative z-10 w-full mb-4 px-8 md:px-12 flex justify-center">
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder={language === 'lv' ? 'Ievadiet savu vārdu' : 'Enter your name'}
                        className="w-full text-center text-2xl font-serif italic text-[#3d2b1f] py-4 px-4 rounded-xl shadow-inner border-2 border-[#b8955a] bg-[#fdf8ed] focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
                    />
                </div>

                <div className="relative z-10 w-full">
                    <button
                        onClick={generatePDF}
                        className="block w-full text-center text-black py-6 rounded-xl text-[20px] font-bold shadow-lg active:scale-95 transform duration-100 relative overflow-hidden bg-center bg-no-repeat bg-[length:100%_100%]"
                        style={{ backgroundImage: "url('/images_3/Title_paper.png')" }}
                    >
                        <span className="relative z-10">
                            {language === 'lv' ? 'Saņemt ziņojumu' : 'Receive the proclamation'}
                        </span>
                    </button>
                </div>

                <div className="relative z-10 w-full flex justify-center mt-6 mb-4">
                    <button
                        onClick={() => navigateTo('menu')}
                        className="w-[60%] max-w-[300px] text-white py-2 text-[24px] font-medieval font-bold transition-transform shadow-xl active:scale-95 duration-100 bg-[length:100%_100%] bg-center bg-no-repeat drop-shadow-2xl [-webkit-text-stroke:_0.3px_black] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]"
                        style={{ backgroundImage: "url('/images/Delis.png')" }}
                    >
                        {language === 'lv' ? 'Uz izvēlni' : 'To main menu'}
                    </button>
                </div>
            </Card>
        </Layout>
    );
};

export default Victory;
