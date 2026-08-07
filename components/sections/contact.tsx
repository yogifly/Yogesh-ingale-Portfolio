"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy, Mail, Github, Send, Terminal } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TypingText } from "@/components/effects/typing-text";
import { Magnetic } from "@/components/effects/magnetic";
import { siteConfig } from "@/lib/content";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const lines = [
    { prompt: "$ ", text: "cat contact.txt", delay: 200 },
    { prompt: "→ ", text: siteConfig.email, delay: 900, color: "primary" as const },
    { prompt: "$ ", text: "cat github.txt", delay: 1500 },
    { prompt: "→ ", text: `github.com/${siteConfig.githubHandle}`, delay: 2200, color: "primary" as const },
    { prompt: "$ ", text: "echo \"Let's build something.\"", delay: 3000 },
  ];

  function copyEmail() {
    navigator.clipboard.writeText(siteConfig.email).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => {}
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Demo submit. Wire up to your handler (Resend, Formspree, API route).
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      number="06"
      heading={
        <h2 className="text-display-2 text-balance text-white">
          Let's build something{" "}
          <span className="italic text-[#38BDF8]">worth shipping</span>.
        </h2>
      }
    >
      <div className="container-fluid grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Terminal */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-xl border border-[#1c2547] bg-[#0a0f24]/70">
            <div className="flex items-center justify-between border-b border-[#1c2547] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Terminal className="size-3.5 text-[#475569]" />
                <span className="font-mono text-xs text-[#94a3b8]">
                  yogesh@portfolio:~ — bash
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#1c2547]" />
                <span className="size-2.5 rounded-full bg-[#1c2547]" />
                <span className="size-2.5 rounded-full bg-[#1c2547]" />
              </div>
            </div>

            <div className="space-y-2 p-5 font-mono text-sm md:p-6">
              {lines.map((l, i) => (
                <Line key={i} {...l} />
              ))}
              <div className="mt-4 flex items-center gap-2 pt-4 text-[#475569]">
                <span className="text-[#38BDF8]">$</span>
                <span className="caret h-4 w-2" aria-hidden />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Magnetic strength={0.18}>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor="hover"
                className="group flex w-full items-center justify-between rounded-full border border-[#1c2547] bg-[#0a0f24]/60 px-4 py-2.5 text-sm text-[#94a3b8] transition-colors hover:border-[#0EA5E9] hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Mail className="size-3.5" />
                  Copy email
                </span>
                <AnimatePresence mode="popLayout" initial={false}>
                  {copied ? (
                    <motion.span
                      key="ok"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="text-[#38BDF8]"
                    >
                      <Check className="size-3.5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="cp"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="size-3.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener"
                data-cursor="hover"
                className="flex w-full items-center justify-between rounded-full border border-[#1c2547] bg-[#0a0f24]/60 px-4 py-2.5 text-sm text-[#94a3b8] transition-colors hover:border-[#0EA5E9] hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Github className="size-3.5" />
                  GitHub
                </span>
                <span className="text-xs">↗</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessCard key="ok" onReset={() => setSubmitted(false)} />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-[#1c2547] bg-[#0a0f24]/40 p-6 md:p-8"
                noValidate
              >
                <p className="text-mono-sm text-[#38BDF8]">
                  // Open a thread
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <Field>
                    <Label htmlFor="name">$ whoami</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="email">$ where_to_reply</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@team.com"
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <Field>
                    <Label htmlFor="subject">$ subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="One line about the project"
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <Field>
                    <Label htmlFor="message">$ message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder={`A few sentences about what you're building, the timeline, and what success looks like. →`}
                      rows={5}
                    />
                  </Field>
                </div>

                <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <p className="text-xs text-[#475569]">
                    Replies usually within 24 hours.
                  </p>
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    shape="pill"
                    disabled={submitting}
                    data-cursor="hover"
                  >
                    {submitting ? "Transmitting…" : "Send message"}
                    <Send className="size-4" />
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function Line({
  prompt,
  text,
  delay,
  color,
}: {
  prompt: string;
  text: string;
  delay: number;
  color?: "primary";
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-1">
      <span className={color === "primary" ? "text-[#38BDF8]" : "text-[#94a3b8]"}>
        {prompt}
      </span>
      <TypingText
        text={text}
        startDelay={delay}
        speed={28}
        className={color === "primary" ? "text-white" : "text-white"}
      />
    </p>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5">{children}</div>;
}

function SuccessCard({ onReset }: { onReset: () => void }) {
  // Auto-replay checkmark draw + reset after a few seconds.
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll("path");
    paths.forEach((p, i) => {
      const len = (p as SVGPathElement).getTotalLength();
      (p as SVGPathElement).style.strokeDasharray = `${len}`;
      (p as SVGPathElement).style.strokeDashoffset = `${len}`;
      (p as SVGPathElement).getBoundingClientRect();
      (p as SVGPathElement).style.transition = `stroke-dashoffset 700ms ${i * 100}ms cubic-bezier(0.16,1,0.3,1)`;
      (p as SVGPathElement).style.strokeDashoffset = "0";
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-[#0EA5E9]/40 bg-[#0a0f24]/60 p-8 md:p-12"
    >
      <div className="flex items-center gap-3">
        <svg
          ref={svgRef}
          viewBox="0 0 52 52"
          className="size-12 text-[#38BDF8]"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="26" cy="26" r="24" />
          <path d="M14 27 L23 36 L40 18" />
        </svg>
        <p className="text-mono-sm text-[#38BDF8]">/ Message sent</p>
      </div>
      <h3 className="mt-6 font-display text-3xl text-white md:text-4xl">
        Got it — I'll reply soon.
      </h3>
      <p className="mt-3 max-w-md text-[#94a3b8]">
        Thanks for reaching out. I usually reply within 24 hours with a
        few honest questions about scope.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm text-[#94a3b8] underline underline-offset-4 hover:text-white"
        data-cursor="hover"
      >
        Send another message
      </button>
    </motion.div>
  );
}