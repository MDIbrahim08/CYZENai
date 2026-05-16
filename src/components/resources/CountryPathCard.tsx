import { motion } from 'framer-motion';
import { ChevronDown, GraduationCap, Clock, DollarSign, Briefcase, Building2, CheckCircle, AlertCircle } from 'lucide-react';
import { CountryInfo } from '@/data/careerPaths';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface CountryPathCardProps {
  country: CountryInfo;
  index: number;
}

export const CountryPathCard = ({ country, index }: CountryPathCardProps) => {
  const gradients = ['gradient-orange', 'gradient-purple', 'gradient-teal', 'gradient-pink', 'gradient-gold'];
  const gradient = gradients[index % gradients.length];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={country.id} className="border-0 mb-4">
        <AccordionTrigger className="bg-[#161b22]/50 backdrop-blur-xl border border-white/5 p-5 rounded-2xl hover:no-underline transition-all duration-300 [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-emerald-500/30">
          <div className="flex items-center gap-4 w-full">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              {country.flag}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg text-white tracking-tight uppercase">{country.name}</h3>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-black uppercase tracking-widest px-2 py-0">
                  Mission Data
                </Badge>
              </div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1 truncate">{country.degree}</p>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="bg-[#0d1117] rounded-b-2xl border-x border-b border-white/5 px-6 pb-8 pt-6 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: 'Duration', value: country.duration },
              { icon: DollarSign, label: 'Investment', value: country.estimatedCost },
              { icon: Briefcase, label: 'Yield', value: country.salary },
              { icon: GraduationCap, label: 'Roadmap', value: country.timeline }
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/20">
                  <stat.icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="font-heading font-bold text-sm text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
            {/* Requirements */}
            <div className="space-y-4">
              <h4 className="font-heading font-black text-xs uppercase tracking-[0.25em] text-emerald-500 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Operational Requirements
              </h4>
              <ul className="space-y-2.5">
                {country.requirements?.map((req, i) => (
                  <li key={i} className="text-sm text-white/70 flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 mt-1.5 group-hover:bg-emerald-500 transition-colors" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Licensing Path */}
            <div className="space-y-4">
              <h4 className="font-heading font-black text-xs uppercase tracking-[0.25em] text-emerald-500 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Strategic Deployment
              </h4>
              <div className="space-y-3">
                {country.licensingPath?.map((step, i) => (
                  <div key={i} className="flex gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-sm text-white/60">
                    <span className="font-black text-emerald-500/40">{String(i + 1).padStart(2, '0')}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Universities */}
          <div className="pt-6 border-t border-white/5">
            <h4 className="font-heading font-black text-xs uppercase tracking-[0.25em] text-white/20 mb-4">Tactical Training Grounds</h4>
            <div className="flex flex-wrap gap-2">
              {country.topUniversities?.map((uni, i) => (
                <Badge key={i} className="text-[10px] font-bold uppercase tracking-widest bg-white/5 border-white/10 text-white/40 px-3 py-1">
                  {uni}
                </Badge>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
