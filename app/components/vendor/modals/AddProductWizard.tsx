'use client';

import React, { useState, useRef } from "react";
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Layers, 
  ChevronDown, 
  FolderOpen, 
  Search, 
  CheckCircle,
  Loader2
} from "lucide-react";
import { createSellerProductAPI } from "../../../lib/api/auth";

interface AddProductWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded?: () => void; // Triggered upon successful deployment to sync the product table loop
}

export default function AddProductWizard({ isOpen, onClose, onAdded }: AddProductWizardProps) {
  const [step, setStep] = useState(1);
  const [publishing, setPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- FORM STATE LAYOUT MATRIX ---
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [condition, setCondition] = useState("New");
  const [description, setDescription] = useState("");
  
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [lowStockAlert, setLowStockAlert] = useState(2);

  // Helper declared in main component body to ensure availability in lexical scope
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value).replace("NGN", "₦");
  };

  // Guard clause executed safely down below function instantiation references
  if (!isOpen) return null;

  // --- IMAGE COLLECTION PROCESSING HANDLERS ---
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      alert("You can append a maximum of 5 images per product listing slot.");
      return;
    }

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    files.forEach(file => {
      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    setImages(prev => [...prev, ...newFiles]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const clearImageGallery = () => {
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setImages([]);
    setImagePreviews([]);
  };

  // --- SEARCH TAG PIPELINE HANDLERS ---
  const handleAddTag = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === "," || e.key === " ") && tagInput.trim()) {
      e.preventDefault();
      const cleanTag = tagInput.trim().replace(/,/g, "").toLowerCase();
      if (!tags.includes(cleanTag) && tags.length < 8) {
        setTags([...tags, cleanTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
  };

  // --- PUBLISH deployment DISPATCH TRIGGER ---
  const handlePublishListing = async () => {
    try {
      setPublishing(true);
      const payload = new FormData();
      
      payload.append("name", productName.trim());
      payload.append("category", category);
      payload.append("condition", condition);
      payload.append("description", description.trim());
      payload.append("price", price);
      payload.append("compare_old_price", oldPrice);
      payload.append("stock", stock.toString());
      payload.append("low_stock_threshold", lowStockAlert.toString());
      payload.append("tags", JSON.stringify(tags));

      // Append standard files buffer lists directly
      images.forEach((file) => {
        payload.append("images", file);
      });

      await createSellerProductAPI(payload);
      
      if (onAdded) onAdded(); // Hot refresh parent listing loops instantly
      clearImageGallery();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed deploying product schema structure down onto servers.");
    } finally {
      setPublishing(false);
    }
  };

  // --- PROGRESS MATRIX ENGINES ---
  const structuralChecklist = [
    { label: "Photos Added", done: images.length > 0 },
    { label: "Valid Title (≥3 chars)", done: productName.trim().length >= 3 },
    { label: "Category Selected", done: !!category },
    { label: "Pricing Baseline Defined", done: parseFloat(price) > 0 },
    { label: "Description Provided", done: description.trim().length > 0 },
    { label: "Search Tags Populated", done: tags.length > 0 }
  ];

  const filledEssentialsCount = structuralChecklist.filter(c => c.done).length;
  const readinessPercentage = Math.round((filledEssentialsCount / 6) * 100);
  
  const isAdvanceable = step === 1 ? images.length > 0 :
                        step === 2 ? (productName.trim().length >= 3 && !!category) :
                        step === 3 ? parseFloat(price) > 0 : filledEssentialsCount >= 5;

  const parsedPrice = parseFloat(price) || 0;
  const platformFee = Math.round(parsedPrice * 0.05);
  const vendorPayoutEarnings = Math.max(0, parsedPrice - platformFee);

  const availableCategories = [
    "Electronics", "Phones & Tablets", "Computers", "Phone Accessories", 
    "Wearables", "Fashion", "Home & Living", "Kitchen", "Health & Beauty", "Gaming"
  ].filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/50 z-[150] flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-200 font-sans text-left">
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleImageFileChange} 
        className="hidden" 
      />

      <div className="bg-[#F6F7F9] w-full max-w-4xl h-full md:h-[90vh] md:rounded-sm shadow-2xl flex flex-col justify-between overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-8 duration-300">
        
        {/* ================= WIZARD APP BAR UNIT ================= */}
        <div className="bg-white border-b border-[#EAEBED] px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              type="button"
              disabled={publishing}
              onClick={() => step === 1 ? onClose() : setStep(step - 1)}
              className="w-10 h-10 border border-slate-200 rounded-sm flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-40"
            >
              <ArrowLeft size={16} className="stroke-[2.5]" />
            </button>
            <div>
              <span className="text-[10px] font-black text-[#149FCD] tracking-widest block uppercase">Step {step} of 4</span>
              <h2 className="text-lg font-black text-slate-900 tracking-tight font-montserrat mt-0.5">
                {step === 1 ? "Upload Photos" : step === 2 ? "Product Details" : step === 3 ? "Pricing & Stock" : "Review Readiness"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-[#143D4A] flex items-center gap-1.5 shadow-xs select-none">
              <Layers size={13} className="text-[#149FCD]" />
              <span>Draft mode</span>
            </div>
            <button type="button" disabled={publishing} onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1 disabled:opacity-40"><X size={20} /></button>
          </div>
        </div>

        {/* ================= STEP PROGRESS TRACK INDICATOR ================= */}
        <div className="bg-white px-6 pb-2 shrink-0 select-none">
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#149FCD] transition-all duration-300 ease-out" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
        </div>

        {/* ================= STEP MODULE WORKSPACE CONTAINER ================= */}
        <div className="flex-1 overflow-y-auto p-6 custom-sidebar-scroll">
          
          {/* STEP 1: IMAGE MEDIA DROP CARDS CANVAS */}
          {step === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-[#E5F4FA] border border-[#149FCD]/20 p-4 rounded-sm flex items-start gap-4 shadow-2xs select-none">
                <div className="w-10 h-10 rounded-md bg-[#149FCD]/10 flex items-center justify-center text-[#149FCD] shrink-0">
                  <ImageIcon size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-[#1B4D5E] uppercase tracking-tight">Show your product from every angle</h4>
                  <p className="text-xs font-medium text-slate-500 leading-normal">
                    Photos with clear backgrounds sell up to 3× faster. Add up to 5 images.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-56">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`md:col-span-6 h-56 md:h-full border-2 border-dashed rounded-sm flex flex-col items-center justify-center cursor-pointer transition-all p-2 relative overflow-hidden bg-white ${
                    imagePreviews[0] ? "border-[#149FCD] border-solid" : "border-slate-200 hover:border-[#149FCD]"
                  }`}
                >
                  {imagePreviews[0] ? (
                    <>
                      <img src={imagePreviews[0]} alt="Hero block layout" className="w-full h-full object-contain" />
                      <span className="absolute bottom-3 left-3 bg-[#143D4A] text-white text-[9px] font-black px-2 py-0.5 rounded-xs tracking-widest uppercase shadow-sm select-none">Main</span>
                    </>
                  ) : (
                    <div className="text-center space-y-2 text-slate-400 select-none">
                      <Plus size={24} className="mx-auto" />
                      <span className="text-xs font-bold block">Add cover photo</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-6 grid grid-cols-4 md:grid-cols-2 gap-4 h-full">
                  {[1, 2, 3, 4].map((index) => {
                    const imgUrl = imagePreviews[index];
                    return (
                      <div 
                        key={index}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border border-dashed rounded-sm aspect-square md:h-full flex items-center justify-center cursor-pointer relative overflow-hidden transition-all bg-white ${
                          imgUrl ? "border-[#149FCD] border-solid" : "border-slate-200 hover:border-[#149FCD]"
                        }`}
                      >
                        {imgUrl ? (
                          <img src={imgUrl} alt="" className="w-full h-full object-contain p-1" />
                        ) : (
                          <Plus size={16} className="text-slate-400" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-t border-slate-100 pt-3 select-none">
                <span>{images.length} / 5 uploaded</span>
                {images.length > 0 && (
                  <button type="button" onClick={clearImageGallery} className="text-[#EF4444] hover:underline flex items-center gap-1">
                    <Trash2 size={12} /> Reset gallery
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: METADATA DETAILS TEXT COMPOSITIONS */}
          {step === 2 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="space-y-1.5">
                <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider block">Product Title *</label>
                <div className="relative border border-slate-200 focus-within:border-[#149FCD] rounded-sm bg-white overflow-hidden transition-colors">
                  <input 
                    type="text" 
                    placeholder="e.g. Echo Wireless Earbuds Pro"
                    maxLength={80}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-3 outline-none text-sm font-semibold text-slate-700 bg-white"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 select-none">
                  <span>Minimum 3 characters</span>
                  <span>{productName.length} / 80</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider block">Category *</label>
                <button 
                  type="button"
                  onClick={() => setIsCategorySheetOpen(true)}
                  className="w-full bg-white border border-slate-200 px-4 py-3 text-left rounded-sm text-sm font-bold text-slate-700 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className={category ? "text-slate-800" : "text-slate-400"}>
                    {category || "Choose your product layout segment..."}
                  </span>
                  <ChevronDown size={16} className="text-slate-400" />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider block">Condition</label>
                <div className="grid grid-cols-3 gap-3 select-none">
                  {[
                    { key: "New", heading: "New", desc: "Brand new, sealed" },
                    { key: "Used", heading: "Used", desc: "Pre-owned, working" },
                    { key: "Refurbished", heading: "Refurbished", desc: "Restored to spec" }
                  ].map((item) => {
                    const isChosen = condition === item.key;
                    return (
                      <div
                        key={item.key}
                        onClick={() => setCondition(item.key)}
                        className={`border rounded-sm p-3 text-center cursor-pointer transition-all bg-white relative shadow-2xs ${
                          isChosen ? "border-[#149FCD] bg-[#E5F4FA]/40 shadow-inner" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <h5 className={`text-xs font-black ${isChosen ? "text-[#149FCD]" : "text-slate-800"}`}>{item.heading}</h5>
                        <p className="text-[10px] font-medium text-slate-400 mt-1 leading-tight">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider block">Description</label>
                <div className="border border-slate-200 focus-within:border-[#149FCD] rounded-sm bg-white overflow-hidden transition-colors">
                  <textarea 
                    rows={4}
                    placeholder="What makes this item special?..."
                    maxLength={500}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 outline-none text-sm font-semibold text-slate-700 bg-white resize-none custom-sidebar-scroll"
                  />
                </div>
                <div className="text-right text-[10px] font-bold text-slate-400 px-1 select-none">
                  {description.length} / 500
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider block">Search Tags</label>
                <div className="border border-slate-200 focus-within:border-[#149FCD] rounded-sm bg-white p-2 min-h-11 flex flex-wrap gap-2 items-center transition-colors shadow-inner">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#E5F4FA] border border-[#149FCD]/20 text-[#143D4A] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs select-none">
                      #{tag}
                      <button type="button" onClick={() => handleRemoveTag(idx)} className="text-slate-400 hover:text-red-500 rounded-full p-0.5"><X size={12} className="stroke-[3]" /></button>
                    </span>
                  ))}
                  {tags.length < 8 ? (
                    <input 
                      type="text" 
                      placeholder="Add tag and hit Space..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="flex-1 min-w-[150px] bg-transparent outline-none text-xs font-bold text-slate-700 px-2 py-1"
                    />
                  ) : null}
                </div>
                <p className="text-[10px] font-bold text-slate-400 px-1 select-none">Maximum 8 search tags</p>
              </div>
            </div>
          )}

          {/* STEP 3: PRICING & INVENTORY MANAGEMENT */}
          {step === 3 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-white border border-[#EAEBED] p-5 rounded-sm shadow-2xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider block">Sale Price (₦) *</label>
                  <div className="relative border border-slate-200 focus-within:border-[#149FCD] rounded-sm bg-white overflow-hidden transition-colors">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₦</div>
                    <input 
                      type="number" 
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 outline-none text-sm font-black text-slate-800 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider block">Compare at Old Price (₦)</label>
                  <div className="relative border border-slate-200 focus-within:border-[#149FCD] rounded-sm bg-white overflow-hidden transition-colors">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₦</div>
                    <input 
                      type="number" 
                      placeholder="Optional reference price..."
                      value={oldPrice}
                      onChange={(e) => setOldPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 outline-none text-sm font-bold text-slate-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              {parsedPrice > 0 && (
                <div className="w-full bg-slate-100/60 border border-slate-200 rounded-sm p-4 space-y-2.5 text-xs font-bold text-slate-600 shadow-inner animate-in fade-in duration-200 select-none">
                  <div className="flex justify-between"><span>List Price Target</span><span className="text-slate-800">{formatCurrency(parsedPrice)}</span></div>
                  <div className="flex justify-between text-[#EF4444]"><span>Platform Logistics Margin (5%)</span><span>- {formatCurrency(platformFee)}</span></div>
                  <div className="h-[1px] bg-slate-200 my-1 w-full" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-900 uppercase tracking-wide">Net Store Earnings per Sale</span>
                    <span className="text-base font-black text-[#31B757] font-montserrat">{formatCurrency(vendorPayoutEarnings)}</span>
                  </div>
                </div>
              )}

              <div className="bg-white border border-[#EAEBED] p-5 rounded-sm shadow-2xs grid grid-cols-1 sm:grid-cols-2 gap-6 select-none">
                <div className="space-y-2">
                  <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider block">Stock Volume Inventory Unit Count</label>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setStock(Math.max(1, stock - 1))} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 font-bold text-lg rounded-sm text-slate-700 flex items-center justify-center transition-colors">-</button>
                    <span className="w-12 text-center text-base font-black text-slate-800">{stock}</span>
                    <button type="button" onClick={() => setStock(stock + 1)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 font-bold text-lg rounded-sm text-slate-700 flex items-center justify-center transition-colors">+</button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider block">Low Stock Alert Threshold Limit</label>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setLowStockAlert(Math.max(1, lowStockAlert - 1))} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 font-bold text-lg rounded-sm text-slate-700 flex items-center justify-center transition-colors">-</button>
                    <span className="w-12 text-center text-base font-black text-slate-800">{lowStockAlert}</span>
                    <button type="button" onClick={() => setLowStockAlert(lowStockAlert + 1)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 font-bold text-lg rounded-sm text-slate-700 flex items-center justify-center transition-colors">+</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PREVIEW READINESS VERIFICATION ASSESSMENTS */}
          {step === 4 && (
            <div className="space-y-6 max-w-2xl mx-auto select-none">
              <div className="w-full bg-gradient-to-br from-[#1B4D5E] to-[#143D4A] rounded-sm p-6 text-white relative overflow-hidden shadow-lg">
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#FFD43A] tracking-[2.5px] uppercase block">Readiness Assessment</span>
                    <h3 className="text-xl font-black font-montserrat tracking-tight mt-1.5">
                      {readinessPercentage >= 80 ? "Looking great — ready to ship" : "Almost there"}
                    </h3>
                    <p className="text-[11px] text-white/70 mt-1 font-medium">{filledEssentialsCount} of 6 essential fields completed</p>
                  </div>
                  <div className="bg-white text-[#143D4A] px-4 py-2.5 rounded-sm font-black text-base shadow-md font-montserrat">
                    {readinessPercentage}%
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full mt-5 overflow-hidden">
                  <div className="h-full bg-[#FFD43A] transition-all duration-300" style={{ width: `${readinessPercentage}%` }} />
                </div>
              </div>

              <div className="bg-white border border-[#EAEBED] rounded-sm p-5 shadow-2xs space-y-3">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider border-b pb-2">Requirements Breakdown Checklist</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {structuralChecklist.map((check, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-600">
                      <CheckCircle size={15} className={`shrink-0 ${check.done ? "text-[#31B757]" : "text-slate-200"}`} />
                      <span className={check.done ? "text-slate-800" : "text-slate-400 line-through font-normal"}>{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= STEPS INTERACTIVE BOTTOM CONTROL ACTIONS BAR ================= */}
        <div className="bg-white border-t border-[#EAEBED] px-6 py-4 flex items-center justify-between shrink-0 select-none">
          <button
            type="button"
            disabled={publishing}
            onClick={onClose}
            className="px-5 py-3 text-xs font-black uppercase tracking-widest text-[#EF4444] hover:bg-red-50 rounded-sm transition-colors disabled:opacity-40"
          >
            Cancel Listing
          </button>

          <button
            type="button"
            disabled={!isAdvanceable || publishing}
            onClick={() => step === 4 ? handlePublishListing() : setStep(step + 1)}
            className={`px-8 h-12 rounded-sm text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md ${
              !isAdvanceable || publishing ? "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-none" :
              step === 4 ? "bg-[#31B757] hover:bg-[#2aa34d] text-white" : "bg-[#143D4A] hover:bg-slate-800 text-white"
            }`}
          >
            {publishing ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Deploying Item...
              </>
            ) : (
              <>
                <span>{step === 4 ? "Publish Product listing" : "Save & Continue"}</span>
                <ArrowRight size={14} className="stroke-[3]" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* --- CATEGORIES SEARCH SLIDE OUT MODAL DRAWER --- */}
      {isCategorySheetOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[200] animate-in fade-in duration-200" onClick={() => setIsCategorySheetOpen(false)} />
          <div className="fixed bottom-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-[440px] h-[75vh] sm:h-[500px] bg-white rounded-t-xl sm:rounded-sm z-[201] shadow-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200 flex flex-col overflow-hidden border border-slate-100">
            
            <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
              <div className="flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-wider font-montserrat">
                <FolderOpen size={16} className="text-[#149FCD]" />
                <span>Select Category</span>
              </div>
              <button type="button" onClick={() => setIsCategorySheetOpen(false)} className="text-slate-400 hover:text-slate-700 p-1"><X size={18} /></button>
            </div>

            <div className="p-4 bg-white border-b shrink-0">
              <div className="relative border border-slate-200 focus-within:border-[#149FCD] rounded-sm overflow-hidden bg-slate-50">
                <input 
                  type="text" 
                  placeholder="Search product categories..." 
                  value={categorySearch}
                  onChange={e => setCategorySearch(e.target.value)}
                  className="w-full py-2.5 px-4 pr-10 bg-transparent outline-none text-xs font-semibold text-slate-600" 
                />
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-50 custom-sidebar-scroll">
              {availableCategories.map((catName, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCategory(catName);
                    setIsCategorySheetOpen(false);
                  }}
                  className="w-full px-4 py-3.5 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between group/row transition-colors"
                >
                  <span>{catName}</span>
                  <CheckCircle size={14} className={`text-[#31B757] opacity-0 group-hover/row:opacity-100 transition-opacity ${category === catName ? "opacity-100" : ""}`} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}