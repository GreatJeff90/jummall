'use client';

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Truck, MapPin, Store } from "lucide-react";
import { api } from "@/app/lib/api/client";

interface DeliverySettings {
  within_state: { enabled: boolean; price: number; eta_days: number };
  nationwide: { enabled: boolean; price: number; eta_days: number };
  pickup: { enabled: boolean; price: number; eta_days: number };
}

export default function DeliverySettingsPage() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, watch, setValue, control } = useForm<DeliverySettings>();

  // 1. Fetch current delivery settings
  const { isLoading } = useQuery({
    queryKey: ["deliverySettings"],
    queryFn: async () => {
      const res = await api.get("/store/me/delivery");
      Object.keys(res.data).forEach((key) => setValue(key as keyof DeliverySettings, res.data[key]));
      return res.data;
    },
  });

  // 2. Update settings mutation
  const updateMutation = useMutation({
    mutationFn: (data: DeliverySettings) => api.put("/store/me/delivery", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliverySettings"] });
      alert("Delivery zones updated successfully.");
    }
  });

  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-20" size={32} />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-slate-100 shadow-sm rounded-sm">
      <h2 className="text-sm font-black uppercase tracking-widest border-b pb-4 mb-6">Delivery Zone Setup</h2>
      
      <form onSubmit={handleSubmit((data) => updateMutation.mutate(data))} className="space-y-8">
        {/* Helper for each zone */}
        {(['within_state', 'nationwide', 'pickup'] as const).map((zone) => (
          <div key={zone} className="border p-4 rounded-sm space-y-3">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 font-bold text-xs uppercase">
                {zone === 'within_state' ? <Truck size={16}/> : zone === 'nationwide' ? <MapPin size={16}/> : <Store size={16}/>}
                {zone.replace('_', ' ')}
              </label>
              <input type="checkbox" {...register(`${zone}.enabled`)} className="toggle" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Price" {...register(`${zone}.price`, { valueAsNumber: true })} className="border p-2 text-sm" />
              <input type="number" placeholder="ETA (Days)" {...register(`${zone}.eta_days`, { valueAsNumber: true })} className="border p-2 text-sm" />
            </div>
          </div>
        ))}

        <button 
          type="submit" 
          disabled={updateMutation.isPending}
          className="w-full bg-[#149fcd] text-white py-3 font-black uppercase text-xs"
        >
          {updateMutation.isPending ? "Saving..." : "Save Delivery Settings"}
        </button>
      </form>
    </div>
  );
}