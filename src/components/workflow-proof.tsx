import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { asset } from '@/lib/asset';

/* A link under a case study demo that opens the actual workflow
   screenshot full size. The demos explain the idea; this proves the
   thing was really built. */

interface WorkflowProofProps {
  image: string;
  title: string;
  caption?: string;
}

const WorkflowProof = ({ image, title, caption }: WorkflowProofProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        See the real workflow
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
          (screenshot)
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <DialogHeader className="px-5 pt-5 pb-3">
            <DialogTitle className="font-heading text-lg text-left">{title}</DialogTitle>
          </DialogHeader>
          <div className="bg-muted/60 overflow-auto max-h-[70vh]">
            <img
              src={asset(image)}
              alt={title}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          {caption && (
            <p className="px-5 py-4 text-sm text-muted-foreground leading-relaxed">{caption}</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkflowProof;
