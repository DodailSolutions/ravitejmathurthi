"use client";

import React from "react";
import {
  TrendingUp,
  Plus,
  Calendar,
  Search,
  BookOpen,
  QrCode,
  LineChart,
  Home as HomeIcon,
  ShoppingBag,
  Utensils,
  Hotel
} from "lucide-react";

interface ProjectMockupProps {
  title: string;
}

export function ProjectMockup({ title }: ProjectMockupProps) {
  // Return different premium HTML mockups based on the project title
  switch (title) {
    case "BillBooky":
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between font-sans text-[10px] text-foreground select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-semibold tracking-tight text-white flex items-center gap-1">
              <span className="size-2 rounded bg-accent" /> BillBooky Dashboard
            </span>
            <span className="rounded bg-accent/20 text-accent px-1.5 py-0.5 font-medium flex items-center gap-0.5">
              <Plus size={8} /> New Invoice
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 my-2">
            <div className="rounded-lg bg-white/5 border border-white/5 p-2 flex flex-col justify-between">
              <span className="text-muted/70 text-[8px]">Monthly Revenue</span>
              <span className="font-semibold text-white text-xs mt-0.5">$14,250.00</span>
              <span className="text-emerald-400 text-[7px] flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={8} /> +12.4%
              </span>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/5 p-2 flex flex-col justify-between">
              <span className="text-muted/70 text-[8px]">Invoices Sent</span>
              <span className="font-semibold text-white text-xs mt-0.5">142</span>
              <span className="text-muted text-[7px] mt-0.5">85% Paid</span>
            </div>
          </div>

          {/* Invoice Rows */}
          <div className="space-y-1.5 flex-1 overflow-hidden">
            {[
              { client: "Acme Corp", amount: "$3,400.00", status: "Paid", color: "bg-emerald-500/20 text-emerald-400" },
              { client: "Stark Labs", amount: "$1,850.00", status: "Pending", color: "bg-amber-500/20 text-amber-400" }
            ].map((inv, idx) => (
              <div key={idx} className="flex items-center justify-between rounded bg-white/5 p-1.5 border border-white/5">
                <span className="text-white/90 font-medium truncate max-w-[80px]">{inv.client}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white/90">{inv.amount}</span>
                  <span className={`px-1 rounded text-[7px] ${inv.color}`}>{inv.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "Safe Kids Hospitals":
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between font-sans text-[10px] text-foreground select-none">
          {/* Top Search bar */}
          <div className="relative">
            <span className="absolute left-2.5 top-2 text-muted/60"><Search size={10} /></span>
            <div className="w-full rounded-full bg-white/5 border border-white/5 py-1.5 pl-7 pr-3 text-muted/70 text-[8px]">
              Search pediatricians, slots, departments...
            </div>
          </div>

          {/* Booking View */}
          <div className="flex gap-2 my-2 flex-1 items-stretch overflow-hidden">
            {/* Left: Doctor Card */}
            <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-2 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-gradient-to-tr from-accent to-accent-2 flex items-center justify-center font-bold text-white text-[8px]">
                  Dr
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[9px] leading-tight">Dr. Ananya R.</h4>
                  <p className="text-muted/70 text-[7px]">Pediatric Cardiologist</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[7px] border-t border-white/5 pt-1.5">
                <span className="text-muted">Next Slot:</span>
                <span className="text-accent-2 font-medium">Tomorrow, 10:00 AM</span>
              </div>
            </div>

            {/* Right: Booking Actions */}
            <div className="w-24 flex flex-col justify-between rounded-xl bg-accent-2/10 border border-accent-2/20 p-2 text-center">
              <Calendar size={14} className="text-accent-2 mx-auto" />
              <p className="text-[7px] text-accent-2 font-medium leading-normal">
                Available Slots in Cardiology
              </p>
              <button suppressHydrationWarning className="w-full rounded bg-accent-2 py-1 font-bold text-background text-[8px] hover:scale-105 active:scale-95 transition-transform">
                Book Slot
              </button>
            </div>
          </div>
        </div>
      );

    case "Olive Mount Education":
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between font-sans text-[10px] text-foreground select-none">
          {/* Platform Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-semibold tracking-tight text-white flex items-center gap-1">
              <BookOpen size={12} className="text-purple-400" /> Olive Mount Portal
            </span>
            <span className="rounded-full bg-purple-500/20 text-purple-400 px-2 py-0.5 text-[8px] font-medium">
              Admissions Active
            </span>
          </div>

          {/* Persona selector tabs */}
          <div className="grid grid-cols-3 gap-1 my-2 text-center text-[7px] text-muted">
            <span className="rounded bg-purple-500/10 border border-purple-500/20 text-white font-semibold py-1">Parent</span>
            <span className="rounded bg-white/5 py-1">Student</span>
            <span className="rounded bg-white/5 py-1">Admin</span>
          </div>

          {/* Form mockup */}
          <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-2 space-y-1.5 flex flex-col justify-center">
            <div className="h-1.5 w-1/3 bg-white/10 rounded" />
            <div className="h-4 w-full bg-white/5 rounded border border-white/5 flex items-center px-1.5 text-muted/60 text-[7px]">
              Child Name
            </div>
            <button suppressHydrationWarning className="w-full rounded bg-purple-600 py-1.5 font-bold text-white text-[8px] hover:scale-103 transition-transform">
              Submit Admission Application
            </button>
          </div>
        </div>
      );

    case "MagicQR":
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between font-sans text-[10px] text-foreground select-none">
          {/* Main Container */}
          <div className="flex gap-3 items-center flex-1">
            {/* QR Card */}
            <div className="size-16 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-lg shrink-0">
              <QrCode size={40} className="text-black" />
            </div>

            {/* Dashboard Stats */}
            <div className="flex-1 flex flex-col justify-between h-16">
              <div>
                <span className="text-muted/70 text-[8px] block">Live QR Scans</span>
                <span className="font-semibold text-white text-sm">4,812</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[8px]">
                <LineChart size={10} />
                <span>+24% Scan Rate</span>
              </div>
            </div>
          </div>

          {/* Mini chart visualizer */}
          <div className="h-8 flex items-end gap-1.5 border-t border-white/5 pt-2">
            {[20, 45, 30, 60, 45, 80, 65, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-orange-600 to-amber-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      );

    case "Rentcot":
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between font-sans text-[10px] text-foreground select-none">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-semibold tracking-tight text-white flex items-center gap-1">
              <HomeIcon size={12} className="text-sky-400" /> Rentcot Booking
            </span>
            <span className="rounded bg-sky-500/20 text-sky-400 px-1.5 py-0.5 text-[8px] font-medium">
              Slots Active
            </span>
          </div>

          {/* Slot Calendar visualizer */}
          <div className="my-2 flex-1 grid grid-cols-4 gap-1 items-stretch">
            {[
              { date: "10 Jun", label: "Booked", color: "bg-white/5 border border-white/5 text-muted/40" },
              { date: "11 Jun", label: "$120", color: "bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold" },
              { date: "12 Jun", label: "$120", color: "bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold" },
              { date: "13 Jun", label: "Unavailable", color: "bg-white/5 border border-white/5 text-muted/30" }
            ].map((slot, idx) => (
              <div key={idx} className={`rounded-lg p-1 text-center flex flex-col justify-between ${slot.color}`}>
                <span className="text-[7px]">{slot.date}</span>
                <span className="text-[6px] truncate leading-tight mt-1">{slot.label}</span>
              </div>
            ))}
          </div>

          {/* Quick Reserve trigger */}
          <button suppressHydrationWarning className="w-full rounded-xl bg-sky-500 py-1.5 font-bold text-white text-[8px] hover:scale-103 transition-transform">
            Confirm Weekend Booking
          </button>
        </div>
      );

    case "Dr Woof":
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between font-sans text-[10px] text-foreground select-none">
          {/* Platform Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-semibold tracking-tight text-white flex items-center gap-1">
              <ShoppingBag size={12} className="text-rose-400" /> Dr Woof Shop
            </span>
            <span className="text-muted/70 text-[8px]">2 Items in Cart</span>
          </div>

          {/* Products Visual */}
          <div className="flex gap-2 my-2 flex-1 items-stretch overflow-hidden">
            {[
              { name: "Organic Dog Shampoo", price: "$18.50" },
              { name: "Premium Chew Toys", price: "$12.00" }
            ].map((p, idx) => (
              <div key={idx} className="flex-1 rounded-xl bg-white/5 border border-white/5 p-2 flex flex-col justify-between">
                <div className="size-7 rounded bg-white/10 flex items-center justify-center text-[10px] text-rose-300">🐾</div>
                <h4 className="text-white font-semibold text-[8px] truncate leading-tight mt-1.5">{p.name}</h4>
                <div className="flex items-center justify-between text-[7px] mt-1 text-accent-2">
                  <span>{p.price}</span>
                  <span className="rounded bg-rose-500/20 text-rose-400 px-1 font-bold">+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "Mumbaiyaa":
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between font-sans text-[10px] text-foreground select-none">
          {/* Ordering Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-semibold tracking-tight text-white flex items-center gap-1">
              <Utensils size={12} className="text-orange-400" /> Mumbaiyaa Express
            </span>
            <span className="rounded-full bg-orange-500/20 text-orange-400 px-2 py-0.5 text-[8px]">
              Ready in 15m
            </span>
          </div>

          {/* Menu items list */}
          <div className="space-y-1.5 my-2 flex-1 overflow-hidden">
            {[
              { dish: "Vada Pav (2 pcs)", label: "Spicy", price: "$6.99" },
              { dish: "Bombay Sandwich", label: "Classic", price: "$8.99" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded bg-white/5 p-1.5 border border-white/5">
                <div>
                  <span className="text-white font-medium block leading-tight">{item.dish}</span>
                  <span className="text-muted/50 text-[6px]">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white/90">{item.price}</span>
                  <button suppressHydrationWarning className="size-4 rounded-full bg-orange-600 text-white font-bold text-[8px] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "Zapbed":
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between font-sans text-[10px] text-foreground select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-semibold tracking-tight text-white flex items-center gap-1">
              <Hotel size={12} className="text-teal-400" /> Zapbed Bookings
            </span>
            <span className="text-teal-400 font-bold text-[8px]">Dubai, UAE</span>
          </div>

          {/* Property Card Grid */}
          <div className="flex gap-2 my-2 flex-1 items-stretch overflow-hidden">
            <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-2 flex flex-col justify-between">
              <div className="aspect-[4/3] rounded bg-white/10 flex items-center justify-center text-[10px] text-teal-300">🌴</div>
              <h4 className="text-white font-semibold text-[8px] leading-tight mt-1.5">Marina Luxury Suite</h4>
              <div className="flex items-center justify-between text-[7px] mt-1">
                <span className="text-muted">4.9 ★</span>
                <span className="text-teal-400 font-semibold">$195/n</span>
              </div>
            </div>
            <div className="w-16 rounded-xl bg-white/5 border border-white/5 p-1.5 flex flex-col justify-between text-center">
              <span className="text-muted/70 text-[6px] block">Check-in</span>
              <span className="font-bold text-white text-[8px]">15 Jun</span>
              <span className="text-muted/70 text-[6px] block border-t border-white/5 pt-1 mt-1">Nights</span>
              <span className="font-bold text-white text-[8px]">5</span>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-6xl font-bold tracking-tight text-white/10 transition-all duration-500 group-hover:scale-110 group-hover:text-white/15">
            {title}
          </span>
        </div>
      );
  }
}
