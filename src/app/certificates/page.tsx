import Container from "@/app/_components/container";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Award, Calendar, Building2, BadgeCheck } from "lucide-react";

const certificates = [
    {
        title: "Networking Basics",
        issuer: "Cisco Networking Academy",
        date: "December 2024",
        image: "/assets/blog/certificate/NetworkingBasics.jpg",
        link: "https://www.credly.com/badges/a797a6c0-9c37-4610-9563-62aa7a12942c/public_url"
    },
    {
        title: "JavaScript Essentials 1",
        issuer: "Cisco Networking Academy",
        date: "October 2024",
        image: "/assets/blog/certificate/JavaScriptEssentials1.jpg",
        link: "https://www.credly.com/badges/ea731341-a0c0-4208-b489-1c890e6ea5ec/public_url"
    },
    {
        title: "JavaScript Essentials 2",
        issuer: "Cisco Networking Academy",
        date: "November 2024",
        image: "/assets/blog/certificate/JavaScriptEssentials2.jpg",
        link: "https://www.credly.com/badges/af8d4296-7881-4eaf-8bc8-291c6c8e6da5/public_url"
    }
];

export default function Certificates() {
    return (
        <main className="bg-white dark:bg-black min-h-screen pt-32 pb-20">
            <Container>
                {/* Header */}
                <section className="max-w-3xl mx-auto mb-16 text-center animate-fade-in-up">
                    <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-blue-50 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400">
                        <BadgeCheck className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-mono text-slate-800 dark:text-white mb-6">
                        Certifications
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
                        Những chứng chỉ và thành tựu mình đã đạt được trên hành trình trau dồi kiến thức chuyên môn.
                        Đây là minh chứng cho sự nỗ lực không ngừng nghỉ để hoàn thiện bản thân trong lĩnh vực CNTT.
                    </p>
                </section>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, index) => (
                        <a
                            key={index}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block h-full bg-white dark:bg-[#0a0e27]/40 border border-slate-200 dark:border-cyan-500/20 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-sm font-bold text-slate-900 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        Verify Credential <ExternalLink className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-cyan-300 mb-4 font-mono group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                                    {cert.title}
                                </h3>

                                <div className="space-y-3 text-sm font-mono text-slate-600 dark:text-slate-400">
                                    <div className="flex items-center gap-3">
                                        <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                        <span>{cert.issuer}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                        <span>{cert.date}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </Container>
        </main>
    );
}
