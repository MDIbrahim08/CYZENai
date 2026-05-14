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
    <Accordion type="single" collapsible>
      <AccordionItem value={country.id} className="border-0">
        <AccordionTrigger className="card-elevated p-4 rounded-2xl hover:no-underline [&[data-state=open]]:rounded-b-none">
          <div className="flex items-center gap-3 w-full">
            <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center text-2xl`}>
              {country.flag}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-heading font-semibold text-base">{country.name}</h3>
              <p className="text-sm text-muted-foreground">{country.degree}</p>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="card-elevated rounded-t-none rounded-b-2xl border-t border-border px-4 pb-5 pt-4">
          <div className="space-y-5">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  Duration
                </div>
                <p className="font-medium text-sm">{country.duration}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  Cost
                </div>
                <p className="font-medium text-sm">{country.estimatedCost}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  Salary
                </div>
                <p className="font-medium text-sm">{country.salary}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Timeline
                </div>
                <p className="font-medium text-sm">{country.timeline}</p>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="font-heading font-semibold text-sm mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Key Requirements
              </h4>
              <ul className="space-y-1.5">
                {country.requirements.map((req, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Licensing Path */}
            <div>
              <h4 className="font-heading font-semibold text-sm mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Licensing Path
              </h4>
              <ul className="space-y-1.5">
                {country.licensingPath.map((step, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-secondary font-medium">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Universities */}
            <div>
              <h4 className="font-heading font-semibold text-sm mb-2">🏛️ Top Universities</h4>
              <div className="flex flex-wrap gap-1.5">
                {country.topUniversities.map((uni, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-primary/5 border-primary/20">
                    {uni}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            {country.additionalNotes && country.additionalNotes.length > 0 && (
              <div className="bg-warning/10 rounded-xl p-3 border border-warning/20">
                <h4 className="font-heading font-semibold text-sm mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  Important Notes
                </h4>
                <ul className="space-y-1">
                  {country.additionalNotes.map((note, i) => (
                    <li key={i} className="text-sm text-text-secondary">
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
