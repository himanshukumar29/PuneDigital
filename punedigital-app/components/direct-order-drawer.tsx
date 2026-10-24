"use client";

import React from "react";
import { X, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Zap, Bike } from "lucide-react";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  is_veg?: boolean;
}

interface DirectOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  items: CartItem[];
  onUpdateQuantity: (itemName: string, delta: number) => void;
  onOpenPricing: () => void;
}

export function DirectOrderDrawer({
  isOpen,
  onClose,
  restaurantName,
  items,
  onUpdateQuantity,
  onOpenPricing,
}: DirectOrderDrawerProps) {
  if (!isOpen) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const aggregatorTaxSaved = Math.round(subtotal * 0.28); // 28% aggregator markup saved

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Your Direct Kitchen Order</h3>
                <span className="text-xs text-stone-400">{restaurantName}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Aggregator Tax Savings Callout (Key Pitch Feature!) */}
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
              <Zap className="w-4 h-4" />
              <span>Zero Aggregator Commission</span>
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-300/90">
              By ordering directly, you save an estimated <b>₹{aggregatorTaxSaved}</b> in platform fees & commissions that stay with the chef!
            </p>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                <p className="text-stone-400 text-sm">Your order bag is currently empty.</p>
                <p className="text-xs text-stone-500">Tap &ldquo;Add to Order&rdquo; on any signature dish to experience direct checkout.</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-stone-800/60 border border-stone-700/60 rounded-xl p-4 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.is_veg ? "bg-emerald-400" : "bg-red-500"}`} />
                      <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                    </div>
                    <span className="text-xs text-amber-400 font-mono mt-0.5 block">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-stone-900 rounded-lg p-1 border border-stone-700">
                    <button
                      onClick={() => onUpdateQuantity(item.name, -1)}
                      className="p-1 hover:bg-stone-800 rounded text-stone-300 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.name, 1)}
                      className="p-1 hover:bg-stone-800 rounded text-stone-300 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-stone-950/80 space-y-4">
              <div className="space-y-2 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-white font-mono">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <Bike className="w-3.5 h-3.5" /> Direct Kitchen Dispatch
                  </span>
                  <span className="font-bold uppercase tracking-wider text-[10px]">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-stone-800">
                  <span>Grand Total</span>
                  <span className="text-emerald-400 font-mono text-base">₹{subtotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(
                    `🎉 Direct Order Simulated for ${restaurantName}!\n\nIn production, this routes directly to UPI / Razorpay checkout and sends an instant WhatsApp order receipt with live dispatch tracking to both customer & manager.`
                  );
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
              >
                <span>Proceed to Direct UPI / Card Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <button
                  onClick={onOpenPricing}
                  className="text-[11px] text-stone-400 hover:text-amber-400 underline transition"
                >
                  Owner: See how Tier 3 eliminates 25–30% aggregator commissions →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
