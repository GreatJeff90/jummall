'use client';

export default function OrderReturnRequests() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black text-slate-800 font-montserrat">Order Return Requests</h1>

      {/* --- Empty State Area --- */}
      <div className="bg-white border border-slate-100 rounded-sm p-24 shadow-sm flex flex-col items-center justify-center text-center">
        
        {/* Custom SVG Illustration using your provided path */}
        <div className="mb-8 opacity-60">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 512 512" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-slate-200"
          >
            {/* Background Decorative Circle */}
            <circle cx="256" cy="256" r="200" fill="#F8FAFC" />
            
            {/* Your Provided Path */}
            <g transform="translate(0, 0)">
              <path 
                fill="#867B99" 
                d="M290.479,197.137c-0.265,0-0.485-0.209-0.496-0.477c-0.121-3.111-0.419-6.198-0.708-9.185
                   c-0.085-0.883-0.17-1.766-0.252-2.65c-0.104-1.1-0.224-2.246-0.346-3.422c-0.188-1.805-0.383-3.68-0.543-5.577
                   c-0.023-0.273,0.179-0.513,0.452-0.536c0.269-0.025,0.512,0.179,0.535,0.453c0.16,1.89,0.354,3.759,0.541,5.558
                   c0.123,1.179,0.243,2.327,0.348,3.432c0.08,0.884,0.166,1.765,0.251,2.647c0.29,2.999,0.59,6.102,0.712,9.241
                   c0.011,0.274-0.203,0.505-0.476,0.516C290.491,197.137,290.484,197.137,290.479,197.137z"
              />
            </g>

            {/* Added a simple folder icon shape to complete the "Request" look */}
            <path 
              d="M320 300H192c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16z" 
              fill="#CBD5E1" 
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-2 font-montserrat">
          No order return requests yet!
        </h2>
        
        <p className="text-[13px] text-slate-400 max-w-sm leading-relaxed">
          You have not placed any order return requests yet.
        </p>
      </div>
    </div>
  );
}