import type React from "react";
import {
  ArrowRight,
  BarChart2,
  Calendar,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import Hero from "../assets/hero.jpeg";
import { Button } from "../components/ui/button";
import { GlowingEffect } from "../components/shared/glowing-effect";
import { Link } from "react-router";
import MainLayout from "./layout";

export default function LandingPage() {
  return (
    <MainLayout>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80 dark:from-background/20 dark:to-background/0">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col justify-center space-y-4 text-center max-w-3xl mx-auto">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-in">
                    Grow Your Wealth with Smart Investments
                  </h1>
                  <p
                    className="text-muted-foreground md:text-xl animate-in mx-auto"
                    style={{ "--index": 1 } as React.CSSProperties}
                  >
                    Secure your financial future with our intuitive savings and
                    investment platform. Start building wealth today.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-2 sm:flex-row justify-center animate-in"
                  style={{ "--index": 2 } as React.CSSProperties}
                >
                  <Button size="lg" asChild>
                    <Link to="/signup">Start Investing</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="#demo">
                      See Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div
                className="relative w-full max-w-4xl overflow-hidden rounded-xl border bg-background p-2 shadow-2xl animate-in mx-auto"
                style={{ "--index": 3 } as React.CSSProperties}
              >
                <img
                  src={Hero}
                  alt="Fintech Dashboard Preview"
                  width={1200}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 dark:bg-muted/10"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Everything you need to manage your Finances and grow your
                  Investments.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  icon: BarChart2,
                  title: "Portfolio Analytics",
                  description:
                    "Track your investment performance with detailed analytics and insights.",
                },
                {
                  icon: Users,
                  title: "Financial Planning Tools",
                  description:
                    "Plan your financial future and collaborate with advisors.",
                },
                {
                  icon: Calendar,
                  title: "Scheduled Transfers",
                  description:
                    "Schedule recurring deposits and withdrawals easily.",
                },
                {
                  icon: CheckCircle,
                  title: "Goal Setting",
                  description:
                    "Create and track financial goals to achieve your dreams.",
                },
                {
                  icon: Clock,
                  title: "Real-Time Monitoring",
                  description:
                    "Monitor your account balances and investment values in real-time.",
                },
                {
                  icon: ArrowRight,
                  title: "Investment Opportunities",
                  description:
                    "Discover new investment opportunities and diversify your portfolio.",
                },
              ].map((feature, index) => (
                <div key={index} className="relative min-h-[14rem]">
                  <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                      <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                            {feature.title}
                          </h3>
                          <p className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  See Our Platform in Action
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Discover how our platform can simplify your savings and
                  investment journey.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-2xl">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <img
                  src={Hero}
                  alt="Fintech Dashboard Demo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-5 w-5"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join Thousands of Happy Investors
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  See what our customers have to say about our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {[
                {
                  name: "Emily Carter",
                  role: "Financial Analyst",
                  quote:
                    "This platform has simplified my investment process. The analytics and goal-setting features have helped me stay on track.",
                },
                {
                  name: "David Rodriguez",
                  role: "Small Business Owner",
                  quote:
                    "I've grown my savings significantly using this app. The scheduled transfers and real-time monitoring are incredibly helpful.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="relative">
                  <div className="relative rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <div className="relative flex flex-col justify-between space-y-4 rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
                      <div className="space-y-2">
                        <svg
                          className="h-6 w-6 text-primary"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                        </svg>
                        <p className="text-muted-foreground italic">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Flexible Pricing Plans
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Choose a plan that fits your investment needs and budget.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  name: "Basic",
                  price: "$0",
                  features: [
                    "Savings Account Access",
                    "Basic Portfolio Tracking",
                    "Limited Investment Options",
                  ],
                },
                {
                  name: "Premium",
                  price: "$9",
                  features: [
                    "Unlimited Investments",
                    "Advanced Analytics",
                    "Personalized Financial Advice",
                    "Priority Support",
                  ],
                },
                {
                  name: "Elite",
                  price: "$25",
                  features: [
                    "Everything in Premium",
                    "Dedicated Account Manager",
                    "Exclusive Investment Opportunities",
                    "Advanced Security Features",
                  ],
                },
              ].map((plan, index) => (
                <div key={index} className="relative">
                  <div className="relative rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <div
                      className={`relative flex flex-col justify-between rounded-xl border-[0.75px] ${
                        index === 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-background"
                      } p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]`}
                    >
                      <div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline">
                          <span className="text-3xl font-bold">
                            {plan.price}
                          </span>
                          <span className="ml-1 text-sm text-muted-foreground">
                            /month
                          </span>
                        </div>
                        <ul className="mt-6 space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center"
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        className={`mt-8 ${
                          index === 1
                            ? "bg-background text-primary hover:bg-background/90"
                            : ""
                        }`}
                        variant={index === 1 ? "secondary" : "default"}
                        asChild
                      >
                        <Link to="/signup">Get Started</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Start Building Your Future?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Join thousands of investors already growing their wealth with
                  our platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link to="/signup">Sign Up for Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Talk to an Advisor</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
