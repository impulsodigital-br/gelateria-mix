"use client";
import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import Image from "next/image";
import { BUSINESS } from "@/lib/config";
import { HERO_PHOTO } from "@/lib/gallery";
import { Wave } from "./Wave";
const ease = [0.22, 1, 0.36, 1] as const;
const titleWords = ["Seu", "momento", "mais", "doce", "começa", "aqui."];
export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pt-24 sm:pt-28">
      {/* brilho rosa de fundo */}
      <div
        aria-hidden="true"
        className="glow absolute -right-24 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-magenta/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-neon/10 blur-[110px]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-32">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow inline-flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.name} · {BUSINESS.city}, {BUSINESS.state}
          </motion.p>
          <h1 className="mt-5 font-display text-[2.9rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {titleWords.map((word, i) => (
              <span key={word} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className={`inline-block ${word === "doce" ? "italic text-neon" : ""}`}
                  initial={{ y: "110%", rotate: 3 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim"
          >
            Descubra seus sabores favoritos em milk-shakes cremosos, sundaes irresistíveis e muito
            mais. Escolha, personalize e peça pelo WhatsApp.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#cardapio" className="btn btn-ghost">
              Explorar cardápio
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#cardapio" className="btn btn-primary">
              Fazer meu pedido
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[2.2rem] border border-neon/30"
          />
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-ink-3 shadow-[0_30px_80px_-30px_rgba(217,0,122,0.7)]">
            {HERO_PHOTO.src ? (
              <Image
                src={HERO_PHOTO.src}
                alt={HERO_PHOTO.alt}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            ) : null}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
            />
          </div>
        </motion.div>
      </div>
      <Wave fill="#130c10" className="absolute inset-x-0 bottom-0 -z-0" />
    </section>
  );
}
