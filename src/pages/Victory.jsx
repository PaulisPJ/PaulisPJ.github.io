import React from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import Card from '../components/Card';
import Layout from '../components/Layout';

const Victory = () => {
    const { gameState, navigateTo } = useGame();
    const { language } = useLanguage();

    if (!gameState.riddleSolved) {
        navigateTo('riddle');
        return null;
    }

    const getPdfUrl = () => {
        // Simple root paths without accents as requested
        return language === 'lv' ? '/TMR_app_plakats_LV.pdf' : '/TMR_app_plakats_EN.pdf';
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

                <div className="relative z-10 w-full">
                    <a
                        href={getPdfUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="block w-full text-center text-black py-6 rounded-xl text-[20px] font-bold shadow-lg active:scale-95 transform duration-100 relative overflow-hidden bg-center bg-no-repeat bg-[length:100%_100%]"
                        style={{ backgroundImage: "url('/images_3/Title_paper.png')" }}
                    >
                        <span className="relative z-10">
                            {language === 'lv' ? 'Saņemt ziņojumu' : 'Receive the proclamation'}
                        </span>
                    </a>
                </div>
            </Card>
        </Layout>
    );
};

export default Victory;
