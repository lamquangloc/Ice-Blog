import Container from "@/app/_components/container";
import Image from "next/image";
import Link from "next/link";
import { Github, Facebook, Mail, Phone, Code2, Database, Layout, Server, Terminal, Cpu, Briefcase, ExternalLink } from "lucide-react";

export default function About() {
    return (
        <main className="bg-white dark:bg-black min-h-screen pt-32 pb-20">
            <Container>
                {/* Header: Avatar + Info */}
                <div className="flex flex-col items-center text-center space-y-6 mb-20 animate-fade-in-up">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-slate-100 dark:border-cyan-500/30 shadow-2xl">
                        <Image
                            src="/assets/blog/authors/avatar.png"
                            alt="Lâm Quang Lộc"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold font-mono text-slate-800 dark:text-cyan-300">
                            Lâm Quang Lộc
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-sm md:text-base">
                            <span>14/12/2004</span>
                            <span>•</span>
                            <span className="text-blue-600 dark:text-pink-400 font-semibold">Software Engineer</span>
                        </div>
                    </div>
                </div>

                {/* Introduction */}
                <section className="max-w-3xl mx-auto mb-20 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-2xl font-bold font-mono text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-2">
                        <Terminal className="w-6 h-6 text-blue-500 dark:text-cyan-400" />
                        <span>// Giới thiệu</span>
                    </h2>
                    <div className="prose dark:prose-invert max-w-none font-mono text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        <p>
                            Chào bạn, mình là <span className="text-slate-900 dark:text-cyan-300 font-semibold">Lâm Quang Lộc</span>.
                        </p>
                        <p>
                            Mình tạo ra <span className="font-bold">IceBlog</span> như một không gian để lưu giữ và chia sẻ những kiến thức, kinh nghiệm quý báu mà mình tích lũy được trên hành trình chinh phục thế giới code.
                        </p>
                        <p>
                            Hiện tại, mình đang là sinh viên năm 4 chuyên ngành <span className="text-slate-900 dark:text-pink-400 font-semibold">Công nghệ phần mềm</span> tại trường <span className="font-semibold">Đại học Công nghệ TP.HCM (HUTECH)</span>.
                        </p>
                        <p>
                            Với niềm đam mê mãnh liệt với công nghệ, mục tiêu tương lai của mình là trở thành một <span className="font-semibold text-blue-600 dark:text-amber-400">Software Engineer</span> xuất sắc. Mình luôn hướng tới việc không chỉ viết ra những dòng code sạch (clean code) mà còn kiến tạo nên những giải pháp phần mềm tối ưu, mang lại giá trị thực tiễn cho cộng đồng.
                        </p>
                    </div>
                </section>

                {/* Skills */}
                <section className="max-w-3xl mx-auto mb-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-2xl font-bold font-mono text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 flex items-center gap-2">
                        <Cpu className="w-6 h-6 text-pink-500" />
                        <span>// Skills</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SkillCard
                            title="Languages & Tools"
                            icon={<Code2 className="w-5 h-5 text-blue-500" />}
                            skills={["Java", "JavaScript", "C/C++", "Git", "Figma"]}
                            colorClass="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30"
                        />
                        <SkillCard
                            title="Frontend"
                            icon={<Layout className="w-5 h-5 text-indigo-500" />}
                            skills={["React", "NextJS", "Tailwind CSS"]}
                            colorClass="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30"
                        />
                        <SkillCard
                            title="Backend"
                            icon={<Server className="w-5 h-5 text-green-500" />}
                            skills={["NodeJS", "ExpressJS"]}
                            colorClass="bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30"
                        />
                        <SkillCard
                            title="Database"
                            icon={<Database className="w-5 h-5 text-amber-500" />}
                            skills={["MongoDB", "PostgreSQL", "SQLite"]}
                            colorClass="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30"
                        />
                    </div>
                </section>



                {/* Projects */}
                <section className="max-w-4xl mx-auto mb-20 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                    <h2 className="text-2xl font-bold font-mono text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-purple-500" />
                        <span>// Projects</span>
                    </h2>

                    <div className="space-y-8">
                        <ProjectCard
                            title="Ice Restaurant"
                            description="Hệ thống quản lý nhà hàng toàn diện, hỗ trợ đặt bàn, gọi món và thanh toán hóa đơn. Giao diện trực quan giúp tối ưu hóa quy trình vận hành và quản lý doanh thu hiệu quả."
                            skills={["Java", "SQL Server", "Swing"]}
                            image="/assets/blog/project/ice-restaurant.png"
                            repoUrl="https://github.com/lamquangloc/Project_DACS"
                        />
                        <ProjectCard
                            title="Prayer Reading App"
                            description="Ứng dụng di động giúp người dùng đọc kinh theo ngày, tích hợp tính năng nhắc nhở giờ cầu nguyện tự động và kho lưu trữ kinh phong phú. Hỗ trợ hoạt động offline với cơ sở dữ liệu Hive."
                            skills={["Flutter", "Dart", "Hive", "Local Notifications"]}
                            image="/assets/blog/project/prayer-reading.png"
                            repoUrl="https://github.com/lamquangloc/Prayer_reading_app"
                        />
                        <ProjectCard
                            title="Website đồ án vặt"
                            description="Website thương mại điện tử chuyên kinh doanh đồ ăn vặt. Tích hợp đầy đủ các tính năng: tìm kiếm sản phẩm, giỏ hàng, đặt hàng online và trang quản trị (Admin) để quản lý đơn hàng."
                            skills={["PHP", "MySQL", "HTML5/CSS3", "JavaScript"]}
                            image="/assets/blog/project/doanvat.png"
                            repoUrl="https://github.com/lamquangloc/Project_LTW"
                        />
                    </div>
                </section>

                {/* Contact */}
                <section className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <h2 className="text-2xl font-bold font-mono text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 flex items-center gap-2">
                        <Mail className="w-6 h-6 text-emerald-500" />
                        <span>// Contact</span>
                    </h2>

                    <div className="bg-slate-50 dark:bg-[#0a0e27]/40 p-8 rounded-2xl border border-slate-200 dark:border-cyan-500/20 shadow-sm hover:shadow-md transition-all">
                        <p className="text-slate-600 dark:text-slate-300 mb-8 font-mono leading-relaxed">
                            Đừng ngần ngại liên hệ với mình để trao đổi công việc, hợp tác dự án hoặc chỉ đơn giản là chia sẻ niềm đam mê lập trình!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ContactItem
                                icon={<Phone className="w-5 h-5" />}
                                label="0938456774"
                                href="tel:0938456774"
                                hoverColor="hover:text-green-500"
                            />
                            <ContactItem
                                icon={<Mail className="w-5 h-5" />}
                                label="lamquangloc81@gmail.com"
                                href="mailto:lamquangloc81@gmail.com"
                                hoverColor="hover:text-red-500"
                            />
                            <ContactItem
                                icon={<Facebook className="w-5 h-5" />}
                                label="Facebook Profile"
                                href="https://www.facebook.com/tony.legen.14"
                                hoverColor="hover:text-blue-600"
                            />
                            <ContactItem
                                icon={<Github className="w-5 h-5" />}
                                label="github.com/lamquangloc"
                                href="https://github.com/lamquangloc"
                                hoverColor="hover:text-slate-900 dark:hover:text-white"
                            />
                        </div>
                    </div>
                </section>

            </Container>
        </main >
    );
}

function SkillCard({ title, icon, skills, colorClass }: { title: string, icon: React.ReactNode, skills: string[], colorClass: string }) {
    return (
        <div className="p-6 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h3 className="font-bold font-mono text-lg text-slate-800 dark:text-slate-200">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <span key={skill} className={`px-3 py-1 rounded text-sm font-mono border ${colorClass}`}>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

function ContactItem({ icon, label, href, hoverColor }: { icon: React.ReactNode, label: string, href: string, hoverColor: string }) {
    return (
        <a
            href={href}
            className={`flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 transition-all duration-300 hover:scale-105 ${hoverColor}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {icon}
            <span className="font-mono text-sm truncate">{label}</span>
            <span className="ml-auto opacity-0 group-hover:opacity-100">&rarr;</span>
        </a>
    );
}

function ProjectCard({ title, description, skills, image, repoUrl }: { title: string, description: string, skills: string[], image: string, repoUrl: string }) {
    return (
        <div className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-[#0a0e27]/40 p-6 rounded-2xl border border-slate-200 dark:border-cyan-500/20 hover:border-blue-400 dark:hover:border-cyan-400/50 transition-all shadow-sm hover:shadow-lg">
            {/* Image Section */}
            <div className="w-full md:w-2/5 shrink-0 overflow-hidden rounded-xl border border-slate-100 dark:border-white/5 relative aspect-video">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1">
                <div className="mb-3">
                    <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-cyan-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                        {title}
                    </h3>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1 font-mono">
                    {description}
                </p>

                <div className="space-y-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                            <span key={skill} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-mono border border-slate-200 dark:border-white/5">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                    >
                        <Github className="w-4 h-4" />
                        View Repository <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    );
}
