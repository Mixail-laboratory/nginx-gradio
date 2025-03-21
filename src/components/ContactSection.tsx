import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
    Send,
    Phone,
    Mail,
    CheckCircle
} from 'lucide-react';

const ContactSection = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
    };

    return (
        <section id="contact" className="py-20 relative bg-gradient-to-b from-ajackal-black to-ajackal-off-black">
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Свяжитесь с <span className="ajackal-gradient-text">нами</span>
                    </h2>
                    <p className="text-ajackal-white/80 max-w-2xl mx-auto">
                        Есть вопросы или предложения? Заполните форму ниже, и мы свяжемся с вами в ближайшее время
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <div className="glass-card p-6 md:p-8 rounded-xl relative overflow-hidden">
                        {/* Decorative background elements */}
                        <div
                            className="absolute -top-16 -left-16 w-32 h-32 bg-ajackal-purple/10 rounded-full blur-xl"></div>
                        <div
                            className="absolute -bottom-10 -right-10 w-32 h-32 bg-ajackal-pink/10 rounded-full blur-xl"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-semibold mb-6">Отправить сообщение</h3>

                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <div
                                        className="h-16 w-16 rounded-full bg-ajackal-purple/20 flex items-center justify-center mb-4">
                                        <CheckCircle className="h-8 w-8 text-ajackal-purple"/>
                                    </div>
                                    <h4 className="text-xl font-semibold mb-2">Сообщение отправлено!</h4>
                                    <p className="text-ajackal-white/70 text-center">
                                        Спасибо за ваше обращение. Мы свяжемся с вами в ближайшее время.
                                    </p>
                                    <Button
                                        className="mt-6 bg-ajackal-gradient hover:bg-ajackal-dark-gradient"
                                        onClick={() => setSubmitted(false)}
                                    >
                                        Отправить еще сообщение
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm text-ajackal-white/80 mb-2">
                                                Имя
                                            </label>
                                            <Input
                                                id="name"
                                                placeholder="Введите ваше имя"
                                                className="bg-ajackal-black/50 border-ajackal-purple/30 focus:border-ajackal-purple focus:ring-ajackal-purple"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm text-ajackal-white/80 mb-2">
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                className="bg-ajackal-black/50 border-ajackal-purple/30 focus:border-ajackal-purple focus:ring-ajackal-purple"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm text-ajackal-white/80 mb-2">
                                            Тема
                                        </label>
                                        <Input
                                            id="subject"
                                            placeholder="Тема вашего сообщения"
                                            className="bg-ajackal-black/50 border-ajackal-purple/30 focus:border-ajackal-purple focus:ring-ajackal-purple"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm text-ajackal-white/80 mb-2">
                                            Сообщение
                                        </label>
                                        <Textarea
                                            id="message"
                                            placeholder="Ваше сообщение..."
                                            className="bg-ajackal-black/50 border-ajackal-purple/30 focus:border-ajackal-purple focus:ring-ajackal-purple min-h-[120px]"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Button type="submit"
                                                className="w-full bg-ajackal-gradient hover:bg-ajackal-dark-gradient flex items-center gap-2">
                                            <Send className="h-4 w-4"/>
                                            <span>Отправить сообщение</span>
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-col justify-between">
                        {/* Company Info */}
                        <div className="glass-card p-6 md:p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold mb-6">Контактная информация</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="mt-1 h-10 w-10 rounded-full bg-ajackal-gradient flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-5 w-5 text-white"/>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium mb-1">Телефон</h4>
                                        <p className="text-ajackal-white/70">
                                            +7 (923) 658-28-00
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div
                                        className="mt-1 h-10 w-10 rounded-full bg-ajackal-gradient flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-5 w-5 text-white"/>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium mb-1">Email</h4>
                                        <p className="text-ajackal-white/70">
                                            mixail.mccartney@yandex.ru
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
