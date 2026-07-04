"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { GrShare } from "react-icons/gr";

const Page = () => {
    const [Quote, setQuote] = useState({
        author: null,
        quote: 'Here is your Quote',
    });

    async function getquote() {
        const res = await fetch(
            "https://api.api-ninjas.com/v2/randomquotes",
            {
                headers: {
                    "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY,
                },
            }
        );
        if (!res.ok) {
            console.error("Request failed:", res.status, res.statusText);
            return;
        }
        const data = await res.json();
        setQuote({
            author: data[0].author,
            quote: data[0].quote,
        });
    }
    async function Share() {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Daily Quotes",
                    text: `"${Quote.quote}"\n\n - ${Quote.author}`
                })
            }
            else {
                toast.error("This is Unsupported by web share API.")
            }
        } catch (err) {
            console.log(`error Occured : ${err}`)
        }
    }

    return (

        <div className="relative min-h-screen flex flex-col justify-center items-center bg-black text-white overflow-hidden px-6">

            <div className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[200px]" />
            <div className="absolute top-1/4 left-1/3 h-75 w-75 rounded-full bg-white/5 blur-[120px]" />

            <div className="relative z-10 w-fit py-6 px-10 md:px-24 my-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-center font-mono text-gray-300 tracking-[0.2em] uppercase shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all duration-300">
                Hey Want to see a new quote?
            </div>

            <button
                onClick={getquote}
                className="relative z-10 mt-6 px-14 py-3 rounded-full border border-white bg-white text-black font-mono tracking-wide transition-all duration-400 hover:scale-110 hover:bg-gray-200 hover:shadow-[0_0_45px_rgba(255,255,255,0.35)] active:scale-95"
            >
                Get QUOTE →
            </button>

            <motion.div
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10 mt-16 flex flex-col w-full max-w-3xl rounded-3xl border border-white/10 bg-linear-to-b  backdrop-blur-2xl px-12 py-12 text-center font-mono text-gray-100 whitespace-pre-line shadow-[0_0_80px_rgba(255,255,255,0.08)]"
            >
                <button
                    disabled={!Quote.author}
                    onClick={Share}
                    className={`absolute top-5 left-5 rounded-lg  text-[rgb(179,179,179)] p-2 bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 ${Quote.author ? "" : "cursor-not-allowed"}`}

                >

                    <GrShare />
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(
                            Quote.quote + (Quote.author ? ` - ${Quote.author}` : "")
                        );
                        toast.success("Copied to ClipBoard");
                    }}
                    disabled={!Quote.author}
                    className={`absolute top-5 right-5 rounded-lg text-[rgb(179,179,179)] p-2 bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110  ${Quote.author ? "" : "cursor-not-allowed"}`}

                >

                    <IoCopyOutline />
                </button>
                <div className="text-6xl text-gray-600 leading-none">“</div>

                <div className="mt-4 text-lg md:text-2xl leading-relaxed tracking-wide">
                    {Quote.quote}
                    {Quote.author && (
                        <p><br /><br /> - {Quote.author}</p>
                    )}
                </div>

                <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>

        </div >
    )
}

export default Page